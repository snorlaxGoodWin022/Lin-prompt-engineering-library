# Prompt 库建设与 GitHub 上传实施方案

## 项目概述

基于现有的 Prompt 工程文档，构建一个结构化、易于使用的 Prompt 模板库，并托管到 GitHub 仓库中。

## 一、项目结构设计

### 1.1 目录结构建议
```
prompt-library/
├── README.md                    # 项目说明文档
├── LICENSE                      # 开源许可证
├── CLAUDE.md                    # Claude Code 配置
├── prompts/                     # 核心 Prompt 模板
│   ├── components/              # 组件开发模板
│   │   ├── react-component.md
│   │   ├── vue-component.md
│   │   ├── component-documentation.md
│   │   └── README.md
│   ├── performance/             # 性能优化模板
│   │   ├── lighthouse-analysis.md
│   │   ├── bundle-analysis.md
│   │   ├── image-optimization.md
│   │   └── README.md
│   ├── collaboration/           # 团队协作模板
│   │   ├── git-commit-messages.md
│   │   ├── pr-descriptions.md
│   │   ├── technical-documentation.md
│   │   └── README.md
│   └── general/                 # 通用模板
│       ├── code-review.md
│       ├── debugging-help.md
│       └── README.md
├── examples/                    # 使用示例
│   ├── generated-components/    # AI 生成的组件示例
│   ├── optimization-reports/    # 优化报告示例
│   └── README.md
├── tools/                       # 辅助工具
│   ├── template-validator.js    # 模板验证脚本
│   ├── prompt-formatter.js      # Prompt 格式化工具
│   └── README.md
└── docs/                        # 文档
    ├── getting-started.md
    ├── best-practices.md
    ├── contribution-guide.md
    └── README.md
```

### 1.2 文件命名规范
- 英文文件名：使用小写字母，单词用连字符分隔（如：react-component.md）
- 中文内容：在文件内部使用中文描述，保持可读性
- 目录 README：每个目录包含 README.md，说明该目录内容

## 二、GitHub 仓库设置

### 2.1 创建新仓库
1. 登录 GitHub (https://github.com)
2. 点击右上角 "+" → "New repository"
3. 填写仓库信息：
   - Repository name: `prompt-engineering-library` (或自定名称)
   - Description: "A collection of structured prompt templates for frontend development"
   - Visibility: Public (推荐) 或 Private
   - Initialize with: 不勾选任何选项（我们将手动添加文件）
   - 点击 "Create repository"

### 2.2 SSH 密钥配置

#### 2.2.1 检查现有 SSH 密钥
```bash
# 查看是否已有 SSH 密钥
ls -al ~/.ssh
```

#### 2.2.2 生成新 SSH 密钥（如无）
```bash
# 生成新的 SSH 密钥，使用你的邮箱
ssh-keygen -t ed25519 -C "wesleygoodwin022@gmail.com"

# 或者使用 RSA
ssh-keygen -t rsa -b 4096 -C "wesleygoodwin022@gmail.com"
```
按提示操作：
- 保存路径：按 Enter 使用默认位置
- 密码：可选设置密码（建议为空，便于自动化）

#### 2.2.3 将 SSH 密钥添加到 ssh-agent
```bash
# 启动 ssh-agent
eval "$(ssh-agent -s)"

# 添加私钥到 ssh-agent
ssh-add ~/.ssh/id_ed25519  # 或 id_rsa
```

#### 2.2.4 将公钥添加到 GitHub
1. 复制公钥内容：
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # 或
   cat ~/.ssh/id_rsa.pub
   ```
2. 登录 GitHub → Settings → SSH and GPG keys → New SSH key
3. 填写：
   - Title: "My Computer" (或自定义名称)
   - Key type: Authentication Key
   - Key: 粘贴复制的公钥内容
4. 点击 "Add SSH key"

#### 2.2.5 测试 SSH 连接
```bash
ssh -T git@github.com
```
应看到：`Hi username! You've successfully authenticated...`

## 三、本地项目初始化

### 3.1 重新组织当前文件
```bash
# 创建新的目录结构
mkdir -p prompts/{components,performance,collaboration,general}
mkdir -p examples/{generated-components,optimization-reports}
mkdir -p tools docs

# 移动和重命名现有文件
# 将中文文件重命名为英文，但保留中文内容
mv "模块4.1：Prompt工程 - 场景化Prompt库建设.md" docs/original-chinese-library.md

# 保持 CLAUDE.md 在根目录
```

### 3.2 创建核心文件

#### README.md 模板：
```markdown
# Prompt Engineering Library

一个结构化的 Prompt 模板库，用于前端开发和团队协作。

## 特性

- 🎯 **场景化模板**：针对特定开发场景的优化 Prompt
- 🏗️ **结构化格式**：一致的章节和占位符语法
- 🔧 **多技术栈支持**：React, Vue, 性能优化等
- 📚 **完整示例**：包含生成示例和使用指南
- 🤝 **团队协作**：Git, PR, 文档生成模板

## 快速开始

1. 浏览 prompts/ 目录下的模板
2. 复制适合你场景的模板
3. 替换 `{...}` 占位符
4. 与 AI 助手（Claude, ChatGPT 等）使用

## 目录结构

```
prompts/
├── components/     # 组件开发模板
├── performance/    # 性能优化模板
├── collaboration/  # 团队协作模板
└── general/       # 通用模板
```

## 使用示例

```bash
# 查看 React 组件模板
cat prompts/components/react-component.md

# 使用模板生成代码
# 1. 复制模板内容
# 2. 填充占位符
# 3. 粘贴到 AI 对话中
```

## 贡献指南

欢迎提交新的 Prompt 模板！请参考 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可证

MIT License
```

#### LICENSE 文件（MIT 许可证）：
```text
MIT License

Copyright (c) 2026 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
...
```

## 四、Git 工作流程

### 4.1 初始化 Git 仓库
```bash
# 初始化本地仓库
git init

# 添加远程仓库（使用 SSH URL）
git remote add origin git@github.com:your-username/prompt-engineering-library.git

# 检查远程设置
git remote -v
```

### 4.2 首次提交
```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: Structured prompt library setup"

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 4.3 日常工作流程
```bash
# 创建新分支
git checkout -b add-new-template

# 开发完成后
git add .
git commit -m "Add: New prompt template for {purpose}"

# 推送到远程
git push origin add-new-template

# 创建 Pull Request（在 GitHub 界面）
```

## 五、自动化与工具

### 5.1 模板验证脚本
创建 `tools/template-validator.js`：
```javascript
// 检查模板格式是否规范
// 验证要求：
// 1. 必须包含 [技术栈] 或 [Requirements] 部分
// 2. 必须有明确的占位符标记 {...}
// 3. 必须有使用示例
```

### 5.2 一键复制脚本
创建 `tools/copy-template.js`：
```javascript
// 将模板复制到剪贴板，方便使用
```

## 六、维护与更新策略

### 6.1 版本管理
- 使用语义化版本：v1.0.0
- 每次重大更新创建 release
- 维护 CHANGELOG.md

### 6.2 质量保证
1. **模板测试**：每个新模板需通过实际 AI 生成测试
2. **示例验证**：提供的示例必须能实际运行
3. **用户反馈**：收集使用反馈，持续优化

### 6.3 社区建设
1. 添加 issues 模板
2. 设置 Pull Request 模板
3. 编写贡献者指南
4. 添加 Code of Conduct

## 七、高级功能（可选）

### 7.1 GitHub Actions 自动化
- 自动验证模板格式
- 生成模板索引
- 发布到 GitHub Pages

### 7.2 浏览器扩展
- 快速访问常用模板
- 一键填充占位符
- 保存自定义模板

### 7.3 API 服务
- REST API 查询模板
- 模板搜索功能
- 使用统计

## 八、实施时间表

### 阶段一：基础建设（1-2天）
- [ ] 创建目录结构
- [ ] 设置 GitHub 仓库
- [ ] 配置 SSH 密钥
- [ ] 创建核心文档

### 阶段二：内容迁移（2-3天）
- [ ] 拆分现有模板到对应目录
- [ ] 补充英文说明
- [ ] 添加使用示例
- [ ] 创建工具脚本

### 阶段三：质量提升（1-2天）
- [ ] 测试所有模板
- [ ] 收集反馈
- [ ] 优化文档
- [ ] 设置自动化

### 阶段四：发布推广（1天）
- [ ] 创建第一个 release
- [ ] 编写博客/介绍
- [ ] 分享到社区

## 九、故障排除

### 9.1 SSH 连接问题
```bash
# 检查 SSH 配置
ssh -vT git@github.com

# 重新添加密钥
ssh-add ~/.ssh/id_ed25519

# 更新远程 URL
git remote set-url origin git@github.com:username/repo.git
```

### 9.2 Git 推送问题
```bash
# 拉取最新更改
git pull origin main --rebase

# 强制推送（谨慎使用）
git push origin main --force
```

### 9.3 文件权限问题
```bash
# 修复文件权限
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
```

## 十、后续建议

1. **定期更新**：随着技术栈变化更新模板
2. **收集案例**：积累成功使用案例
3. **建立社区**：邀请贡献者共同维护
4. **商业化探索**：考虑高级模板或企业版

---

**开始行动：**

1. 按照本方案创建目录结构
2. 配置 GitHub 仓库和 SSH
3. 迁移和优化现有内容
4. 建立持续维护流程

如有问题，可参考 GitHub 官方文档或联系技术支持。