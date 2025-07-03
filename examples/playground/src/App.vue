<template>
  <div
    id="app"
    class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
  >
    <!-- 头部导航 -->
    <AppHeader
      :is-dark="isDark"
      :show-language-menu="showLanguageMenu"
      :show-mobile-menu="showMobileMenu"
      @toggle-theme="toggleTheme"
      @toggle-language-menu="toggleLanguageMenu"
      @toggle-mobile-menu="toggleMobileMenu"
      @close-mobile-menu="closeMobileMenu"
    />

    <!-- 路由视图 -->
    <router-view />

    <!-- 返回顶部按钮 -->
    <BackToTop
      :show-back-to-top="showBackToTop"
      :scroll-progress="scrollProgress"
    />

    <!-- 页脚 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from './composables/useI18n'

// 导入组件
import AppHeader from './components/AppHeader/index.vue'
import AppFooter from './components/AppFooter/index.vue'
import BackToTop from './components/BackToTop/index.vue'

// 国际化功能
const { t } = useI18n()

// 响应式数据
const showBackToTop = ref(false)
const scrollY = ref(0)
const isDark = ref(false)
const showMobileMenu = ref(false)
const showLanguageMenu = ref(false)

// 响应式文档高度和窗口高度
const windowHeight = ref(0)
const documentHeight = ref(0)

// 计算滚动进度
const scrollProgress = computed(() => {
  const maxScroll = documentHeight.value - windowHeight.value
  const progress = maxScroll > 0 ? (scrollY.value / maxScroll) * 125.6 : 0 // 125.6 是圆周长 (2 * π * 20)
  return `${progress} 125.6`
})

// 语言切换相关功能
function toggleLanguageMenu() {
  showLanguageMenu.value = !showLanguageMenu.value
}

// 更新尺寸信息
function updateDimensions() {
  windowHeight.value = window.innerHeight
  documentHeight.value = document.documentElement.scrollHeight
}

// 滚动事件处理
function handleScroll() {
  scrollY.value = window.scrollY
  showBackToTop.value = window.scrollY > 300
  // 更新文档尺寸（处理动态内容加载）
  updateDimensions()
}

// 主题切换功能 - 在亮色和暗色主题之间切换
function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  updateTheme()
}

function updateTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark', 'theme-dark')
    document.documentElement.classList.remove('theme-light')
  } else {
    document.documentElement.classList.remove('dark', 'theme-dark')
    document.documentElement.classList.add('theme-light')
  }
}

// 初始化主题
function initTheme() {
  // 检查本地存储的主题设置
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme === 'light') {
    isDark.value = false
  } else if (savedTheme === 'dark') {
    isDark.value = true
  } else {
    // 没有保存的主题，使用系统默认
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  updateTheme()
}

// 移动端菜单功能
function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value
}

function closeMobileMenu() {
  showMobileMenu.value = false
}

// 生命周期
onMounted(() => {
  // 初始化主题
  initTheme()

  // 初始化尺寸信息
  updateDimensions()

  // 添加滚动事件监听器
  window.addEventListener('scroll', handleScroll)
  
  // 添加窗口大小改变监听器
  window.addEventListener('resize', updateDimensions)
  
  // 添加文档点击事件监听器，用于关闭语言菜单
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    // 检查点击是否在语言菜单或语言按钮内部
    if (showLanguageMenu.value && !target.closest('[data-language-menu]')) {
      showLanguageMenu.value = false
    }
  })
})

// 清理事件监听器
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateDimensions)
})
</script>

<style>
/* 保持原有的全局样式 */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .text-4xl {
    font-size: 2rem;
  }

  .text-6xl {
    font-size: 3rem;
  }

  .text-7xl {
    font-size: 4rem;
  }

  .hidden.md\\:flex {
    display: none;
  }
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 暗黑模式滚动条 */
@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-track {
    background: #1f2937;
  }

  ::-webkit-scrollbar-thumb {
    background: #4b5563;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
}

/* 手动暗黑模式滚动条 */
.dark ::-webkit-scrollbar-track {
  background: #1f2937;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* 代码块样式优化 */
.prose code {
  background-color: #f1f5f9;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

/* 暗黑模式代码块 */
.dark .prose code {
  background-color: #374151;
  color: #e5e7eb;
}

/* 数学公式样式 */
.math-formula {
  display: inline-block;
  margin: 0.25rem;
}

/* 加载动画 */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
