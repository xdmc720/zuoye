<!--
========================================
设置页组件 (SettingsView.vue)
========================================

功能说明：
  1. 主题切换（深色/浅色模式）
  2. 显示网站统计信息
  3. 显示项目版本信息

使用的 Vue 特性：
  - props: 接收父组件数据
  - computed: 计算统计数据
  - $emit: 子组件向父组件发送事件
  - $parent: 访问父组件（直接修改主题）
  - localStorage: 持久化主题设置
-->

<template>
  <div class="page-container settings-page">
    <div class="settings-card">
      <h1>⚙️ 设置</h1>
      
      <!-- ==================== 外观设置 ==================== -->
      <div class="setting-group">
        <h2>🎨 外观设置</h2>
        
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">主题模式</span>
            <span class="setting-desc">选择你喜欢的界面风格</span>
          </div>
          
          <!-- 
            主题切换按钮
            :class 动态绑定 active 类
            @click 点击切换主题
          -->
          <div class="theme-options">
            <button 
              class="theme-btn" 
              :class="{ active: theme === 'dark' }"
              @click="setTheme('dark')"
            >
              🌙 深色
            </button>
            <button 
              class="theme-btn" 
              :class="{ active: theme === 'light' }"
              @click="setTheme('light')"
            >
              ☀️ 浅色
            </button>
          </div>
        </div>
      </div>

      <!-- ==================== 统计信息 ==================== -->
      <div class="setting-group">
        <h2>📊 统计信息</h2>
        
        <!-- 使用计算属性动态显示统计数据 -->
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-value">{{ totalCategories }}</span>
            <span class="stat-label">分类数量</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ totalLinks }}</span>
            <span class="stat-label">链接数量</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">4</span>
            <span class="stat-label">页面数量</span>
          </div>
        </div>
      </div>

      <!-- ==================== 项目信息 ==================== -->
      <div class="setting-group">
        <h2>ℹ️ 项目信息</h2>
        
        <div class="info-list">
          <div class="info-item">
            <span class="info-label">版本</span>
            <span class="info-value">1.0.0</span>
          </div>
          <div class="info-item">
            <span class="info-label">框架</span>
            <span class="info-value">Vue 3 + Vite</span>
          </div>
          <div class="info-item">
            <span class="info-label">托管</span>
            <span class="info-value">Cloudflare Pages</span>
          </div>
        </div>
      </div>

      <!-- ==================== 操作按钮 ==================== -->
      <div class="action-buttons">
        <!-- router-link: 声明式路由导航 -->
        <router-link to="/" class="action-btn primary">🏠 返回首页</router-link>
        <!-- 普通链接：打开新窗口 -->
        <a href="https://github.com/xdmc720/zuoye" target="_blank" class="action-btn">📦 查看源码</a>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 设置页视图组件
 * 
 * 演示 Vue 组件通信：
 * 1. props 接收父组件数据
 * 2. $emit 向父组件发送事件
 * 3. $parent 直接访问父组件
 */
export default {
  name: 'SettingsView',
  
  /**
   * 接收的 props
   * categories: 分类数据（用于统计）
   * theme: 当前主题
   */
  props: ['categories', 'theme'],
  
  /**
   * 声明组件可发出的事件
   * show-toast: 显示提示消息
   * update-theme: 更新主题
   */
  emits: ['show-toast', 'update-theme'],
  
  /**
   * 计算属性 - 自动追踪依赖，响应式更新
   */
  computed: {
    /**
     * 计算分类总数
     */
    totalCategories() {
      return this.categories?.length || 0
    },
    
    /**
     * 计算链接总数
     * 遍历所有分类，累加每个分类的链接数
     */
    totalLinks() {
      let count = 0
      this.categories?.forEach(cat => {
        count += cat.items?.length || 0
      })
      return count
    }
  },
  
  methods: {
    /**
     * 设置主题
     * 
     * 演示组件通信方式：
     * 1. this.$emit 发送事件给父组件更新主题
     * 2. localStorage 持久化到浏览器
     * 
     * @param {string} newTheme - 'dark' 或 'light'
     */
    setTheme(newTheme) {
      // 通过事件通知父组件更新主题
      this.$emit('update-theme', newTheme)
      
      // 保存到浏览器本地存储，下次访问时保持设置
      localStorage.setItem('nav_theme', newTheme)
      
      // 向父组件发送事件，显示 Toast 提示
      this.$emit('show-toast', 
        newTheme === 'light' ? '☀️ 已切换到浅色模式' : '🌙 已切换到深色模式'
      )
    }
  }
}
</script>

<style scoped>
/* 页面布局 */
.settings-page {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

/* 设置卡片 - 毛玻璃效果 */
.settings-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  backdrop-filter: blur(10px);
}

.settings-card h1 {
  color: var(--text-main);
  margin: 0 0 30px;
  font-size: 28px;
  text-align: center;
}

/* 设置分组 */
.setting-group {
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--glass-border);
}

.setting-group:last-of-type {
  border-bottom: none;
}

.setting-group h2 {
  color: var(--text-main);
  font-size: 16px;
  margin: 0 0 16px;
}

/* 设置项 - Flexbox 两端对齐 */
.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.setting-info {
  display: flex;
  flex-direction: column;
}

.setting-label {
  color: var(--text-main);
  font-weight: 500;
}

.setting-desc {
  color: var(--text-sub);
  font-size: 12px;
  margin-top: 4px;
}

/* 主题切换按钮 */
.theme-options {
  display: flex;
  gap: 8px;
}

.theme-btn {
  padding: 8px 16px;
  border: 1px solid var(--glass-border);
  background: transparent;
  color: var(--text-main);
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
  transition: 0.2s;
}

.theme-btn:hover {
  background: rgba(255,255,255,0.1);
}

/* 激活状态的按钮 */
.theme-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

/* 统计网格 - CSS Grid 三列 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-item {
  text-align: center;
  padding: 16px;
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
}

.stat-value {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: var(--accent);
}

.stat-label {
  color: var(--text-sub);
  font-size: 12px;
}

/* 信息列表 */
.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(255,255,255,0.05);
  border-radius: 10px;
}

.info-label {
  color: var(--text-sub);
}

.info-value {
  color: var(--text-main);
  font-weight: 500;
}

/* 操作按钮区 */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 30px;
}

.action-btn {
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: 0.2s;
  background: rgba(255,255,255,0.1);
  color: var(--text-main);
  border: 1px solid var(--glass-border);
}

.action-btn:hover {
  transform: translateY(-2px);
}

/* 主要按钮样式 */
.action-btn.primary {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}
</style>
