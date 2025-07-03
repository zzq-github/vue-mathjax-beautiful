import { createRouter, createWebHistory } from 'vue-router'

// 获取base路径，用于GitHub Pages部署
const base = import.meta.env.VITE_BASE_URL || '/'

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      meta: { title: 'Vue MathJax Beautiful' }
    },
    {
      path: '/demo',
      name: 'Demo',
      component: () => import('../views/Demo.vue'),
      meta: { title: 'Demo - Vue MathJax Beautiful' }
    },
    {
      path: '/config',
      name: 'Config',
      component: () => import('../views/Config.vue'),
      meta: { title: 'Configuration - Vue MathJax Beautiful' }
    },
    {
      path: '/editor-config',
      name: 'EditorConfig',
      component: () => import('../views/EditorConfig.vue'),
      meta: { title: 'Editor Configuration - Vue MathJax Beautiful' }
    },
    {
      path: '/docs',
      name: 'Docs',
      component: () => import('../views/Docs.vue'),
      meta: { title: 'Documentation - Vue MathJax Beautiful' }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫：更新页面标题
router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router 