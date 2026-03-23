# React 业务组件生成模板

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

**组件名：** {组件名称}

**功能描述：** {详细描述组件要做什么}

**Props定义：**
- {prop1}: {类型} - {说明}
- {prop2}: {类型} - {说明}

## 额外要求

- 需要处理loading状态
- 需要错误边界处理
- 需要写5个基础测试用例

## 输出要求

请生成完整的代码，包括所有文件。

---

## 使用示例

```markdown
你是一个资深前端工程师，请帮我生成一个React业务组件。

【技术栈】
- React 18 + TypeScript
- 状态管理：Zustand
- UI库：Ant Design 5.x
- 样式方案：CSS Modules

【代码规范】
1. 组件名使用PascalCase
2. 文件夹结构：
   ComponentName/
   ├── index.tsx
   ├── types.ts
   ├── styles.module.css
   └── __tests__/
3. Props必须有完整的TypeScript类型定义
4. 导出组件时使用export default
5. 所有函数必须写JSDoc注释

【组件需求】
组件名：UserCard
功能描述：展示用户信息卡片，包含头像、姓名、部门、职位，支持点击跳转用户详情页
Props定义：
- userId: string - 用户ID
- showDetail: boolean - 是否显示详细信息，默认true
- onCardClick?: (userId: string) => void - 卡片点击回调

【额外要求】
- 需要处理loading状态
- 需要错误边界处理
- 需要写5个基础测试用例

请生成完整的代码，包括所有文件。
```