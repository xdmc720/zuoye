<!--
========================================
关于页组件 (AboutView.vue)
========================================

功能说明：
  1. 展示项目介绍信息
  2. 列出主要功能特点
  3. 显示技术栈标签

使用的 Vue 特性：
  - 单文件组件结构 (template/script/style)
  - scoped 样式隔离
  - CSS 变量 (var) 实现主题适配

这是一个纯展示组件，无复杂逻辑
-->

<template>
  <div class="page-container about-page">
    
    <!-- ==================== 关于卡片 ==================== -->
    <div class="about-card">
      
      <!-- 顶部图标和标题 -->
      <div class="about-icon">🚀</div>
      <h1>关于本站</h1>
      
      <!-- 项目描述 -->
      <p class="about-desc">
        这是一个基于 <strong>Vue 3</strong> 构建的个人导航站，
        旨在提供快速、便捷的网站收藏和访问体验。
      </p>

      <!-- ==================== 功能特点列表 ==================== -->
      <div class="feature-list">
        <div class="feature-item">
          <span class="feature-icon">⚡</span>
          <div>
            <h3>快速访问</h3>
            <p>一键直达常用网站</p>
          </div>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🎨</span>
          <div>
            <h3>主题切换</h3>
            <p>支持深色/浅色模式</p>
          </div>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🔍</span>
          <div>
            <h3>多搜索引擎</h3>
            <p>Google、百度、Bing 一键搜索</p>
          </div>
        </div>
        <div class="feature-item">
          <span class="feature-icon">📱</span>
          <div>
            <h3>响应式设计</h3>
            <p>完美适配移动端</p>
          </div>
        </div>
      </div>

      <!-- ==================== 技术栈展示 ==================== -->
      <div class="tech-stack">
        <h2>技术栈</h2>
        <div class="tech-tags">
          <span class="tech-tag">Vue 3</span>
          <span class="tech-tag">Vite</span>
          <span class="tech-tag">Vue Router</span>
          <span class="tech-tag">CSS3</span>
          <span class="tech-tag">Cloudflare Pages</span>
        </div>
      </div>

      <!-- 页脚信息 -->
      <div class="footer-info">
        <p>© 2026 Vue Navigation Site</p>
        <p>Deployed on Cloudflare Pages</p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 关于页视图组件
 * 
 * 这是一个静态展示组件，主要用于：
 * - 介绍项目功能
 * - 展示技术栈
 * - 提供版权信息
 */
export default {
  name: 'AboutView'
  // 此组件无 props、data、methods
  // 是一个纯展示型组件
}
</script>

<!--
scoped 样式说明：
样式只作用于当前组件内的元素
Vue 会自动为元素添加唯一属性来实现隔离
-->
<style scoped>
/* 页面布局 - 居中显示 */
.about-page {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

/* 
 * 主卡片样式
 * 使用 CSS 变量实现主题适配
 * var(--glass-bg) 在深色/浅色模式下有不同值
 */
.about-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  padding: 40px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  backdrop-filter: blur(10px); /* 毛玻璃效果 */
}

/* 顶部大图标 */
.about-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

/* 标题样式 */
.about-card h1 {
  color: var(--text-main);
  margin: 0 0 16px;
  font-size: 32px;
}

/* 描述文字 */
.about-desc {
  color: var(--text-sub);
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 40px;
}

.about-desc strong {
  color: var(--accent); /* 强调色高亮 */
}

/* 
 * 功能列表 - 使用 CSS Grid
 * 两列布局，间距 20px
 */
.feature-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

/* 响应式：小屏幕时变为单列 */
@media (max-width: 500px) {
  .feature-list {
    grid-template-columns: 1fr;
  }
}

/* 单个功能项 */
.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  text-align: left;
  padding: 16px;
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
}

.feature-icon {
  font-size: 24px;
}

.feature-item h3 {
  color: var(--text-main);
  margin: 0 0 4px;
  font-size: 15px;
}

.feature-item p {
  color: var(--text-sub);
  margin: 0;
  font-size: 13px;
}

/* 技术栈区域 */
.tech-stack {
  margin-bottom: 30px;
}

.tech-stack h2 {
  color: var(--text-main);
  font-size: 18px;
  margin-bottom: 16px;
}

/* 技术标签容器 - Flexbox 自动换行 */
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

/* 单个技术标签 */
.tech-tag {
  padding: 6px 14px;
  background: var(--accent);
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

/* 页脚信息 */
.footer-info {
  color: var(--text-sub);
  font-size: 12px;
  opacity: 0.6;
}

.footer-info p {
  margin: 4px 0;
}
</style>
