# Bundle 分析与代码分割方案

## 问题分析

| 依赖 | 体积 | 问题 |
|------|------|------|
| echarts | 800KB | 全量引入，只用了折线图和饼图 |
| lodash | 700KB | 全量引入，使用不到 20% 的函数 |
| antd | 500KB | 未配置按需加载 |
| moment | 300KB | 含全部 locale 文件 |

## 优化方案

### 1. echarts 按需引入（预计节省 600KB）

```javascript
// 修改前
import * as echarts from 'echarts';

// 修改后
import * as echarts from 'echarts/core';
import { LineChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([LineChart, PieChart, GridComponent, TooltipComponent, CanvasRenderer]);
```

### 2. 替换 moment 为 dayjs（预计节省 280KB）

```bash
npm uninstall moment && npm install dayjs
```

### 3. lodash 按需引入（预计节省 500KB）

```javascript
// 修改前
import _ from 'lodash';

// 修改后
import debounce from 'lodash/debounce';
import cloneDeep from 'lodash/cloneDeep';
```

### 4. Webpack splitChunks 配置

```javascript
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
    },
  },
},
```

## 预期效果

| 指标 | 优化前 | 优化后 |
|------|--------|--------|
| 主包大小 | 3.2MB | ~800KB |
| 异步 chunks | 0 | ~1.2MB（按需加载） |
| 首屏加载 | 8s+ | < 3s |

## 实施难度
- 快速优化（1天）：按需引入 + dayjs 替换
- 中期优化（3天）：splitChunks + 路由懒加载
