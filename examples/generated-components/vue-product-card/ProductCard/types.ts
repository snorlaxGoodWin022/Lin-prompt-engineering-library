/**
 * ProductCard 组件类型定义
 */

import type { Ref } from 'vue';

/**
 * 产品卡片 Props 类型
 */
export interface ProductCardProps {
  /** 产品ID */
  productId: string;

  /** 产品名称 */
  productName: string;

  /** 产品图片URL */
  imageUrl: string;

  /** 产品价格（单位：元） */
  price: number;

  /** 原价（用于显示折扣），可选 */
  originalPrice?: number;

  /** 库存数量 */
  stock: number;

  /** 是否有库存（根据stock计算） */
  isInStock: boolean;

  /** 产品标签数组 */
  tags: string[];

  /** 产品评分（0-5） */
  rating: number;

  /** 是否显示操作按钮 */
  showActions: boolean;

  /** 是否已收藏 */
  isFavorite: boolean;
}

/**
 * 组件 Events 定义
 */
export interface ProductCardEmits {
  /** 点击"加入购物车"按钮时触发 */
  (e: 'add-to-cart', payload: { productId: string; quantity: number }): void;

  /** 点击"查看详情"按钮或卡片主体时触发 */
  (e: 'view-detail', payload: { productId: string }): void;

  /** 点击收藏按钮时触发 */
  (e: 'toggle-favorite', payload: { productId: string; isFavorite: boolean }): void;

  /** 点击"立即购买"按钮时触发 */
  (e: 'quick-buy', payload: { productId: string }): void;
}

/**
 * 组件内部状态类型
 */
export interface ProductCardState {
  /** 是否显示图片加载中状态 */
  imageLoading: boolean;

  /** 图片加载错误信息 */
  imageError: string | null;

  /** 添加到购物车的数量 */
  addToCartQuantity: number;

  /** 是否显示添加到购物车成功提示 */
  showAddToCartSuccess: boolean;

  /** 是否显示详情弹窗 */
  showDetailDialog: boolean;
}

/**
 * 折扣信息类型
 */
export interface DiscountInfo {
  /** 是否有折扣 */
  hasDiscount: boolean;

  /** 折扣百分比 */
  discountPercent: number;

  /** 节省金额 */
  savedAmount: number;
}

/**
 * 库存状态类型
 */
export interface StockStatus {
  /** 库存状态文本 */
  text: string;

  /** 库存状态颜色 */
  color: 'success' | 'warning' | 'danger';

  /** 库存状态图标 */
  icon: string;

  /** 是否可购买 */
  canPurchase: boolean;
}

/**
 * 组合式函数返回值类型
 */
export interface UseProductCardReturn {
  /** 折扣信息 */
  discountInfo: Ref<DiscountInfo>;

  /** 库存状态 */
  stockStatus: Ref<StockStatus>;

  /** 评价星级数组 */
  ratingStars: Ref<boolean[]>;

  /** 格式化价格 */
  formattedPrice: (price: number) => string;

  /** 处理图片加载成功 */
  handleImageLoad: () => void;

  /** 处理图片加载失败 */
  handleImageError: (error: Error) => void;

  /** 添加到购物车 */
  handleAddToCart: () => void;

  /** 查看详情 */
  handleViewDetail: () => void;

  /** 切换收藏状态 */
  handleToggleFavorite: () => void;

  /** 立即购买 */
  handleQuickBuy: () => void;

  /** 增加购买数量 */
  increaseQuantity: () => void;

  /** 减少购买数量 */
  decreaseQuantity: () => void;
}

/**
 * 组件 Props 默认值
 */
export const defaultProps: Partial<ProductCardProps> = {
  originalPrice: undefined,
  stock: 0,
  isInStock: true,
  tags: [],
  rating: 0,
  showActions: true,
  isFavorite: false,
};

/**
 * 库存状态配置
 */
export const STOCK_STATUS_CONFIG = {
  /** 库存充足：大于10 */
  sufficient: {
    text: '库存充足',
    color: 'success' as const,
    icon: 'CircleCheck',
    canPurchase: true,
  },

  /** 库存紧张：1-10 */
  limited: {
    text: '库存紧张',
    color: 'warning' as const,
    icon: 'Warning',
    canPurchase: true,
  },

  /** 无库存：0 */
  outOfStock: {
    text: '缺货',
    color: 'danger' as const,
    icon: 'CircleClose',
    canPurchase: false,
  },
} as const;