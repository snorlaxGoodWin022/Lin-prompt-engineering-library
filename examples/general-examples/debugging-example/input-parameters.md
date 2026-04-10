# 调试帮助输入参数

## 问题描述
- 问题现象：列表页面切换筛选条件后，分页没有重置到第1页
- 发生环境：生产环境
- 复现步骤：1. 进入商品列表 2. 翻到第3页 3. 切换筛选条件 4. 数据为空（因为请求了第3页但新条件不足3页数据）
- 期望行为：切换筛选条件后应自动回到第1页

## 相关代码

```typescript
function ProductList() {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const { data } = useQuery(['products', page, filters], () =>
    fetchProducts({ page, ...filters })
  );

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // 忘记重置 page
  };

  return (
    <div>
      <FilterBar onChange={handleFilterChange} />
      <Table data={data} />
      <Pagination current={page} onChange={setPage} />
    </div>
  );
}
```

## 错误信息
无报错，但数据为空

## 已尝试的解决步骤
1. 检查了 API 返回数据格式 - 正常
2. 检查了筛选逻辑 - 正确传递参数
3. 在浏览器 Network 查看 - 发现 page 仍然是 3
