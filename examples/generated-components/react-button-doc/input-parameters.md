# 组件文档生成输入参数

## 目标组件
一个 React 按钮组件（Button），支持多种变体（primary/secondary/danger）、尺寸（small/medium/large）、加载状态、禁用状态和图标支持。

## 组件代码

```tsx
import React from 'react';
import styles from './styles.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  children,
  onClick,
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${styles[size]}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <span className={styles.spinner} /> : icon}
      {children}
    </button>
  );
};
```

## 文档要求
- 使用中文
- 包含完整的 Props API 表格
- 提供基础用法、带图标、加载状态三个示例
- 包含 FAQ 部分
