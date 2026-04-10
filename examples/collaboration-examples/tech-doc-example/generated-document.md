# 商品列表页功能设计文档

## 1. 概述

### 1.1 文档目的
本文档描述电商后台管理系统「商品列表页」的功能设计方案，包括筛选、排序、分页功能的实现细节。

### 1.2 目标读者
前端新人，已熟悉 React 基础和 Ant Design 组件库。

## 2. 功能设计

### 2.1 筛选功能

| 筛选项 | 组件 | 类型 | 默认值 |
|--------|------|------|--------|
| 商品类目 | Cascader | 单选 | 全部 |
| 价格区间 | InputNumber × 2 | 范围 | 不限 |
| 上架状态 | Select | 单选 | 全部 |
| 关键词 | Input | 文本 | 空 |

### 2.2 排序功能
- 支持排序字段：价格、销量、创建时间
- 排序方向：升序 / 降序
- 默认：按创建时间降序

### 2.3 分页功能
- 每页条数可选：10 / 20 / 50 / 100
- 默认每页 20 条
- 显示总数和当前范围

### 2.4 状态管理

```typescript
interface FilterState {
  category?: string[];
  priceRange?: [number, number];
  status?: 'all' | 'online' | 'offline';
  keyword?: string;
  sortBy: 'price' | 'sales' | 'createdAt';
  sortOrder: 'asc' | 'desc';
  page: number;
  pageSize: number;
}
```

### 2.5 数据流

```
用户操作 → 更新 URL Query → 触发 API 请求 → 更新表格数据
```

使用 URL Query 存储筛选状态，支持刷新保持和分享链接。

## 3. 组件结构

```
ProductList/
├── index.tsx              # 页面入口
├── ProductFilter.tsx      # 筛选栏
├── ProductTable.tsx       # 数据表格
└── hooks/
    └── useProductList.ts  # 数据获取逻辑
```

## 4. 后续计划
- 添加批量操作功能
- 支持导出商品数据
- 添加列自定义显示
