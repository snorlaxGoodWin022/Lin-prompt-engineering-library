# UserCard 组件生成输入参数

## 模板来源
使用模板：`prompts/components/react-component.md`

## 填充参数

### 1. 组件名称
**占位符：** `{组件名称}`
**填充值：** `UserCard`

### 2. 功能描述
**占位符：** `{详细描述组件要做什么}`
**填充值：** 展示用户信息卡片，包含头像、姓名、部门、职位信息。支持显示/隐藏详细信息模式，支持卡片点击事件。

### 3. Props定义
**占位符：** `{prop1}: {类型} - {说明}`
**填充值：**
- `userId: string` - 用户ID，用于获取用户数据
- `userName: string` - 用户姓名
- `avatarUrl?: string` - 用户头像URL（可选）
- `department: string` - 所属部门
- `position: string` - 职位
- `showDetail?: boolean` - 是否显示详细信息，默认true
- `isActive?: boolean` - 用户是否在职状态
- `onCardClick?: (userId: string) => void` - 卡片点击回调函数

## 完整的 Prompt（可直接复制使用）

```markdown
你是一个资深前端工程师，请帮我生成一个React业务组件。

## 技术栈

- React 18 + TypeScript
- 状态管理：Zustand
- UI库：Ant Design 5.x
- 样式方案：CSS Modules

## 代码规范

1. 组件名使用PascalCase
2. 文件夹结构：
   ```
   ComponentName/
   ├── index.tsx          # 组件入口
   ├── types.ts           # TypeScript类型定义
   ├── styles.module.css  # 样式文件
   └── __tests__/         # 测试文件
   ```
3. Props必须有完整的TypeScript类型定义
4. 导出组件时使用export default
5. 所有函数必须写JSDoc注释

## 组件需求

**组件名：** UserCard

**功能描述：** 展示用户信息卡片，包含头像、姓名、部门、职位信息。支持显示/隐藏详细信息模式，支持卡片点击事件。

**Props定义：**
- userId: string - 用户ID，用于获取用户数据
- userName: string - 用户姓名
- avatarUrl?: string - 用户头像URL（可选）
- department: string - 所属部门
- position: string - 职位
- showDetail?: boolean - 是否显示详细信息，默认true
- isActive?: boolean - 用户是否在职状态
- onCardClick?: (userId: string) => void - 卡片点击回调函数

## 额外要求

- 需要处理loading状态
- 需要错误边界处理
- 需要写5个基础测试用例

## 输出要求

请生成完整的代码，包括所有文件。
```

## 使用步骤

1. 复制上方完整的 Prompt 内容
2. 粘贴到 Claude、ChatGPT 或 DeepSeek 等 AI 助手中
3. 获取生成的完整代码文件
4. 按照文件夹结构组织代码

## 预期输出

基于此 Prompt，AI 助手应生成以下文件：
- `UserCard/index.tsx` - 主组件文件
- `UserCard/types.ts` - TypeScript 类型定义
- `UserCard/styles.module.css` - CSS Module 样式文件
- `UserCard/__tests__/UserCard.test.tsx` - 测试文件

## 技术栈说明

- **React 18 + TypeScript**：使用最新的 React 特性，严格类型检查
- **Zustand**：轻量级状态管理，用于管理用户状态
- **Ant Design 5.x**：企业级 UI 组件库，提供一致的视觉风格
- **CSS Modules**：局部作用域 CSS，避免样式冲突