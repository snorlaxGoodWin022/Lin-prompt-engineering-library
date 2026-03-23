# 快速开始指南

欢迎使用 Prompt 工程库！本指南将帮助你快速上手使用这个模板库。

## 第一步：了解项目结构

首先，了解项目的目录结构：

```
├── prompts/           # Prompt 模板目录
│   ├── components/    # 组件开发模板
│   ├── performance/   # 性能优化模板
│   ├── collaboration/ # 团队协作模板
│   └── general/       # 通用模板
├── examples/          # 使用示例
├── tools/             # 辅助工具
└── docs/              # 文档
```

## 第二步：选择合适模板

根据你的需求选择合适的模板：

### 如果你要开发组件
- 使用 `prompts/components/` 目录下的模板
- React 组件：`react-component.md`
- Vue 组件：`vue-component.md`
- 组件文档：`component-documentation.md`

### 如果你要优化性能
- 使用 `prompts/performance/` 目录下的模板
- Lighthouse 分析：`lighthouse-analysis.md`
- Bundle 分析：`bundle-analysis.md`
- 图片优化：`image-optimization.md`

### 如果你要团队协作
- 使用 `prompts/collaboration/` 目录下的模板
- Git Commit：`git-commit-messages.md`
- PR 描述：`pr-descriptions.md`
- 技术文档：`technical-documentation.md`

## 第三步：使用模板

### 基本使用步骤
1. 打开对应的模板文件
2. 复制模板内容
3. 替换 `{...}` 占位符
4. 粘贴到 AI 助手对话中

### 示例：生成 React 组件
```bash
# 查看 React 组件模板
cat prompts/components/react-component.md

# 复制模板内容，修改占位符
# 组件名：UserCard
# 功能描述：展示用户信息卡片
# Props：userId, showDetail, onCardClick
```

### 示例：生成 Git Commit
```bash
# 查看 Git Commit 模板
cat prompts/collaboration/git-commit-messages.md

# 复制模板，描述你的改动
# 本次改动：修复用户列表翻页丢失筛选条件的问题
```

## 第四步：查看示例

参考 `examples/` 目录中的实际使用示例：

- `examples/generated-components/` - AI 生成的组件示例
- `examples/optimization-reports/` - 优化方案示例

## 第五步：自定义模板

如果现有模板不完全符合你的需求：

1. 复制最接近的模板
2. 修改技术栈和规范要求
3. 保存为新的模板文件
4. 考虑提交贡献给项目

## 常见问题

### Q1：模板中的技术栈和我项目不一样怎么办？
A：修改模板中的技术栈部分，替换为你的项目使用的框架、库和工具。

### Q2：生成的代码质量不满意怎么办？
A：尝试：
- 提供更详细的需求描述
- 添加更多的约束和规范
- 参考 `examples/` 中的高质量示例
- 迭代优化你的 Prompt

### Q3：如何分享模板给团队？
A：
1. 将整个项目推送到团队 Git 仓库
2. 创建团队内部文档介绍使用方法
3. 在团队会议中演示模板使用
4. 收集反馈持续改进模板

## 下一步

- 阅读 [最佳实践](best-practices.md) 提升使用效果
- 查看 [原始文档](original-chinese-library.md) 了解设计思路
- 参与 [贡献指南](contribution-guide.md) 改进模板库

祝使用愉快！