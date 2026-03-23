# ProductCard 组件生成输入参数

## 模板来源
使用模板：`prompts/components/vue-component.md`

## 填充参数

### 1. 组件名
**占位符：** `{组件名}`
**填充值：** `ProductCard`

### 2. 功能描述
**占位符：** `{功能描述}`
**填充值：** 展示产品卡片，包含产品图片、名称、价格、库存信息。支持添加到购物车、查看详情、收藏等功能。根据库存状态显示不同样式。

### 3. Props定义
**占位符：** `{prop名}: {类型} - {说明} - {默认值}`

**填充值：**
- `productId: string` - 产品ID - `''`
- `productName: string` - 产品名称 - `''`
- `imageUrl: string` - 产品图片URL - `''`
- `price: number` - 产品价格（单位：元） - `0`
- `originalPrice?: number` - 原价（用于显示折扣） - `undefined`
- `stock: number` - 库存数量 - `0`
- `isInStock: boolean` - 是否有库存（根据stock计算） - `true`
- `tags: string[]` - 产品标签数组 - `[]`
- `rating: number` - 产品评分（0-5） - `0`
- `showActions: boolean` - 是否显示操作按钮 - `true`
- `isFavorite: boolean` - 是否已收藏 - `false`

### 4. Events定义
**占位符：** `{事件名}: {参数} - {触发时机}`

**填充值：**
- `add-to-cart: { productId: string, quantity: number }` - 点击"加入购物车"按钮时触发
- `view-detail: { productId: string }` - 点击"查看详情"按钮或卡片主体时触发
- `toggle-favorite: { productId: string, isFavorite: boolean }` - 点击收藏按钮时触发
- `quick-buy: { productId: string }` - 点击"立即购买"按钮时触发

## 完整的 Prompt（可直接复制使用）

```markdown
你是一个Vue 3专家，请帮我创建一个组合式API组件。

## 项目配置

- Vue 3.4 + TypeScript
- 构建工具：Vite
- UI库：Element Plus
- 状态管理：Pinia
- 样式：SCSS

## 命名与结构规范

1. 组件文件名：kebab-case.vue
2. setup script使用 `<script setup lang="ts">`
3. 样式使用 `<style scoped lang="scss">`
4. 类型定义单独文件 types.ts
5. 组合式函数放在 composables 文件夹

## 组件要求

**组件名：** ProductCard

**功能：** 展示产品卡片，包含产品图片、名称、价格、库存信息。支持添加到购物车、查看详情、收藏等功能。根据库存状态显示不同样式。

**Props：**
- productId: string - 产品ID - ''
- productName: string - 产品名称 - ''
- imageUrl: string - 产品图片URL - ''
- price: number - 产品价格（单位：元） - 0
- originalPrice?: number - 原价（用于显示折扣） - undefined
- stock: number - 库存数量 - 0
- isInStock: boolean - 是否有库存（根据stock计算） - true
- tags: string[] - 产品标签数组 - []
- rating: number - 产品评分（0-5） - 0
- showActions: boolean - 是否显示操作按钮 - true
- isFavorite: boolean - 是否已收藏 - false

**Events：**
- add-to-cart: { productId: string, quantity: number } - 点击"加入购物车"按钮时触发
- view-detail: { productId: string } - 点击"查看详情"按钮或卡片主体时触发
- toggle-favorite: { productId: string, isFavorite: boolean } - 点击收藏按钮时触发
- quick-buy: { productId: string } - 点击"立即购买"按钮时触发

## 代码质量要求

- 使用 defineProps 和 defineEmits
- Props 和 Emits 都要有完整类型定义
- 响应式变量用 ref/reactive，说明使用理由
- 副作用统一放在 onMounted
- 提供组件使用示例

## 输出要求

生成完整代码，包括组件文件、类型文件、使用示例。
```

## 使用步骤

1. 复制上方完整的 Prompt 内容
2. 粘贴到支持 Vue 3 的 AI 助手中
3. 获取生成的完整代码文件
4. 按照规范组织代码结构

## 预期输出

基于此 Prompt，AI 助手应生成以下文件：
- `product-card.vue` - 主组件文件（使用 `<script setup lang="ts">`）
- `types.ts` - TypeScript 类型定义
- `composables/useProductCard.ts` - 组合式函数
- `usage-example.vue` - 组件使用示例

## 技术栈说明

- **Vue 3.4 + TypeScript**：使用组合式 API 和严格类型检查
- **Vite**：现代构建工具，提供快速开发体验
- **Element Plus**：基于 Vue 3 的企业级 UI 组件库
- **Pinia**：Vue 官方推荐的状态管理库
- **SCSS**：功能强大的 CSS 预处理器，支持嵌套、变量等特性

## 设计考虑

1. **响应式设计**：组件应适配不同屏幕尺寸
2. **无障碍访问**：添加适当的 ARIA 属性和键盘导航
3. **性能优化**：图片懒加载、事件防抖、条件渲染
4. **可定制性**：通过 Props 提供灵活的配置选项
5. **用户体验**：清晰的视觉层次、友好的交互反馈