# Button 按钮组件

一个功能丰富的 React 按钮组件，支持多种变体、尺寸、加载状态和图标。

## 安装

```bash
npm install @my-ui/button
```

## Props API

| 参数 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| variant | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | 否 | 按钮变体样式 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 否 | 按钮尺寸 |
| loading | `boolean` | `false` | 否 | 是否显示加载状态 |
| disabled | `boolean` | `false` | 否 | 是否禁用按钮 |
| icon | `ReactNode` | - | 否 | 按钮前缀图标 |
| children | `ReactNode` | - | 是 | 按钮文本内容 |
| onClick | `(e: MouseEvent) => void` | - | 否 | 点击回调函数 |

## 使用示例

### 基础用法

```tsx
import { Button } from '@my-ui/button';

function App() {
  return <Button onClick={() => alert('clicked')}>点击我</Button>;
}
```

### 带图标的按钮

```tsx
import { Button } from '@my-ui/button';
import { SearchIcon } from '@my-ui/icons';

function SearchButton() {
  return <Button icon={<SearchIcon />}>搜索</Button>;
}
```

### 加载状态

```tsx
function SubmitButton() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await submitForm();
    setLoading(false);
  };

  return (
    <Button loading={loading} onClick={handleSubmit} variant="primary">
      提交
    </Button>
  );
}
```

## 注意事项

- `loading` 和 `disabled` 状态都会阻止点击事件
- `icon` 仅在非加载状态时显示
- 组件使用 CSS Modules，确保构建工具支持

## FAQ

**Q: 如何自定义按钮颜色？**
A: 通过 `variant` 属性选择预设样式，如需自定义可通过 CSS 覆盖 `.btn` 类。

**Q: loading 状态下按钮文字还能点击吗？**
A: 不能，loading 状态会自动禁用按钮。

**Q: 支持原生 button 属性吗？**
A: 当前版本仅支持上述 Props，后续可通过扩展 ButtonProps 继承 HTMLButtonElement 属性。
