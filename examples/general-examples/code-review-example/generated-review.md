# 代码审查报告

## 审查总结
代码整体质量良好，逻辑清晰，但存在几个需要注意的问题。

## 问题列表

### 严重问题
无

### 中等问题

1. **toggleAll 的闭包陷阱**
   - 位置：`useSelection.ts:12-18`
   - 影响：`selectedIds` 在 useCallback 依赖数组中，每次选中状态变化都会重新创建函数，可能导致子组件不必要的重渲染
   - 建议：使用函数式更新
   ```typescript
   const toggleAll = useCallback(() => {
     setSelectedIds(prev => {
       if (prev.size === items.length) return new Set();
       return new Set(items.map(i => i.id));
     });
   }, [items]);
   ```

2. **items 依赖不稳定**
   - 影响：如果 items 每次渲染都是新数组引用，toggleAll 会频繁重建
   - 建议：将 items 序列化为依赖或使用 useRef

### 轻微建议

1. **添加 partialSelected 状态**：当部分选中时 UI 显示半选状态
   ```typescript
   const isPartial = selectedIds.size > 0 && selectedIds.size < items.length;
   ```

2. **导出 selectedCount**：便于显示"已选中 N 项"

## 代码优点
- 使用 Set 而非数组存储选中 ID，查找效率 O(1)
- toggle 使用函数式更新，避免状态竞态
- 泛型约束 `T extends { id: string }` 类型安全

## 学习要点
- useCallback 依赖数组的正确使用
- Set 在选择场景下的性能优势
- 函数式 setState 避免闭包陷阱
