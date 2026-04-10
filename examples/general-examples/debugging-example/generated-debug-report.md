# 调试分析报告

## 问题分析

### 根本原因
`handleFilterChange` 函数更新了 `filters` 状态，但没有同时重置 `page` 为 1。React Query 使用 `['products', page, filters]` 作为缓存 key，当 filters 变化但 page 仍然是 3 时，会请求新条件下的第 3 页数据，如果该条件下数据不足 3 页，就会返回空结果。

### 问题定位
`handleFilterChange` 函数中缺少 `setPage(1)` 调用。

## 解决方案

### 代码修改

```typescript
// 修改前
const handleFilterChange = (newFilters) => {
  setFilters(newFilters);
};

// 修改后
const handleFilterChange = (newFilters) => {
  setFilters(newFilters);
  setPage(1);  // 切换筛选条件时重置页码
};
```

### 更健壮的写法

```typescript
function ProductList() {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  // 或使用 useEffect 同步
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const { data } = useQuery(
    ['products', page, filters],
    () => fetchProducts({ page, ...filters }),
  );

  return (
    <div>
      <FilterBar onChange={handleFilterChange} />
      <Table data={data} />
      <Pagination current={page} onChange={setPage} />
    </div>
  );
}
```

## 预防措施

1. **封装 useFilterPage Hook**：统一管理筛选 + 分页状态
   ```typescript
   function useFilterPage() {
     const [filters, setFilters] = useState({});
     const [page, setPage] = useState(1);
     const updateFilters = (f) => { setFilters(f); setPage(1); };
     return { filters, page, setPage, updateFilters };
   }
   ```

2. **URL 同步**：将 page 和 filters 同步到 URL，便于分享和刷新保持

3. **代码审查清单**：添加"筛选变更是否重置分页"到审查项
