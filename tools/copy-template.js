#!/usr/bin/env node

/**
 * 一键复制模板到剪贴板
 *
 * 用法:
 *   node tools/copy-template.js            列出所有模板
 *   node tools/copy-template.js 3          复制第3个模板到剪贴板
 *   node tools/copy-template.js 3 -p       预览不复制
 *   node tools/copy-template.js <path>     复制指定路径模板
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

const C = {
  reset: '\x1b[0m', green: '\x1b[32m', yellow: '\x1b[33m',
  cyan: '\x1b[36m', gray: '\x1b[90m', bold: '\x1b[1m', red: '\x1b[31m',
};
const c = (code, text) => `${code}${text}${C.reset}`;

const PROMPTS = path.join(path.resolve(__dirname, '..'), 'prompts');
const CAT_ORDER = ['components', 'performance', 'collaboration', 'general'];
const CAT_NAMES = {
  components: '组件开发', performance: '性能优化',
  collaboration: '团队协作', general: '通用工具',
};

// ─── 扫描模板 ────────────────────────────────────────────────────────────────

function scan() {
  const list = [];
  let n = 1;
  for (const cat of CAT_ORDER) {
    const dir = path.join(PROMPTS, cat);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir)
      .filter(f => f.endsWith('.md') && !f.toLowerCase().startsWith('readme'))
      .sort();
    for (const f of files) {
      list.push({ num: n++, cat, name: f.replace(/\.md$/, ''), path: path.join(dir, f) });
    }
  }
  return list;
}

// ─── 剪贴板（跨平台）────────────────────────────────────────────────────────

function copyToClipboard(text) {
  try {
    if (process.platform === 'win32') {
      const tmp = path.join(os.tmpdir(), `pmt_${Date.now()}.txt`);
      fs.writeFileSync(tmp, text, 'utf8');
      try {
        return spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive',
          '-Command', `Get-Content "${tmp.replace(/\\/g, '/')}" -Raw -Encoding UTF8 | Set-Clipboard`],
        ).status === 0;
      } finally { try { fs.unlinkSync(tmp); } catch (_) {} }
    }
    if (process.platform === 'darwin') {
      return spawnSync('pbcopy', [], { input: text }).status === 0;
    }
    return spawnSync('xclip', ['-selection', 'clipboard'], { input: text }).status === 0;
  } catch (_) { return false; }
}

// ─── 列表显示 ────────────────────────────────────────────────────────────────

function showList(list) {
  console.log();
  console.log(c(C.bold, '  可用模板'));
  console.log(c(C.gray, '  ─────────────────────────────────────────'));
  console.log();
  let prev = '';
  for (const t of list) {
    if (t.cat !== prev) {
      prev = t.cat;
      console.log(`  ${c(C.cyan, CAT_NAMES[t.cat] || t.cat)}:`);
    }
    console.log(`    ${c(C.green, String(t.num).padStart(2))}. ${t.name}`);
  }
  console.log();
  console.log(`  共 ${c(C.bold, list.length)} 个模板`);
  console.log();
  console.log('  用法:');
  console.log(`    ${c(C.gray, 'node tools/copy-template.js <编号>')}      复制到剪贴板`);
  console.log(`    ${c(C.gray, 'node tools/copy-template.js <编号> -p')}   预览内容`);
  console.log();
}

// ─── 主逻辑 ──────────────────────────────────────────────────────────────────

const argv = process.argv.slice(2);
const preview = argv.includes('-p') || argv.includes('--preview');
const target = argv.find(a => !a.startsWith('-'));
const list = scan();

if (!target) { showList(list); process.exit(0); }

// 查找模板
let tpl;
const idx = parseInt(target, 10);
if (!isNaN(idx) && idx >= 1 && idx <= list.length) {
  tpl = list[idx - 1];
} else {
  const r = path.resolve(target);
  tpl = list.find(t => t.path === r)
    || (fs.existsSync(r) ? { name: path.basename(r, '.md'), path: r } : null);
}

if (!tpl) {
  console.log(c(C.red, `\n  错误：未找到模板 "${target}"\n`));
  process.exit(1);
}

const content = fs.readFileSync(tpl.path, 'utf-8');

if (preview) {
  console.log();
  console.log(c(C.bold, `  预览: ${tpl.name}.md`));
  console.log(c(C.gray, '  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄'));
  console.log(content);
  console.log(c(C.gray, '  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄'));
  console.log();
} else {
  const ok = copyToClipboard(content);
  console.log();
  if (ok) {
    console.log(c(C.green, `  ✓ 已复制: ${tpl.name}.md`));
    console.log(`    ${content.split('\n').length} 行 · ${content.length} 字符`);
    console.log(`    ${c(C.gray, '可直接粘贴到 AI 工具中使用')}`);
  } else {
    console.log(c(C.yellow, '  ⚠ 剪贴板不可用，请手动复制以下内容:'));
    console.log(c(C.gray, '  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄'));
    console.log(content);
    console.log(c(C.gray, '  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄'));
  }
  console.log();
}
