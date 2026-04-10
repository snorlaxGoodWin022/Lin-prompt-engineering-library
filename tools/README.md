# 辅助工具

用于提升 Prompt 模板使用效率的辅助工具。

## 工具列表

### 模板验证
- **template-validator.js** - 验证模板格式是否符合规范

#### 使用方法

```bash
# 验证所有模板（默认扫描 prompts/ 目录）
node tools/template-validator.js

# 验证指定文件
node tools/template-validator.js prompts/components/react-component.md

# 验证指定目录
node tools/template-validator.js prompts/performance/
```

#### 验证规则

| 规则 | 级别 | 说明 |
|------|------|------|
| H1_TITLE | error | 必须包含一级标题 |
| PLACEHOLDERS | error | 必须包含占位符 `{...}` |
| PLACEHOLDER_FORMAT | warn | 大括号必须成对 |
| TEMPLATE_DESC | error | 必须有模板说明或使用示例 |
| OUTPUT_REQ | error | 必须有输出要求或输出格式 |
| SECTIONS | warn | 至少2个二级标题 |
| NO_TODO | warn | 不应有 TODO/FIXME |
| FILE_NAMING | warn | 文件名 kebab-case |
| LENGTH | warn | 模板长度 10-500 行 |

级别说明：`error` 导致验证失败，`warn` 仅警告。

### Prompt 格式化
- **prompt-formatter.js** - 格式化 Prompt 模板，填充占位符

### 一键复制
- **copy-template.js** - 将模板复制到剪贴板，方便使用

## 开发计划

### 阶段一：基础工具
1. 模板格式验证工具
2. 基本格式化工具

### 阶段二：效率工具
1. 模板搜索和筛选工具
2. 使用统计和评分工具

### 阶段三：集成工具
1. IDE 插件
2. 浏览器扩展
3. CLI 工具

## 使用说明

每个工具应包含：
1. **安装说明**：如何安装和设置
2. **使用方法**：命令行参数或 API 调用方式
3. **配置选项**：可配置的参数和选项
4. **示例代码**：具体使用示例

## 贡献指南

欢迎开发新的辅助工具：
1. 工具应解决实际使用中的痛点
2. 保持工具简单、专注
3. 提供完整的文档和示例
4. 考虑跨平台兼容性