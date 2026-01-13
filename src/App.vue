<!--
========================================
根组件 (App.vue)
========================================

这是 Vue 应用的根组件，是整个应用的入口

功能说明：
  1. 顶部导航栏 - 显示分类链接
  2. 路由视图 - 根据 URL 显示对应页面
  3. 底部 Dock - 快捷操作栏
  4. 主题切换 - 深色/浅色模式
  5. Toast 提示 - 消息通知

使用的 Vue 特性：
  - router-link: Vue Router 导航组件
  - router-view: 路由视图出口
  - :data-theme: 动态绑定主题属性
  - v-for: 循环渲染导航项
  - $route: 访问当前路由信息
  - mounted: 生命周期钩子
  - localStorage: 持久化主题设置
-->

<template>
  <!-- 
    根元素
    :data-theme 绑定主题，CSS 通过 [data-theme] 选择器切换样式
  -->
  <div id="app" :data-theme="theme">
    
    <!-- Toast 消息提示 -->
    <div id="toast" :class="toast.class">{{ toast.message }}</div>
    
    <!-- ==================== 顶部导航栏 ==================== -->
    <nav class="nav-header">
      <div class="nav-scroll">
        <!-- 
          router-link: Vue Router 的声明式导航组件
          to: 目标路由路径
          :class: 动态绑定 active 类，高亮当前页面
          $route.path: 当前路由路径
        -->
        <router-link to="/" class="nav-item" :class="{ active: $route.path === '/' }">
          🏠 首页
        </router-link>
        
        <!-- 
          v-for 循环渲染分类导航
          :key 唯一标识符（Vue 要求）
          :to 动态路由，使用模板字符串拼接
        -->
        <router-link 
          v-for="cat in categories" 
          :key="cat.id"
          :to="`/category/${cat.id}`"
          class="nav-item"
          :class="{ active: $route.params.id == cat.id }"
        >
          {{ cat.title }}
        </router-link>
        
        <router-link to="/about" class="nav-item" :class="{ active: $route.path === '/about' }">
          📖 关于
        </router-link>
        <router-link to="/settings" class="nav-item" :class="{ active: $route.path === '/settings' }">
          ⚙️ 设置
        </router-link>
      </div>
    </nav>

    <!-- ==================== 路由视图（页面内容） ==================== -->
    <!-- 
      router-view: Vue Router 的视图出口
      根据当前 URL 自动渲染对应的组件
      
      :categories 传递数据给子组件 (props)
      :theme 传递主题给子组件
      @show-toast 监听子组件事件
    -->
    <router-view :categories="categories" :theme="theme" @show-toast="showToast" />

    <!-- ==================== 底部 Dock 工具栏 ==================== -->
    <div class="dock">
      <router-link to="/" class="dock-item" title="首页">🏠</router-link>
      
      <!-- @click 点击事件，切换主题 -->
      <div class="dock-item" @click="toggleTheme" title="切换主题">
        {{ theme === 'dark' ? '🌙' : '☀️' }}
      </div>
      
      <router-link to="/about" class="dock-item" title="关于">📖</router-link>
      <router-link to="/settings" class="dock-item" title="设置">⚙️</router-link>
      
      <!-- 普通 a 标签，跳转外部链接 -->
      <a class="dock-item" href="https://github.com/xdmc720/zuoye" target="_blank" title="GitHub">📦</a>
    </div>
  </div>
</template>

<script>
/**
 * ========================================
 * Vue 根组件
 * ========================================
 * 
 * 这是整个应用的入口组件
 * 所有页面都在这个组件内渲染
 */

// 从数据文件导入导航数据
import { navData } from './data/links.js'

export default {
  name: 'App',
  
  /**
   * data() - 组件响应式数据
   * 
   * Vue 会追踪这些数据的变化
   * 当数据改变时，视图会自动更新
   */
  data() {
    return {
      categories: navData,    // 导航分类数据（从外部文件导入）
      theme: 'dark',          // 当前主题: 'dark' 或 'light'
      toast: {                // Toast 消息状态
        message: '',          // 消息内容
        class: ''             // CSS 类名
      }
    }
  },
  
  /**
   * mounted() - 生命周期钩子
   * 
   * 组件挂载完成后执行
   * 此时 DOM 已经渲染完成
   */
  mounted() {
    // 从 localStorage 读取保存的主题设置
    const saved = localStorage.getItem('nav_theme')
    if (saved) {
      this.theme = saved
    } 
    // 如果没有保存，检测系统偏好
    else if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
      this.theme = 'light'
    }
  },
  
  /**
   * methods - 组件方法
   */
  methods: {
    /**
     * 切换主题
     * 在深色和浅色模式之间切换
     */
    toggleTheme() {
      // 三元表达式切换主题
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      
      // 保存到 localStorage，持久化设置
      localStorage.setItem('nav_theme', this.theme)
      
      // 显示切换提示
      this.showToast(
        this.theme === 'light' ? '☀️ 已切换到浅色模式' : '🌙 已切换到深色模式'
      )
    },
    
    /**
     * 显示 Toast 消息
     * 
     * @param {string} message - 消息内容
     * @param {string} type - 消息类型: 'info' | 'success' | 'error'
     */
    showToast(message, type = 'info') {
      // 设置消息和样式类
      this.toast = {
        message,
        class: 'show' + (type === 'error' ? ' error' : type === 'success' ? ' success' : '')
      }
      
      // 3秒后自动隐藏
      setTimeout(() => {
        this.toast.class = ''
        // 动画结束后清空消息
        setTimeout(() => this.toast = { message: '', class: '' }, 300)
      }, 3000)
    }
  }
}
</script>
