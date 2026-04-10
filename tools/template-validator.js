#!/usr/bin/env node

/**
 * Prompt 模板验证工具
 *
 * 验证 Prompt 模板文件是否符合规范。
 * 使用方式：node tools/template-validator.js [文件或目录路径]
 *
 * 默认扫描 prompts/ 目录下所有 .md 文件。
 */

const fs = require('fs');
const path = require('path');

// ─── 配置 ────────────────────────────────────────────────────────────────────

const RULES = {
  // 必须包含一级标题
  MUST_HAVE_H1_TITLE: {
    id: 'H1_TITLE',
    level: 'error',
    description: '必须包含一级标题（# 开头）',
    check(content) {
      const match = content.match(/^#\s+.+/m);
      return { passed: !!match, detail: match ? `标题: ${match[0]}` : '未找到一级标题' };
    },
  },

  // 必须包含占位符 {...}
  MUST_HAVE_PLACEHOLDERS: {
    id: 'PLACEHOLDERS',
    level: 'error',
    description: '必须包含占位符标记 {...}',
    check(content) {
      const placeholders = content.match(/\{[^}]+\}/g);
      return {
        passed: !!placeholders && placeholders.length > 0,
        detail: placeholders
          ? `找到 ${placeholders.length} 个占位符: ${placeholders.slice(0, 5).join(', ')}${placeholders.length > 5 ? ' ...' : ''}`
          : '未找到占位符',
      };
    },
  },

  // 占位符格式正确性
  PLACEHOLDER_FORMAT: {
    id: 'PLACEHOLDER_FORMAT',
    level: 'warn',
    description: '占位符格式应正确（成对的大括号）',
    check(content) {
      const opens = (content.match(/\{/g) || []).length;
      const closes = (content.match(/\}/g) || []).length;
      const balanced = opens === closes;
      return {
        passed: balanced,
        detail: balanced ? '大括号配对正确' : `左括号 ${opens} 个，右括号 ${closes} 个，数量不匹配`,
      };
    },
  },

  // 必须有模板说明或使用示例
  MUST_HAVE_DESCRIPTION: {
    id: 'TEMPLATE_DESC',
    level: 'error',
    description: '必须包含模板说明或使用示例',
    check(content) {
      const hasDesc = /##\s*(模板说明|使用示例|模板描述|生成示例)/.test(content);
      return { passed: hasDesc, detail: hasDesc ? '找到模板说明部分' : '未找到"模板说明"或"使用示例"部分' };
    },
  },

  // 必须有输出要求
  MUST_HAVE_OUTPUT_REQUIREMENTS: {
    id: 'OUTPUT_REQ',
    level: 'error',
    description: '必须包含输出要求或输出格式',
    check(content) {
      const hasOutput = /##\s*(输出要求|输出格式|生成要求)/.test(content);
      return { passed: hasOutput, detail: hasOutput ? '找到输出要求部分' : '未找到"输出要求"或"输出格式"部分' };
    },
  },

  // 二级标题结构（至少2个 ## 标题）
  MUST_HAVE_SECTIONS: {
    id: 'SECTIONS',
    level: 'warn',
    description: '应有合理的章节结构（至少2个二级标题）',
    check(content) {
      const sections = content.match(/^##\s+.+/gm);
      const count = sections ? sections.length : 0;
      return {
        passed: count >= 2,
        detail: `找到 ${count} 个二级标题${count >= 2 ? '' : '，建议至少2个'}`,
      };
    },
  },

  // 不应有 TODO/FIXME
  NO_TODO_FIXME: {
    id: 'NO_TODO',
    level: 'warn',
    description: '不应包含 TODO 或 FIXME 标记',
    check(content) {
      const todos = content.match(/(?:TODO|FIXME)[\s:：]/gi);
      return {
        passed: !todos,
        detail: todos ? `发现 ${todos.length} 个待办标记: ${todos.join(', ')}` : '无待办标记',
      };
    },
  },

  // 文件命名规范（小写字母 + 连字符）
  FILE_NAMING: {
    id: 'FILE_NAMING',
    level: 'warn',
    description: '文件名应使用小写字母和连字符（kebab-case）',
    check(_content, filePath) {
      const basename = path.basename(filePath, '.md');
      // 跳过 README 文件
      if (basename.toLowerCase() === 'readme') return { passed: true, detail: 'README 文件跳过命名检查' };
      const valid = /^[a-z0-9]+(-[a-z0-9]+)*$/.test(basename);
      return {
        passed: valid,
        detail: valid ? `文件名 "${basename}" 符合 kebab-case 规范` : `文件名 "${basename}" 不符合 kebab-case 规范`,
      };
    },
  },

  // 模板长度合理（至少10行，不超过500行）
  REASONABLE_LENGTH: {
    id: 'LENGTH',
    level: 'warn',
    description: '模板长度应合理（10-500行）',
    check(content) {
      const lines = content.split('\n').length;
      let passed = lines >= 10 && lines <= 500;
      return {
        passed,
        detail: `共 ${lines} 行${passed ? '' : lines < 10 ? '（过短）' : '（过长，建议拆分）'}`,
      };
    },
  },
};

// ─── 颜色输出（Windows 兼容） ──────────────────────────────────────────────

const color = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
};

function c(colorCode, text) {
  return `${colorCode}${text}${color.reset}`;
}

// ─── 核心逻辑 ────────────────────────────────────────────────────────────────

/**
 * 验证单个模板文件
 */
function validateFile(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
  const content = fs.readFileSync(filePath, 'utf-8');

  // 跳过 README 文件
  if (path.basename(filePath).toLowerCase() === 'readme.md') {
    return { file: relativePath, skipped: true, reason: 'README 文件跳过验证' };
  }

  const results = [];
  let errors = 0;
  let warnings = 0;

  for (const rule of Object.values(RULES)) {
    const result = rule.check(content, filePath);
    results.push({
      id: rule.id,
      level: rule.level,
      description: rule.description,
      passed: result.passed,
      detail: result.detail,
    });
    if (!result.passed) {
      if (rule.level === 'error') errors++;
      else warnings++;
    }
  }

  return { file: relativePath, results, errors, warnings, passed: errors === 0 };
}

/**
 * 递归扫描目录获取所有 .md 文件
 */
function scanDirectory(dirPath) {
  const mdFiles = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      mdFiles.push(...scanDirectory(fullPath));
    } else if (entry.name.endsWith('.md')) {
      mdFiles.push(fullPath);
    }
  }

  return mdFiles.sort();
}

/**
 * 打印单个文件的验证结果
 */
function printFileReport(result) {
  if (result.skipped) {
    console.log(`  ${c(color.gray, '⊘')} ${c(color.gray, result.file)} - ${result.reason}`);
    return;
  }

  const status = result.passed
    ? c(color.green, '✓')
    : c(color.red, '✗');

  const badge = result.passed
    ? c(color.green, 'PASS')
    : c(color.red, 'FAIL');

  console.log(`  ${status} ${c(color.bold, result.file)} ${badge}`);

  if (result.errors > 0 || result.warnings > 0) {
    for (const r of result.results) {
      if (!r.passed) {
        const icon = r.level === 'error'
          ? c(color.red, '  ✗ ERROR')
          : c(color.yellow, '  ⚠ WARN ');
        console.log(`${icon}  ${r.description}`);
        console.log(`${c(color.gray, '         ')}${c(color.gray, r.detail)}`);
      }
    }
  }

  // 通过的规则简要显示
  const passedRules = result.results.filter(r => r.passed);
  if (passedRules.length > 0) {
    const summary = passedRules.map(r => c(color.green, `✓${r.id}`)).join(' ');
    console.log(`  ${c(color.gray, '  通过:')} ${summary}`);
  }

  console.log();
}

/**
 * 打印总体统计报告
 */
function printSummary(results) {
  const total = results.filter(r => !r.skipped).length;
  const skipped = results.filter(r => r.skipped).length;
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed && !r.skipped).length;
  const totalErrors = results.reduce((sum, r) => sum + (r.errors || 0), 0);
  const totalWarnings = results.reduce((sum, r) => sum + (r.warnings || 0), 0);

  console.log(c(color.bold, '═'.repeat(60)));
  console.log(c(color.bold, '  验证报告汇总'));
  console.log(c(color.bold, '═'.repeat(60)));
  console.log();
  console.log(`  模板总数: ${total}  通过: ${c(color.green, passed)}  失败: ${c(color.red, failed)}  跳过: ${c(color.gray, skipped)}`);
  console.log(`  错误: ${c(color.red, totalErrors)}  警告: ${c(color.yellow, totalWarnings)}`);
  console.log();

  if (failed > 0) {
    console.log(c(color.red, '  需要修复的文件:'));
    for (const r of results.filter(r => !r.passed && !r.skipped)) {
      console.log(`    ${c(color.red, '✗')} ${r.file} (${r.errors} 错误, ${r.warnings} 警告)`);
    }
    console.log();
  }

  const status = failed === 0
    ? c(color.green, c(color.bold, '  ✓ 全部模板验证通过'))
    : c(color.red, c(color.bold, '  ✗ 存在验证失败的模板，请修复'));
  console.log(status);
  console.log(c(color.bold, '═'.repeat(60)));

  return failed === 0;
}

// ─── 主入口 ──────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const projectRoot = path.resolve(__dirname, '..');
  const promptsDir = path.join(projectRoot, 'prompts');

  console.log();
  console.log(c(color.bold, '  Prompt 模板验证工具'));
  console.log(c(color.gray, '  ─────────────────────────────────────────'));
  console.log();

  // 确定要验证的文件列表
  let files;

  if (args.length > 0) {
    // 使用命令行参数指定的文件或目录
    files = [];
    for (const arg of args) {
      const target = path.resolve(arg);
      if (!fs.existsSync(target)) {
        console.log(c(color.red, `  路径不存在: ${arg}`));
        process.exit(1);
      }
      if (fs.statSync(target).isDirectory()) {
        files.push(...scanDirectory(target));
      } else {
        files.push(target);
      }
    }
  } else {
    // 默认扫描 prompts/ 目录
    if (!fs.existsSync(promptsDir)) {
      console.log(c(color.red, `  prompts/ 目录不存在: ${promptsDir}`));
      process.exit(1);
    }
    files = scanDirectory(promptsDir);
  }

  if (files.length === 0) {
    console.log(c(color.yellow, '  未找到 .md 模板文件'));
    process.exit(0);
  }

  console.log(`  扫描目录: ${c(color.cyan, path.relative(projectRoot, files[0] ? path.dirname(files[0]) : promptsDir))}/`);
  console.log(`  找到文件: ${files.length} 个`);
  console.log();

  // 验证每个文件
  const results = [];
  for (const file of files) {
    results.push(validateFile(file));
  }

  // 打印详细报告
  for (const result of results) {
    printFileReport(result);
  }

  // 打印汇总
  const allPassed = printSummary(results);

  process.exit(allPassed ? 0 : 1);
}

main();
