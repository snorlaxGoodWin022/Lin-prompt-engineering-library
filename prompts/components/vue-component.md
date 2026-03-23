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