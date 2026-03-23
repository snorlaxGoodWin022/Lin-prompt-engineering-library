<!--
  ProductCard 组件使用示例
  展示如何在不同场景下使用 ProductCard 组件
-->

<template>
  <div class="usage-examples">
    <h2>ProductCard 组件使用示例</h2>
    <p class="subtitle">展示不同场景下的组件使用方式</p>

    <!-- 示例 1：基本使用 -->
    <section class="example-section">
      <h3>1. 基本使用</h3>
      <div class="example-description">
        最简单的使用方式，只提供必需属性。
      </div>
      <div class="example-content">
        <ProductCard
          product-id="p001"
          product-name="高性能笔记本电脑"
          image-url="https://example.com/laptop.jpg"
          :price="6999.00"
          :stock="50"
          :is-in-stock="true"
          :tags="['笔记本', '高性能', '轻薄']"
          :rating="4.5"
        />
      </div>
      <div class="code-snippet">
        <pre><code>{{ example1Code }}</code></pre>
      </div>
    </section>

    <!-- 示例 2：带折扣的商品 -->
    <section class="example-section">
      <h3>2. 带折扣的商品</h3>
      <div class="example-description">
        显示原价和折扣信息。
      </div>
      <div class="example-content">
        <ProductCard
          product-id="p002"
          product-name="无线蓝牙耳机"
          image-url="https://example.com/headphone.jpg"
          :price="299.00"
          :original-price="499.00"
          :stock="20"
          :is-in-stock="true"
          :tags="['无线', '蓝牙', '降噪']"
          :rating="4.8"
        />
      </div>
      <div class="code-snippet">
        <pre><code>{{ example2Code }}</code></pre>
      </div>
    </section>

    <!-- 示例 3：库存紧张的商品 -->
    <section class="example-section">
      <h3>3. 库存紧张的商品</h3>
      <div class="example-description">
        库存少于10件，显示库存紧张状态。
      </div>
      <div class="example-content">
        <ProductCard
          product-id="p003"
          product-name="限量版运动鞋"
          image-url="https://example.com/shoes.jpg"
          :price="1299.00"
          :stock="3"
          :is-in-stock="true"
          :tags="['运动鞋', '限量', '潮牌']"
          :rating="4.9"
        />
      </div>
      <div class="code-snippet">
        <pre><code>{{ example3Code }}</code></pre>
      </div>
    </section>

    <!-- 示例 4：缺货商品 -->
    <section class="example-section">
      <h3>4. 缺货商品</h3>
      <div class="example-description">
        库存为0，显示缺货状态，操作按钮不可用。
      </div>
      <div class="example-content">
        <ProductCard
          product-id="p004"
          product-name="热门书籍"
          image-url="https://example.com/book.jpg"
          :price="59.00"
          :stock="0"
          :is-in-stock="false"
          :tags="['书籍', '畅销', '教育']"
          :rating="4.7"
        />
      </div>
      <div class="code-snippet">
        <pre><code>{{ example4Code }}</code></pre>
      </div>
    </section>

    <!-- 示例 5：隐藏操作按钮 -->
    <section class="example-section">
      <h3>5. 隐藏操作按钮</h3>
      <div class="example-description">
        在列表页或搜索结果页，可能只需要展示信息，不需要操作按钮。
      </div>
      <div class="example-content">
        <ProductCard
          product-id="p005"
          product-name="智能手表"
          image-url="https://example.com/watch.jpg"
          :price="1999.00"
          :stock="15"
          :is-in-stock="true"
          :show-actions="false"
          :tags="['智能手表', '健康监测', '运动']"
          :rating="4.6"
        />
      </div>
      <div class="code-snippet">
        <pre><code>{{ example5Code }}</code></pre>
      </div>
    </section>

    <!-- 示例 6：事件处理 -->
    <section class="example-section">
      <h3>6. 事件处理示例</h3>
      <div class="example-description">
        监听组件事件，处理用户交互。
      </div>
      <div class="example-content">
        <ProductCard
          product-id="p006"
          product-name="咖啡机"
          image-url="https://example.com/coffee.jpg"
          :price="899.00"
          :stock="8"
          :is-in-stock="true"
          :tags="['咖啡机', '家用', '自动']"
          :rating="4.4"
          :is-favorite="isFavorite"
          @add-to-cart="handleAddToCart"
          @view-detail="handleViewDetail"
          @toggle-favorite="handleToggleFavorite"
          @quick-buy="handleQuickBuy"
        />
      </div>
      <div class="code-snippet">
        <pre><code>{{ example6Code }}</code></pre>
      </div>
    </section>

    <!-- 示例 7：动态数据 -->
    <section class="example-section">
      <h3>7. 动态数据绑定</h3>
      <div class="example-description">
        从API获取数据，动态更新组件状态。
      </div>
      <div class="example-content">
        <ProductCard
          v-if="dynamicProduct"
          :product-id="dynamicProduct.id"
          :product-name="dynamicProduct.name"
          :image-url="dynamicProduct.image"
          :price="dynamicProduct.price"
          :original-price="dynamicProduct.originalPrice"
          :stock="dynamicProduct.stock"
          :is-in-stock="dynamicProduct.stock > 0"
          :tags="dynamicProduct.tags"
          :rating="dynamicProduct.rating"
          @add-to-cart="handleDynamicAddToCart"
        />
        <div v-else class="loading-state">
          <el-icon class="loading-icon"><Loading /></el-icon>
          加载中...
        </div>
      </div>
      <div class="code-snippet">
        <pre><code>{{ example7Code }}</code></pre>
      </div>
    </section>

    <!-- 事件处理状态 -->
    <div class="event-status">
      <h3>事件处理状态</h3>
      <el-table :data="eventLogs" style="width: 100%" height="200">
        <el-table-column prop="time" label="时间" width="180" />
        <el-table-column prop="event" label="事件" width="120" />
        <el-table-column prop="productId" label="产品ID" width="100" />
        <el-table-column prop="details" label="详情" />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Loading } from '@element-plus/icons-vue';
import ProductCard from '../ProductCard/product-card.vue';
import type { ProductCardProps } from '../ProductCard/types';

// ==================== 示例代码 ====================
const example1Code = `<template>
  <ProductCard
    product-id="p001"
    product-name="高性能笔记本电脑"
    image-url="https://example.com/laptop.jpg"
    :price="6999.00"
    :stock="50"
    :is-in-stock="true"
    :tags="['笔记本', '高性能', '轻薄']"
    :rating="4.5"
  />
</template>`;

const example2Code = `<template>
  <ProductCard
    product-id="p002"
    product-name="无线蓝牙耳机"
    image-url="https://example.com/headphone.jpg"
    :price="299.00"
    :original-price="499.00"
    :stock="20"
    :is-in-stock="true"
    :tags="['无线', '蓝牙', '降噪']"
    :rating="4.8"
  />
</template>`;

const example3Code = `<template>
  <ProductCard
    product-id="p003"
    product-name="限量版运动鞋"
    image-url="https://example.com/shoes.jpg"
    :price="1299.00"
    :stock="3"
    :is-in-stock="true"
    :tags="['运动鞋', '限量', '潮牌']"
    :rating="4.9"
  />
</template>`;

const example4Code = `<template>
  <ProductCard
    product-id="p004"
    product-name="热门书籍"
    image-url="https://example.com/book.jpg"
    :price="59.00"
    :stock="0"
    :is-in-stock="false"
    :tags="['书籍', '畅销', '教育']"
    :rating="4.7"
  />
</template>`;

const example5Code = `<template>
  <ProductCard
    product-id="p005"
    product-name="智能手表"
    image-url="https://example.com/watch.jpg"
    :price="1999.00"
    :stock="15"
    :is-in-stock="true"
    :show-actions="false"
    :tags="['智能手表', '健康监测', '运动']"
    :rating="4.6"
  />
</template>`;

const example6Code = `<template>
  <ProductCard
    product-id="p006"
    product-name="咖啡机"
    image-url="https://example.com/coffee.jpg"
    :price="899.00"
    :stock="8"
    :is-in-stock="true"
    :tags="['咖啡机', '家用', '自动']"
    :rating="4.4"
    :is-favorite="isFavorite"
    @add-to-cart="handleAddToCart"
    @view-detail="handleViewDetail"
    @toggle-favorite="handleToggleFavorite"
    @quick-buy="handleQuickBuy"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isFavorite = ref(false);

const handleAddToCart = (payload: { productId: string; quantity: number }) => {
  console.log('添加到购物车:', payload);
};

const handleViewDetail = (payload: { productId: string }) => {
  console.log('查看详情:', payload);
};

const handleToggleFavorite = (payload: { productId: string; isFavorite: boolean }) => {
  console.log('切换收藏:', payload);
  isFavorite.value = payload.isFavorite;
};

const handleQuickBuy = (payload: { productId: string }) => {
  console.log('立即购买:', payload);
};
<\/script>`;

const example7Code = `<template>
  <ProductCard
    v-if="dynamicProduct"
    :product-id="dynamicProduct.id"
    :product-name="dynamicProduct.name"
    :image-url="dynamicProduct.image"
    :price="dynamicProduct.price"
    :original-price="dynamicProduct.originalPrice"
    :stock="dynamicProduct.stock"
    :is-in-stock="dynamicProduct.stock > 0"
    :tags="dynamicProduct.tags"
    :rating="dynamicProduct.rating"
    @add-to-cart="handleDynamicAddToCart"
  />
  <div v-else class="loading-state">
    <el-icon class="loading-icon"><Loading /></el-icon>
    加载中...
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  stock: number;
  tags: string[];
  rating: number;
}

const dynamicProduct = ref<Product | null>(null);

onMounted(async () => {
  // 模拟API调用
  const response = await fetch('/api/product/featured');
  dynamicProduct.value = await response.json();
});

const handleDynamicAddToCart = (payload: { productId: string; quantity: number }) => {
  console.log('动态商品添加到购物车:', payload);
};
<\/script>`;

// ==================== 事件处理 ====================
interface EventLog {
  time: string;
  event: string;
  productId: string;
  details: string;
}

const isFavorite = ref(false);
const eventLogs = ref<EventLog[]>([]);
const dynamicProduct = ref<ProductCardProps | null>(null);

/**
 * 添加事件日志
 */
const addEventLog = (event: string, productId: string, details: string = '') => {
  const now = new Date();
  const time = now.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  eventLogs.value.unshift({
    time,
    event,
    productId,
    details,
  });

  // 最多保留10条日志
  if (eventLogs.value.length > 10) {
    eventLogs.value = eventLogs.value.slice(0, 10);
  }
};

/**
 * 处理添加到购物车事件
 */
const handleAddToCart = (payload: { productId: string; quantity: number }) => {
  addEventLog(
    'add-to-cart',
    payload.productId,
    `数量: ${payload.quantity}`
  );
  ElMessage.success(`商品 ${payload.productId} 已添加到购物车`);
};

/**
 * 处理查看详情事件
 */
const handleViewDetail = (payload: { productId: string }) => {
  addEventLog('view-detail', payload.productId);
  ElMessage.info(`查看商品 ${payload.productId} 详情`);
};

/**
 * 处理切换收藏事件
 */
const handleToggleFavorite = (payload: { productId: string; isFavorite: boolean }) => {
  isFavorite.value = payload.isFavorite;
  addEventLog(
    'toggle-favorite',
    payload.productId,
    `状态: ${payload.isFavorite ? '已收藏' : '取消收藏'}`
  );
  ElMessage.success(payload.isFavorite ? '已添加到收藏夹' : '已取消收藏');
};

/**
 * 处理立即购买事件
 */
const handleQuickBuy = (payload: { productId: string }) => {
  addEventLog('quick-buy', payload.productId);
  ElMessage.warning(`跳转到商品 ${payload.productId} 购买页面`);
};

/**
 * 处理动态商品添加到购物车
 */
const handleDynamicAddToCart = (payload: { productId: string; quantity: number }) => {
  addEventLog(
    'dynamic-add-to-cart',
    payload.productId,
    `动态商品, 数量: ${payload.quantity}`
  );
  ElMessage.success(`动态商品 ${payload.productId} 已添加到购物车`);
};

// ==================== 模拟动态数据 ====================
onMounted(() => {
  // 模拟API延迟
  setTimeout(() => {
    dynamicProduct.value = {
      productId: 'p007',
      productName: '4K显示器',
      imageUrl: 'https://example.com/monitor.jpg',
      price: 2499.00,
      originalPrice: 2999.00,
      stock: 12,
      isInStock: true,
      tags: ['显示器', '4K', '办公'],
      rating: 4.7,
      showActions: true,
      isFavorite: false,
    };
  }, 1500);
});
</script>

<style scoped lang="scss">
.usage-examples {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;

  h2 {
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 8px;
  }

  .subtitle {
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 32px;
  }
}

.example-section {
  margin-bottom: 40px;
  padding: 24px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background: #ffffff;

  h3 {
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
    font-size: 18px;
  }

  .example-description {
    color: rgba(0, 0, 0, 0.65);
    margin-bottom: 16px;
    font-size: 14px;
  }

  .example-content {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;

    :deep(.product-card) {
      margin: 0;
    }
  }

  .code-snippet {
    background: #f6f8fa;
    border-radius: 6px;
    padding: 16px;
    overflow-x: auto;

    pre {
      margin: 0;
      font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
      font-size: 13px;
      line-height: 1.6;
    }

    code {
      color: #24292e;
    }
  }
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: rgba(0, 0, 0, 0.45);

  .loading-icon {
    font-size: 32px;
    margin-bottom: 12px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}

.event-status {
  margin-top: 40px;
  padding: 24px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background: #ffffff;

  h3 {
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 16px;
    font-size: 18px;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .usage-examples {
    padding: 16px;
  }

  .example-section {
    padding: 16px;
  }

  .code-snippet {
    font-size: 12px;
  }
}

// 暗色主题适配
@media (prefers-color-scheme: dark) {
  .usage-examples {
    background: #141414;
  }

  .example-section,
  .event-status {
    background: #1f1f1f;
    border-color: #303030;

    h3 {
      color: rgba(255, 255, 255, 0.85);
    }

    .example-description {
      color: rgba(255, 255, 255, 0.65);
    }
  }

  .code-snippet {
    background: #2d2d2d;

    code {
      color: #e6e6e6;
    }
  }

  .loading-state {
    color: rgba(255, 255, 255, 0.45);
  }
}
</style>