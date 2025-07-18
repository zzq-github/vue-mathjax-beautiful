<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
    <!-- 装饰性背景 -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- 浮动圆圈 -->
      <div class="absolute top-1/6 right-1/5 w-64 h-64 bg-blue-100/20 dark:bg-blue-900/20 rounded-full blur-3xl animate-pulse" />
      <div class="absolute bottom-1/4 left-1/6 w-48 h-48 bg-purple-100/20 dark:bg-purple-900/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div class="absolute top-1/2 left-1/12 w-32 h-32 bg-indigo-100/20 dark:bg-indigo-900/20 rounded-full blur-xl animate-pulse delay-500" />
      <div class="absolute bottom-1/6 right-1/12 w-40 h-40 bg-cyan-100/20 dark:bg-cyan-900/20 rounded-full blur-2xl animate-pulse delay-700" />
      
      <!-- 数学符号装饰 -->
      <div class="absolute top-20 left-10 text-blue-300/20 dark:text-blue-400/20 text-8xl font-bold select-none rotate-12">∫</div>
      <div class="absolute bottom-32 right-20 text-purple-300/20 dark:text-purple-400/20 text-6xl font-bold select-none -rotate-12">∂</div>
      <div class="absolute top-1/3 right-10 text-indigo-300/20 dark:text-indigo-400/20 text-5xl font-bold select-none rotate-45">∑</div>
      <div class="absolute bottom-1/3 left-20 text-cyan-300/20 dark:text-cyan-400/20 text-4xl font-bold select-none -rotate-45">√</div>
      <div class="absolute top-2/3 left-1/4 text-blue-200/20 dark:text-blue-300/20 text-3xl font-bold select-none rotate-12">π</div>
      <div class="absolute top-1/4 right-1/3 text-purple-200/20 dark:text-purple-300/20 text-4xl font-bold select-none -rotate-12">Σ</div>
      
      <!-- 网格背景 -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>

    <!-- 演示内容 -->
    <div class="relative z-10 container mx-auto px-4 py-8">
      <DemoSection
        :is-dark="isDark"
        :config="demoConfig"
        @formula-insert="handleFormulaInsert"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { initMathJax } from 'vue-mathjax-beautiful'
import DemoSection from '../components/DemoSection/index.vue'

const { t } = useI18n()

// 主题状态
const isDark = ref(false)

// 演示配置
const demoConfig = ref({
  themeConfig: {
    light: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      accent: '#10b981',
      button: '#3b82f6',
      buttonHover: '#2563eb',
      buttonText: '#ffffff',
      dialogBackground: '#ffffff',
      inputBackground: '#ffffff',
      inputBorder: '#e5e7eb',
    },
    dark: {
      primary: '#60a5fa',
      secondary: '#9ca3af',
      accent: '#34d399',
      button: '#60a5fa',
      buttonHover: '#3b82f6',
      buttonText: '#ffffff',
      dialogBackground: '#1f2937',
      inputBackground: '#374151',
      inputBorder: '#4b5563',
    },
  },
})

// 事件处理
function handleFormulaInsert(latex: string) {
  console.log('插入公式:', latex)
}

// 初始化主题
function initTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
  } else if (savedTheme === 'light') {
    isDark.value = false
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
}

onMounted(async () => {
  initTheme()
  
  try {
    await initMathJax()
  } catch (error) {
    console.error('MathJax初始化失败:', error)
  }
})
</script> 