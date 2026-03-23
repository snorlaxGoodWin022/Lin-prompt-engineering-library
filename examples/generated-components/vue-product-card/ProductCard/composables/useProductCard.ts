/**
 * ProductCard 组合式函数
 *
 * 封装产品卡片的业务逻辑和状态管理
 */

import { ref, computed, watch, type Ref } from 'vue';
import { ElMessage } from 'element-plus';
import type {
  ProductCardProps,
  ProductCardEmits,
  DiscountInfo,
  StockStatus,
  UseProductCardReturn,
  STOCK_STATUS_CONFIG,
} from '../types';

/**
 * 使用 ProductCard 组合式函数
 * @param props - 组件 Props
 * @param emit - 组件 Emits
 * @returns 组合式函数返回值
 */
export function useProductCard(
  props: ProductCardProps,
  emit: ProductCardEmits
): UseProductCardReturn {
  // ==================== 响应式状态 ====================

  /** 图片加载状态 */
  const imageLoading = ref(false);

  /** 图片加载错误 */
  const imageError = ref<string | null>(null);

  /** 添加到购物车的数量 */
  const addToCartQuantity = ref(1);

  /** 显示添加到购物车成功提示 */
  const showAddToCartSuccess = ref(false);

  /** 显示详情弹窗 */
  const showDetailDialog = ref(false);

  // ==================== 计算属性 ====================

  /**
   * 折扣信息计算
   */
  const discountInfo = computed<DiscountInfo>(() => {
    const hasDiscount = props.originalPrice !== undefined && props.originalPrice > props.price;

    if (!hasDiscount) {
      return {
        hasDiscount: false,
        discountPercent: 0,
        savedAmount: 0,
      };
    }

    const discountPercent = Math.round(
      ((props.originalPrice! - props.price) / props.originalPrice!) * 100
    );
    const savedAmount = props.originalPrice! - props.price;

    return {
      hasDiscount,
      discountPercent,
      savedAmount,
    };
  });

  /**
   * 库存状态计算
   */
  const stockStatus = computed<StockStatus>(() => {
    if (props.stock <= 0) {
      return STOCK_STATUS_CONFIG.outOfStock;
    }

    if (props.stock <= 10) {
      return STOCK_STATUS_CONFIG.limited;
    }

    return STOCK_STATUS_CONFIG.sufficient;
  });

  /**
   * 评价星级数组
   */
  const ratingStars = computed(() => {
    const stars = [];
    const fullStars = Math.floor(props.rating);
    const hasHalfStar = props.rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(true); // 实心星
      } else if (i === fullStars && hasHalfStar) {
        stars.push(false); // 半星（这里用空心星表示，实际可用半星图标）
      } else {
        stars.push(false); // 空心星
      }
    }

    return stars;
  });

  /**
   * 是否显示折扣标签
   */
  const showDiscountTag = computed(() => {
    return discountInfo.value.hasDiscount && discountInfo.value.discountPercent >= 10;
  });

  /**
   * 是否可添加到购物车
   */
  const canAddToCart = computed(() => {
    return props.isInStock && stockStatus.value.canPurchase;
  });

  // ==================== 方法函数 ====================

  /**
   * 格式化价格
   * @param price - 价格
   * @returns 格式化后的价格字符串
   */
  const formattedPrice = (price: number): string => {
    return `¥${price.toFixed(2)}`;
  };

  /**
   * 处理图片加载成功
   */
  const handleImageLoad = () => {
    imageLoading.value = false;
    imageError.value = null;
  };

  /**
   * 处理图片加载失败
   * @param error - 错误对象
   */
  const handleImageError = (error: Error) => {
    imageLoading.value = false;
    imageError.value = error.message || '图片加载失败';
    console.error('ProductCard 图片加载失败:', error);
  };

  /**
   * 添加到购物车
   */
  const handleAddToCart = () => {
    if (!canAddToCart.value) {
      ElMessage.warning('商品暂时无法购买');
      return;
    }

    // 触发事件
    emit('add-to-cart', {
      productId: props.productId,
      quantity: addToCartQuantity.value,
    });

    // 显示成功提示
    showAddToCartSuccess.value = true;
    ElMessage.success(`已添加 ${addToCartQuantity.value} 件商品到购物车`);

    // 3秒后隐藏提示
    setTimeout(() => {
      showAddToCartSuccess.value = false;
      addToCartQuantity.value = 1; // 重置数量
    }, 3000);
  };

  /**
   * 查看详情
   */
  const handleViewDetail = () => {
    // 触发事件
    emit('view-detail', { productId: props.productId });

    // 打开详情弹窗
    showDetailDialog.value = true;
  };

  /**
   * 切换收藏状态
   */
  const handleToggleFavorite = () => {
    const newFavoriteState = !props.isFavorite;

    // 触发事件
    emit('toggle-favorite', {
      productId: props.productId,
      isFavorite: newFavoriteState,
    });

    // 显示提示
    const message = newFavoriteState ? '已添加到收藏' : '已取消收藏';
    ElMessage.success(message);
  };

  /**
   * 立即购买
   */
  const handleQuickBuy = () => {
    if (!canAddToCart.value) {
      ElMessage.warning('商品暂时无法购买');
      return;
    }

    // 触发事件
    emit('quick-buy', { productId: props.productId });

    // 显示提示
    ElMessage.info('跳转到确认订单页面');
  };

  /**
   * 增加购买数量
   */
  const increaseQuantity = () => {
    if (addToCartQuantity.value < props.stock) {
      addToCartQuantity.value++;
    } else {
      ElMessage.warning('已达到最大库存数量');
    }
  };

  /**
   * 减少购买数量
   */
  const decreaseQuantity = () => {
    if (addToCartQuantity.value > 1) {
      addToCartQuantity.value--;
    }
  };

  // ==================== 副作用 ====================

  /**
   * 监听库存变化
   */
  watch(
    () => props.stock,
    (newStock) => {
      if (addToCartQuantity.value > newStock) {
        addToCartQuantity.value = Math.max(1, newStock);
        ElMessage.warning('库存变化，已调整购买数量');
      }
    }
  );

  /**
   * 监听图片URL变化
   */
  watch(
    () => props.imageUrl,
    (newImageUrl) => {
      if (newImageUrl) {
        imageLoading.value = true;
        imageError.value = null;
      }
    },
    { immediate: true }
  );

  // ==================== 返回对象 ====================

  return {
    // 状态
    discountInfo,
    stockStatus,
    ratingStars,
    showDiscountTag,
    canAddToCart,
    imageLoading,
    imageError,
    addToCartQuantity,
    showAddToCartSuccess,
    showDetailDialog,

    // 方法
    formattedPrice,
    handleImageLoad,
    handleImageError,
    handleAddToCart,
    handleViewDetail,
    handleToggleFavorite,
    handleQuickBuy,
    increaseQuantity,
    decreaseQuantity,
  };
}