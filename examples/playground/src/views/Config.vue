<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
    <!-- 装饰性背景 -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- 浮动圆圈 -->
      <div class="absolute top-1/6 right-1/5 w-64 h-64 bg-emerald-100/20 dark:bg-emerald-900/20 rounded-full blur-3xl animate-pulse" />
      <div class="absolute bottom-1/4 left-1/6 w-48 h-48 bg-teal-100/20 dark:bg-teal-900/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div class="absolute top-1/2 left-1/12 w-32 h-32 bg-cyan-100/20 dark:bg-cyan-900/20 rounded-full blur-xl animate-pulse delay-500" />
      <div class="absolute bottom-1/6 right-1/12 w-40 h-40 bg-green-100/20 dark:bg-green-900/20 rounded-full blur-2xl animate-pulse delay-700" />
      
      <!-- 数学符号装饰 -->
      <div class="absolute top-20 left-10 text-emerald-300/20 dark:text-emerald-400/20 text-8xl font-bold select-none rotate-12">∫</div>
      <div class="absolute bottom-32 right-20 text-teal-300/20 dark:text-teal-400/20 text-6xl font-bold select-none -rotate-12">∂</div>
      <div class="absolute top-1/3 right-10 text-cyan-300/20 dark:text-cyan-400/20 text-5xl font-bold select-none rotate-45">∑</div>
      <div class="absolute bottom-1/3 left-20 text-green-300/20 dark:text-green-400/20 text-4xl font-bold select-none -rotate-45">√</div>
      <div class="absolute top-2/3 left-1/4 text-emerald-200/20 dark:text-emerald-300/20 text-3xl font-bold select-none rotate-12">π</div>
      <div class="absolute top-1/4 right-1/3 text-teal-200/20 dark:text-teal-300/20 text-4xl font-bold select-none -rotate-12">Σ</div>
      
      <!-- 网格背景 -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>

    <!-- 配置内容 -->
    <div class="relative z-10 container mx-auto px-4 py-8">
      <ConfigSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { initMathJax } from 'vue-mathjax-beautiful'
import ConfigSection from '../components/ConfigSection/index.vue'

const { t } = useI18n()

onMounted(async () => {
  try {
    await initMathJax()
  } catch (error) {
    console.error('MathJax初始化失败:', error)
  }
})
</script> 