<!--
========================================
分类详情页组件 (CategoryView.vue)
========================================

功能说明：
  1. 显示单个分类下的所有链接
  2. 通过路由参数获取分类ID
  3. 提供返回首页按钮

使用的 Vue 特性：
  - $route.params: 获取路由动态参数
  - computed: 根据路由参数计算当前分类
  - router-link: 声明式路由导航
  - scoped style: 组件作用域样式
-->

<template>
  <div class="page-container">
    
    <!-- ==================== 页面头部 ==================== -->
    <div class="page-header">
      <!-- router-link: Vue Router 的导航组件，点击跳转到首页 -->
      <router-link to="/" class="back-btn">← 返回首页</router-link>
      
      <!-- 显示分类标题 -->
      <h1>{{ category?.title || '分类详情' }}</h1>
      
      <!-- 显示链接数量 -->
      <p class="subtitle">包含 {{ category?.items?.length || 0 }} 个链接</p>
    </div>

    <!-- ==================== 链接卡片网格 ==================== -->
    <main class="grid">
      <!-- 有链接时显示卡片 -->
      <template v-if="category?.items?.length > 0">
        <div 
          v-for="item in category.items" 
          :key="item.id"
          class="card-wrap has-tooltip"
          :data-desc="item.desc || `${item.title}\n${item.url}`"
        >
          <a class="card" :href="item.url" target="_blank">
            <!-- 网站图标 -->
            <img 
              v-if="item.icon" 
              :src="item.icon" 
              class="card-icon" 
              @error="$event.target.style.display='none'; $event.target.nextElementSibling.style.display='flex'"
            >
            <div class="icon-fallback" :style="item.icon ? 'display:none' : 'display:flex'">
              {{ getInitial(item) }}
            </div>
            <span>{{ item.title }}</span>
          </a>
        </div>
      </template>
      
      <!-- 无链接时显示空状态 -->
      <div v-else class="empty-state">
        <div style="font-size:40px;margin-bottom:10px">🍃</div>
        <div>此分类下暂无链接</div>
      </div>
    </main>
  </div>
</template>

<script>
/**
 * 分类详情视图组件
 * 
 * 演示 Vue Router 动态路由参数的使用
 * 路由: /category/:id
 */
export default {
  name: 'CategoryView',
  
  // 接收父组件传递的分类数据
  props: ['categories'],
  
  /**
   * 计算属性
   */
  computed: {
    /**
     * 根据路由参数获取当前分类
     * 
     * this.$route.params.id 获取 URL 中的 :id 参数
     * 例如访问 /category/2，则 id = 2
     */
    category() {
      // 获取路由参数并转为数字
      const id = parseInt(this.$route.params.id)
      // 从分类列表中查找对应分类
      return this.categories?.find(c => c.id === id)
    }
  },
  
  methods: {
    /**
     * 获取网站名称首字母
     */
    getInitial(item) {
      return (item.title || 'N').charAt(0).toUpperCase()
    }
  }
}
</script>

<!--
scoped 属性说明：
样式只作用于当前组件，不会影响其他组件
这是 Vue 单文件组件的特性，实现样式隔离
-->
<style scoped>
/* 页面头部样式 */
.page-header {
  text-align: center;
  padding: 40px 20px 30px;
}

.page-header h1 {
  margin: 20px 0 10px;
  font-size: 28px;
  color: var(--text-main);
}

/* 副标题样式 */
.subtitle {
  color: var(--text-sub);
  font-size: 14px;
}

/* 返回按钮样式 */
.back-btn {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(255,255,255,0.1);
  border-radius: 20px;
  color: var(--text-main);
  text-decoration: none;
  font-size: 14px;
  transition: 0.2s;
}

.back-btn:hover {
  background: var(--accent);
}
</style>
