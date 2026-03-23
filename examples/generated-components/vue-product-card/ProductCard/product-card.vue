<!--
  ProductCard 组件
  展示产品卡片，包含产品图片、名称、价格、库存信息。
  支持添加到购物车、查看详情、收藏等功能。
-->

<template>
  <div
    class="product-card"
    :class="{
      'out-of-stock': !canAddToCart,
      'has-discount': discountInfo.hasDiscount,
    }"
    @click="handleViewDetail"
  >
    <!-- 折扣标签 -->
    <div v-if="showDiscountTag" class="discount-tag">
      <el-tag type="danger" size="small" effect="dark">
        -{{ discountInfo.discountPercent }}%
      </el-tag>
    </div>

    <!-- 收藏按钮 -->
    <div class="favorite-button" @click.stop="handleToggleFavorite">
      <el-button
        :type="isFavorite ? 'danger' : 'info'"
        :icon="isFavorite ? 'StarFilled' : 'Star'"
        circle
        size="small"
        plain
      />
    </div>

    <!-- 产品图片 -->
    <div class="image-container">
      <div v-if="imageLoading" class="image-loading">
        <el-icon class="loading-icon"><Loading /></el-icon>
        <span>加载中...</span>
      </div>

      <div v-else-if="imageError" class="image-error">
        <el-icon class="error-icon"><Picture /></el-icon>
        <span>{{ imageError }}</span>
      </div>

      <img
        v-else
        :src="imageUrl"
        :alt="productName"
        class="product-image"
        @load="handleImageLoad"
        @error="handleImageError"
        loading="lazy"
      />

      <!-- 库存状态 -->
      <div class="stock-status">
        <el-tag
          :type="stockStatus.color"
          size="small"
          :icon="stockStatus.icon"
          effect="plain"
        >
          {{ stockStatus.text }}
        </el-tag>
      </div>
    </div>

    <!-- 产品信息 -->
    <div class="product-info">
      <!-- 产品名称 -->
      <h3 class="product-name" :title="productName">
        {{ productName }}
      </h3>

      <!-- 产品标签 -->
      <div v-if="tags.length > 0" class="product-tags">
        <el-tag
          v-for="(tag, index) in tags.slice(0, 3)"
          :key="index"
          size="small"
          type="info"
          effect="plain"
          class="tag"
        >
          {{ tag }}
        </el-tag>
        <span v-if="tags.length > 3" class="more-tags">+{{ tags.length - 3 }}</span>
      </div>

      <!-- 价格信息 -->
      <div class="price-section">
        <!-- 当前价格 -->
        <div class="current-price">
          <span class="price">{{ formattedPrice(price) }}</span>
          <span v-if="discountInfo.hasDiscount" class="saved-amount">
            节省 ¥{{ discountInfo.savedAmount.toFixed(2) }}
          </span>
        </div>

        <!-- 原价（如果有折扣） -->
        <div v-if="discountInfo.hasDiscount" class="original-price">
          <del>{{ formattedPrice(originalPrice!) }}</del>
        </div>
      </div>

      <!-- 评价信息 -->
      <div class="rating-section">
        <div class="stars">
          <el-icon
            v-for="(isFull, index) in ratingStars"
            :key="index"
            :class="{ 'full-star': isFull, 'empty-star': !isFull }"
          >
            <Star v-if="isFull" />
            <StarFilled v-else />
          </el-icon>
        </div>
        <span class="rating-text">{{ rating.toFixed(1) }}分</span>
        <span class="stock-text">库存 {{ stock }} 件</span>
      </div>
    </div>

    <!-- 操作按钮区域 -->
    <div v-if="showActions" class="action-buttons" @click.stop>
      <!-- 数量选择器 -->
      <div v-if="canAddToCart" class="quantity-selector">
        <el-button
          :disabled="addToCartQuantity <= 1"
          @click="decreaseQuantity"
          size="small"
          circle
          plain
        >
          <el-icon><Minus /></el-icon>
        </el-button>

        <span class="quantity">{{ addToCartQuantity }}</span>

        <el-button
          :disabled="addToCartQuantity >= stock"
          @click="increaseQuantity"
          size="small"
          circle
          plain
        >
          <el-icon><Plus /></el-icon>
        </el-button>
      </div>

      <!-- 添加到购物车按钮 -->
      <el-button
        v-if="canAddToCart"
        type="primary"
        :loading="showAddToCartSuccess"
        @click="handleAddToCart"
        class="add-to-cart-btn"
        :disabled="!canAddToCart"
      >
        <template #icon>
          <el-icon><ShoppingCart /></el-icon>
        </template>
        加入购物车
      </el-button>

      <!-- 立即购买按钮 -->
      <el-button
        v-if="canAddToCart"
        type="success"
        @click="handleQuickBuy"
        class="quick-buy-btn"
        plain
      >
        立即购买
      </el-button>

      <!-- 缺货状态 -->
      <div v-else class="out-of-stock-message">
        <el-alert
          title="商品暂时缺货"
          type="warning"
          :closable="false"
          show-icon
          center
        />
      </div>
    </div>

    <!-- 详情弹窗 -->
    <el-dialog
      v-model="showDetailDialog"
      :title="productName"
      width="600px"
      destroy-on-close
    >
      <div class="detail-content">
        <img :src="imageUrl" :alt="productName" class="detail-image" />
        <div class="detail-info">
          <h4>产品详情</h4>
          <p>产品ID: {{ productId }}</p>
          <p>库存: {{ stock }} 件</p>
          <p>评分: {{ rating.toFixed(1) }}分</p>
          <div v-if="tags.length > 0">
            <p>标签: {{ tags.join(', ') }}</p>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDetailDialog = false">关闭</el-button>
          <el-button type="primary" @click="handleAddToCart">
            加入购物车
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import {
  Loading,
  Picture,
  Star,
  StarFilled,
  ShoppingCart,
  Minus,
  Plus,
} from '@element-plus/icons-vue';
import {
  ElTag,
  ElButton,
  ElIcon,
  ElAlert,
  ElDialog,
  ElMessage,
} from 'element-plus';
import { useProductCard } from './composables/useProductCard';
import type { ProductCardProps, ProductCardEmits } from './types';

// ==================== Props & Emits ====================
const props = defineProps<ProductCardProps>();
const emit = defineEmits<ProductCardEmits>();

// ==================== 使用组合式函数 ====================
const {
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
} = useProductCard(props, emit);
</script>

<style scoped lang="scss">
.product-card {
  position: relative;
  width: 280px;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);

    .product-image {
      transform: scale(1.05);
    }
  }

  &.out-of-stock {
    opacity: 0.7;
    background: #fafafa;
    border-color: #d9d9d9;

    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transform: none;
    }
  }

  &.has-discount {
    border-color: #ff4d4f;
  }
}

.discount-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 10;
}

.favorite-button {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
}

.image-container {
  position: relative;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
  margin-bottom: 12px;

  .image-loading,
  .image-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #999;

    .loading-icon,
    .error-icon {
      font-size: 32px;
      margin-bottom: 8px;
    }
  }

  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .stock-status {
    position: absolute;
    bottom: 8px;
    right: 8px;
  }
}

.product-info {
  margin-bottom: 16px;

  .product-name {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    margin: 0 0 8px 0;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      color: #1890ff;
    }
  }

  .product-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 12px;

    .tag {
      max-width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .more-tags {
      font-size: 12px;
      color: #999;
      align-self: center;
      margin-left: 4px;
    }
  }

  .price-section {
    margin-bottom: 8px;

    .current-price {
      display: flex;
      align-items: baseline;
      gap: 8px;

      .price {
        font-size: 24px;
        font-weight: 700;
        color: #ff4d4f;
      }

      .saved-amount {
        font-size: 12px;
        color: #999;
        background: #fff2f0;
        padding: 2px 6px;
        border-radius: 4px;
      }
    }

    .original-price {
      font-size: 14px;
      color: #999;
      margin-top: 4px;
    }
  }

  .rating-section {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #666;

    .stars {
      display: flex;
      gap: 2px;

      .el-icon {
        font-size: 14px;

        &.full-star {
          color: #ffc107;
        }

        &.empty-star {
          color: #e8e8e8;
        }
      }
    }

    .stock-text {
      margin-left: auto;
      color: #999;
    }
  }
}

.action-buttons {
  border-top: 1px solid #f0f0f0;
  padding-top: 16px;

  .quantity-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 12px;

    .quantity {
      min-width: 36px;
      text-align: center;
      font-weight: 600;
    }
  }

  .add-to-cart-btn,
  .quick-buy-btn {
    width: 100%;
    margin-bottom: 8px;
  }

  .out-of-stock-message {
    text-align: center;
  }
}

.detail-content {
  display: flex;
  gap: 24px;

  .detail-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }

  .detail-info {
    flex: 1;

    h4 {
      margin: 0 0 16px 0;
      color: rgba(0, 0, 0, 0.85);
    }

    p {
      margin: 8px 0;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

// 响应式设计
@media (max-width: 768px) {
  .product-card {
    width: 100%;
    max-width: 340px;
    margin: 0 auto;
  }

  .detail-content {
    flex-direction: column;

    .detail-image {
      width: 100%;
      height: auto;
      max-height: 300px;
    }
  }
}

// 暗色主题适配
@media (prefers-color-scheme: dark) {
  .product-card {
    background: #1f1f1f;
    border-color: #303030;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    }
  }

  .image-container {
    background: #141414;
  }

  .product-name {
    color: rgba(255, 255, 255, 0.85);
  }

  .rating-section {
    color: rgba(255, 255, 255, 0.65);
  }
}
</style>