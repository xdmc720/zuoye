/**
 * ========================================
 * 路由配置文件 (Vue Router)
 * ========================================
 * 
 * 作用：定义 URL 路径与页面组件的映射关系
 * 
 * 当用户访问不同 URL 时，Vue Router 会自动
 * 切换显示对应的组件，无需刷新页面（SPA）
 */

import { createRouter, createWebHistory } from 'vue-router'

// 导入页面组件
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import AboutView from '../views/AboutView.vue'
import SettingsView from '../views/SettingsView.vue'

/**
 * 路由表配置
 * 
 * path: URL 路径
 * name: 路由名称（用于编程式导航）
 * component: 对应的 Vue 组件
 */
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        // 首页 - 显示所有导航链接
    },
    {
        path: '/category/:id',
        name: 'category',
        component: CategoryView,
        // 分类页 - :id 是动态参数，如 /category/1
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView,
        // 关于页 - 项目介绍
    },
    {
        path: '/settings',
        name: 'settings',
        component: SettingsView,
        // 设置页 - 主题切换等配置
    }
]

// 创建路由实例
const router = createRouter({
    // 使用 HTML5 History 模式（URL 不带 #）
    history: createWebHistory(),
    routes
})

export default router
