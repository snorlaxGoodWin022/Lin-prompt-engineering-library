# Vue 3 组合式 API 组件生成模板

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

**组件名：** {组件名}

**功能：** {功能描述}

**Props：**
- {prop名}: {类型} - {说明} - {默认值}

**Events：**
- {事件名}: {参数} - {触发时机}

## 代码质量要求

- 使用 defineProps 和 defineEmits
- Props 和 Emits 都要有完整类型定义
- 响应式变量用 ref/reactive，说明使用理由
- 副作用统一放在 onMounted
- 提供组件使用示例

## 输出要求

生成完整代码，包括组件文件、类型文件、使用示例。

---

## 模板说明

此模板适用于生成使用 Vue 3 组合式 API 的组件，遵循现代 Vue 开发最佳实践。模板强调类型安全、代码结构和可维护性。

### 参数说明

| 参数 | 说明 | 示例 |
|------|------|------|
| `{组件名称}` | 组件名，用于文件名和组件定义 | `ProductCard`、`SearchBar` |
| `{详细描述组件要做什么}` | 一句话说明组件功能和交互 | `商品卡片，支持收藏和加入购物车` |
| `{prop名}` / `{类型}` / `{说明}` | Props 参数定义 | `productId`、`string`、`商品ID` |
| `{事件名}` / `{参数}` / `{触发时机}` | 组件 emit 事件 | `addCart`、`productId`、`点击加购按钮` |

### 适用场景

- 生成符合 Vue 3 Composition API 规范的业务组件
- 项目使用 Element Plus + Pinia 技术栈
- 需要完整的 TypeScript 类型定义
- 需要包含 composables 逻辑复用

### 使用建议

1. 优先使用 `<script setup lang="ts">` 语法
2. Props 和 Emits 使用 `defineProps` / `defineEmits` 定义
3. 复杂逻辑抽取为 composable 函数
4. 样式使用 `<style lang="scss" scoped>` 局部作用域