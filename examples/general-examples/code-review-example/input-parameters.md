# 代码审查输入参数

## 技术栈
React 18 + TypeScript

## 代码功能
一个自定义 Hook，用于管理表格的多选逻辑（全选、反选、跨页选中）

## 待审查代码

```typescript
import { useState, useCallback } from 'react';

export function useSelection<T extends { id: string }>(items: T[]) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggle = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    if (selectedIds.size === items.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map(i => i.id)));
    }
  }, [items, selectedIds]);

  const isSelected = (id: string) => selectedIds.has(id);
  const isAllSelected = selectedIds.size === items.length && items.length > 0;

  return { selectedIds, toggle, toggleAll, isSelected, isAllSelected };
}
```
