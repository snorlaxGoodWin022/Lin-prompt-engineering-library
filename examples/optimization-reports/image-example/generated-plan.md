# 图片资源优化方案

## 优化策略

### 1. WebP 格式转换（预计体积减少 35%）

```javascript
// vite.config.ts
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
      webp: { quality: 80 },
    }),
  ],
});
```

Vue 组件中使用 picture 标签：
```vue
<template>
  <picture>
    <source :srcset="webpSrc" type="image/webp" />
    <img :src="originalSrc" :alt="alt" loading="lazy" />
  </picture>
</template>
```

### 2. 响应式图片

```vue
<img
  :srcset="`${img400} 400w, ${img800} 800w, ${img1200} 1200w`"
  :sizes="(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px"
  :src="img800"
  loading="lazy"
/>
```

### 3. 懒加载方案

```vue
<template>
  <img v-lazy="imageUrl" :alt="alt" />
</template>

<!-- 或使用原生 lazy loading -->
<img :src="imageUrl" loading="lazy" :alt="alt" />
```

### 4. 实施计划

| 阶段 | 内容 | 预计时间 | 预期效果 |
|------|------|----------|----------|
| 第一阶段 | WebP 转换 + 懒加载 | 1天 | 体积减少 35% |
| 第二阶段 | 响应式图片 + 压缩 | 2天 | 移动端加载提升 50% |
| 第三阶段 | CDN 配置 + 缓存 | 3天 | 重复访问秒开 |

## 预期效果
- 图片总体积：从 ~200MB 降至 ~80MB
- 首屏图片加载：从 5s 降至 < 2s
- LCP 指标提升：减少约 3s
