/**
 * ========================================
 * 应用入口文件 (main.js)
 * ========================================
 * 
 * 作用：初始化 Vue 应用
 * 
 * 这是整个应用的起点，负责：
 * 1. 创建 Vue 应用实例
 * 2. 注册路由插件
 * 3. 挂载到页面 DOM
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // 导入路由配置
import './assets/main.css'     // 导入全局样式

// 创建应用实例
const app = createApp(App)

// 注册路由插件
app.use(router)

// 挂载到 #app 元素
app.mount('#app')
