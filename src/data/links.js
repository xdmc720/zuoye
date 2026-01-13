/**
 * ========================================
 * 导航数据配置文件
 * ========================================
 * 
 * 作用：存储所有导航链接数据
 * 
 * 数据结构：
 * - categories: 分类数组
 *   - id: 分类ID
 *   - title: 分类标题
 *   - items: 链接数组
 *     - id: 链接ID
 *     - title: 链接名称
 *     - url: 链接地址
 *     - icon: 图标URL（可选）
 *     - desc: 描述文字
 */

export const navData = [
    {
        id: 1,
        title: '🔧 常用工具',
        items: [
            { id: 1, title: 'Google', url: 'https://www.google.com', icon: 'https://www.google.com/favicon.ico', desc: '全球最大搜索引擎' },
            { id: 2, title: 'GitHub', url: 'https://github.com', icon: 'https://github.githubassets.com/favicons/favicon.svg', desc: '代码托管平台' },
            { id: 3, title: 'ChatGPT', url: 'https://chat.openai.com', icon: 'https://chat.openai.com/favicon.ico', desc: 'AI 对话助手' },
            { id: 4, title: 'Notion', url: 'https://notion.so', icon: 'https://www.notion.so/images/favicon.ico', desc: '笔记和协作工具' },
            { id: 5, title: 'Figma', url: 'https://figma.com', icon: 'https://static.figma.com/app/icon/1/favicon.png', desc: '设计协作平台' }
        ]
    },
    {
        id: 2,
        title: '📚 学习资源',
        items: [
            { id: 6, title: 'Vue.js', url: 'https://vuejs.org', icon: 'https://vuejs.org/logo.svg', desc: 'Vue 官方文档' },
            { id: 7, title: 'MDN', url: 'https://developer.mozilla.org', icon: 'https://developer.mozilla.org/favicon-48x48.png', desc: 'Web 开发文档' },
            { id: 8, title: 'W3Schools', url: 'https://www.w3schools.com', icon: 'https://www.w3schools.com/favicon.ico', desc: 'Web 教程网站' },
            { id: 9, title: '菜鸟教程', url: 'https://www.runoob.com', icon: 'https://www.runoob.com/favicon.ico', desc: '中文编程教程' },
            { id: 10, title: 'LeetCode', url: 'https://leetcode.cn', icon: 'https://leetcode.cn/favicon.ico', desc: '算法练习平台' }
        ]
    },
    {
        id: 3,
        title: '🎬 影音娱乐',
        items: [
            { id: 11, title: 'YouTube', url: 'https://youtube.com', icon: 'https://www.youtube.com/s/desktop/favicon.ico', desc: '视频分享平台' },
            { id: 12, title: 'Bilibili', url: 'https://bilibili.com', icon: 'https://www.bilibili.com/favicon.ico', desc: '国内视频网站' },
            { id: 13, title: 'Spotify', url: 'https://spotify.com', icon: 'https://open.spotifycdn.com/cdn/images/favicon.0f31d2ea.ico', desc: '音乐流媒体' },
            { id: 14, title: 'Netflix', url: 'https://netflix.com', icon: 'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico', desc: '流媒体影视' }
        ]
    },
    {
        id: 4,
        title: '🛠️ 开发者工具',
        items: [
            { id: 15, title: 'Stack Overflow', url: 'https://stackoverflow.com', icon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico', desc: '程序员问答社区' },
            { id: 16, title: 'CodePen', url: 'https://codepen.io', icon: 'https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico', desc: '前端代码演示' },
            { id: 17, title: 'VS Code', url: 'https://code.visualstudio.com', icon: 'https://code.visualstudio.com/favicon.ico', desc: '编辑器下载' },
            { id: 18, title: 'NPM', url: 'https://npmjs.com', icon: 'https://static-production.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png', desc: 'Node 包管理' },
            { id: 19, title: 'Cloudflare', url: 'https://cloudflare.com', icon: 'https://www.cloudflare.com/favicon.ico', desc: 'CDN 和云服务' }
        ]
    }
]
