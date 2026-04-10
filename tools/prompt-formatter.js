#!/usr/bin/env node

/**
 * Prompt 格式化工具
 *
 * 从模板中提取占位符，使用参数文件填充，生成完整的 Prompt。
 *
 * 使用流程：
 *   1. node tools/prompt-formatter.js <模板文件>           → 生成参数模板文件
 *   2. 编辑参数模板文件，填写替换值
 *   3. node tools/prompt-formatter.js <模板文件> -p params.json → 生成完整 Prompt
 *
 * 选项：
 *   -p, --params <file>   参数 JSON 文件
 *   -o, --output <file>   输出文件路径（默认输出到控制台）
 *   -i, --init <file>     指定参数模板输出路径（默认 <模板名>.params.json）
 */

const fs = require('fs');
const path = require('path');

// ─── 颜色输出 ────────────────────────────────────────────────────────────────

const C = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
};

function c(code, text) {
  return `${code}${text}${C.reset}`;
}

// ─── 参数解析 ────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = { template: null, params: null, output: null, init: null };
  const rest = argv.slice(2);

  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if ((arg === '-p' || arg === '--params') && rest[i + 1]) {
      args.params = rest[++i];
    } else if ((arg === '-o' || arg === '--output') && rest[i + 1]) {
      args.output = rest[++i];
    } else if ((arg === '-i' || arg === '--init') && rest[i + 1]) {
      args.init = rest[++i];
    } else if (!arg.startsWith('-') && !args.template) {
      args.template = arg;
    }
  }

  return args;
}

// ─── 核心逻辑 ────────────────────────────────────────────────────────────────

/**
 * 从模板内容中提取所有占位符
 * 返回去重后的占位符数组（保持出现顺序）
 */
function extractPlaceholders(content) {
  const matches = content.match(/\{[^}]+\}/g) || [];
  const seen = new Set();
  const unique = [];
  for (const m of matches) {
    if (!seen.has(m)) {
      seen.add(m);
      unique.push(m);
    }
  }
  return unique;
}

/**
 * 生成参数模板 JSON 文件
 */
function generateParamsTemplate(templatePath, placeholders, outputPath) {
  const template = {};
  for (const ph of placeholders) {
    // 去掉外层大括号作为 key
    const key = ph.slice(1, -1);
    template[key] = '';
  }

  const defaultPath = outputPath || templatePath.replace(/\.md$/, '.params.json');

  const content = JSON.stringify(template, null, 2) + '\n';
  fs.writeFileSync(defaultPath, content, 'utf-8');

  return defaultPath;
}

/**
 * 使用参数对象替换模板中的占位符
 */
function fillTemplate(content, params) {
  let result = content;
  let replaced = 0;
  let unfilled = [];

  for (const [key, value] of Object.entries(params)) {
    const placeholder = `{${key}}`;
    if (result.includes(placeholder)) {
      if (value && value.trim() !== '') {
        // 全局替换该占位符
        result = result.split(placeholder).join(value);
        replaced++;
      } else {
        unfilled.push(placeholder);
      }
    }
  }

  // 检查是否还有未替换的占位符
  const remaining = extractPlaceholders(result);
  for (const r of remaining) {
    if (!unfilled.includes(r)) {
      unfilled.push(r);
    }
  }

  return { result, replaced, unfilled };
}

// ─── 主入口 ──────────────────────────────────────────────────────────────────

function main() {
  const args = parseArgs(process.argv);

  console.log();
  console.log(c(C.bold, '  Prompt 格式化工具'));
  console.log(c(C.gray, '  ─────────────────────────────────────────'));
  console.log();

  // 检查模板文件
  if (!args.template) {
    console.log(c(C.red, '  错误：请指定模板文件'));
    console.log();
    console.log('  用法：');
    console.log('    node tools/prompt-formatter.js <模板文件>              生成参数模板');
    console.log('    node tools/prompt-formatter.js <模板文件> -p params.json  填充模板');
    console.log('    node tools/prompt-formatter.js <模板文件> -p params.json -o output.md  输出到文件');
    process.exit(1);
  }

  const templatePath = path.resolve(args.template);
  if (!fs.existsSync(templatePath)) {
    console.log(c(C.red, `  错误：文件不存在: ${templatePath}`));
    process.exit(1);
  }

  const content = fs.readFileSync(templatePath, 'utf-8');
  const placeholders = extractPlaceholders(content);

  if (placeholders.length === 0) {
    console.log(c(C.yellow, '  模板中没有找到占位符'));
    process.exit(0);
  }

  const templateName = path.basename(templatePath);

  // ─── 模式一：生成参数模板文件 ────────────────────────────────────────────
  if (!args.params) {
    console.log(`  模板文件: ${c(C.cyan, templateName)}`);
    console.log(`  占位符数量: ${c(C.bold, placeholders.length)}`);
    console.log();
    console.log(c(C.bold, '  占位符列表:'));
    placeholders.forEach((ph, i) => {
      console.log(`    ${c(C.gray, String(i + 1).padStart(2, ' '))}. ${c(C.yellow, ph)}`);
    });
    console.log();

    const outputPath = generateParamsTemplate(templatePath, placeholders, args.init);
    console.log(c(C.green, `  ✓ 参数模板已生成: ${path.relative(process.cwd(), outputPath)}`));
    console.log();
    console.log('  下一步：');
    console.log(`    1. 编辑 ${path.relative(process.cwd(), outputPath)} 填写替换值`);
    console.log(`    2. 运行 node tools/prompt-formatter.js ${args.template} -p ${path.basename(outputPath)}`);
    console.log();
    return;
  }

  // ─── 模式二：读取参数文件并填充 ──────────────────────────────────────────
  const paramsPath = path.resolve(args.params);
  if (!fs.existsSync(paramsPath)) {
    console.log(c(C.red, `  错误：参数文件不存在: ${paramsPath}`));
    process.exit(1);
  }

  let params;
  try {
    const paramsContent = fs.readFileSync(paramsPath, 'utf-8');
    params = JSON.parse(paramsContent);
  } catch (e) {
    console.log(c(C.red, `  错误：参数文件格式错误: ${e.message}`));
    process.exit(1);
  }

  console.log(`  模板文件: ${c(C.cyan, templateName)}`);
  console.log(`  参数文件: ${c(C.cyan, path.basename(paramsPath))}`);
  console.log();

  // 执行填充
  const { result, replaced, unfilled } = fillTemplate(content, params);

  // 输出统计
  console.log(c(C.bold, '  填充结果:'));
  console.log(`    已替换: ${c(C.green, replaced)} 个占位符`);
  if (unfilled.length > 0) {
    console.log(`    未填充: ${c(C.yellow, unfilled.length)} 个占位符`);
    for (const u of unfilled) {
      console.log(`      ${c(C.yellow, u)}`);
    }
  } else {
    console.log(`    未填充: ${c(C.green, '0')} (全部填充完成)`);
  }
  console.log();

  // 输出结果
  if (args.output) {
    const outputPath = path.resolve(args.output);
    fs.writeFileSync(outputPath, result, 'utf-8');
    console.log(c(C.green, `  ✓ 已输出到: ${path.relative(process.cwd(), outputPath)}`));
  } else {
    console.log(c(C.bold, '  生成的 Prompt:'));
    console.log(c(C.gray, '  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄'));
    console.log(result);
    console.log(c(C.gray, '  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄'));
  }
  console.log();
}

main();
