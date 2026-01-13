<!--
========================================
首页组件 (HomeView.vue)
========================================

功能说明：
  1. 多搜索引擎切换（Google、百度、Bing、GitHub、站内搜索）
  2. 显示所有导航链接卡片
  3. 站内搜索实时过滤功能
  4. 链接图标显示（失败时显示首字母）

使用的 Vue 特性：
  - v-for: 循环渲染搜索引擎和链接卡片
  - v-model: 双向绑定搜索输入
  - v-if/v-else: 条件渲染
  - computed: 计算属性（过滤链接）
  - @click/@keydown: 事件绑定
  - :class: 动态绑定 CSS 类
  - props: 父组件传递数据
-->

<template>
  <div class="page-container">
    
    <!-- ==================== 搜索区域 ==================== -->
    <div class="search-wrap">
      
      <!-- 搜索引擎切换按钮 -->
      <div class="search-engines">
        <!-- 
          v-for 循环渲染每个搜索引擎按钮
          :class 绑定动态类名，当前选中的引擎添加 active 类
          @click 点击切换当前搜索引擎
        -->
        <div 
          v-for="engine in engines" 
          :key="engine.type"
          class="engine" 
          :class="{ active: currentEngine === engine.type }"
          @click="setEngine(engine.type)"
        >
          {{ engine.label }}
        </div>
      </div>
      
      <!-- 搜索输入框 -->
      <div class="search-input-box">
        <!-- 
          v-model 双向绑定搜索关键词
          :placeholder 动态显示当前引擎的提示文字
          @keydown.enter 按回车执行搜索
        -->
        <input 
          class="search-input" 
          v-model="searchQuery"
          :placeholder="currentPlaceholder"
          @keydown.enter="doSearch"
          @input="onSearchInput"
        >
        <button class="search-btn" @click="doSearch" title="搜索">🔍</button>
      </div>
    </div>

    <!-- ==================== 链接卡片网格 ==================== -->
    <main class="grid">
      <!-- 有数据时显示卡片 -->
      <template v-if="filteredItems.length > 0">
        <!-- 
          v-for 循环渲染每个链接卡片
          :data-desc 用于 CSS tooltip 显示描述
        -->
        <div 
          v-for="item in filteredItems" 
          :key="item.id"
          class="card-wrap has-tooltip"
          :data-desc="item.desc || `${item.title}\n${item.url}`"
        >
          <a class="card" :href="item.url" target="_blank">
            <!-- 网站图标：加载失败时隐藏，显示备用字母 -->
            <img 
              v-if="item.icon" 
              :src="item.icon" 
              class="card-icon" 
              @error="$event.target.style.display='none'; $event.target.nextElementSibling.style.display='flex'"
            >
            <!-- 备用图标：显示网站名称首字母 -->
            <div class="icon-fallback" :style="item.icon ? 'display:none' : 'display:flex'">
              {{ getInitial(item) }}
            </div>
            <span>{{ item.title }}</span>
          </a>
        </div>
      </template>
      
      <!-- 无数据时显示空状态 -->
      <div v-else class="empty-state">
        <div style="font-size:40px;margin-bottom:10px">🍃</div>
        <div>{{ searchQuery ? '未找到匹配结果' : '暂无链接' }}</div>
      </div>
    </main>
  </div>
</template>

<script>
/**
 * 首页视图组件
 * 
 * 主要功能：
 * 1. 多搜索引擎支持
 * 2. 链接卡片展示
 * 3. 站内搜索过滤
 */
export default {
  name: 'HomeView',
  
  // 接收父组件传递的分类数据
  props: ['categories'],
  
  /**
   * 组件数据
   */
  data() {
    return {
      searchQuery: '',        // 搜索关键词
      currentEngine: 'google', // 当前选中的搜索引擎
      
      // 搜索引擎配置列表
      engines: [
        { type: 'google', label: 'Google', url: 'https://www.google.com/search?q=', placeholder: 'Google 搜索...' },
        { type: 'baidu', label: '百度', url: 'https://www.baidu.com/s?wd=', placeholder: '百度一下...' },
        { type: 'bing', label: 'Bing', url: 'https://cn.bing.com/search?q=', placeholder: '微软 Bing...' },
        { type: 'github', label: 'GitHub', url: 'https://github.com/search?q=', placeholder: 'Search GitHub...' },
        { type: 'site', label: '🔍 站内', url: '', placeholder: '输入关键词筛选本站链接...' }
      ]
    }
  },
  
  /**
   * 计算属性
   * Vue 会自动追踪依赖，当依赖变化时自动重新计算
   */
  computed: {
    /**
     * 获取所有链接（扁平化处理）
     * 将分类嵌套结构转换为一维数组
     */
    allItems() {
      const items = []
      this.categories?.forEach(cat => {
        cat.items?.forEach(item => items.push(item))
      })
      return items
    },
    
    /**
     * 过滤后的链接列表
     * 站内搜索时根据关键词过滤
     */
    filteredItems() {
      // 非站内搜索或无关键词时返回全部
      if (this.currentEngine !== 'site' || !this.searchQuery.trim()) {
        return this.allItems
      }
      // 站内搜索：匹配标题或URL
      const query = this.searchQuery.toLowerCase()
      return this.allItems.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.url.toLowerCase().includes(query)
      )
    },
    
    /**
     * 当前搜索引擎的占位符文字
     */
    currentPlaceholder() {
      return this.engines.find(e => e.type === this.currentEngine)?.placeholder || 'Search...'
    }
  },
  
  /**
   * 组件方法
   */
  methods: {
    /**
     * 切换搜索引擎
     * @param {string} type - 引擎类型
     */
    setEngine(type) {
      this.currentEngine = type
      this.searchQuery = ''  // 切换时清空搜索框
    },
    
    /**
     * 执行搜索
     * 打开新窗口跳转到对应搜索引擎
     */
    doSearch() {
      // 空关键词或站内搜索时不执行
      if (!this.searchQuery.trim() || this.currentEngine === 'site') return
      
      const engine = this.engines.find(e => e.type === this.currentEngine)
      // 使用 encodeURIComponent 编码关键词，防止特殊字符问题
      window.open(engine.url + encodeURIComponent(this.searchQuery))
      this.searchQuery = ''  // 搜索后清空
    },
    
    /**
     * 搜索输入事件（用于站内实时过滤）
     */
    onSearchInput() {
      // 站内搜索通过 computed 自动过滤，此处预留扩展
    },
    
    /**
     * 获取网站名称首字母（用于图标备用显示）
     * @param {Object} item - 链接对象
     * @returns {string} 首字母大写
     */
    getInitial(item) {
      return (item.title || 'N').charAt(0).toUpperCase()
    }
  }
}
</script>
