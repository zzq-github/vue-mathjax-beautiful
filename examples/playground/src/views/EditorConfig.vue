<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
    <!-- 装饰性背景 -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- 浮动圆圈 -->
      <div class="absolute top-1/6 right-1/5 w-64 h-64 bg-orange-100/20 dark:bg-orange-900/20 rounded-full blur-3xl animate-pulse" />
      <div class="absolute bottom-1/4 left-1/6 w-48 h-48 bg-red-100/20 dark:bg-red-900/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div class="absolute top-1/2 left-1/12 w-32 h-32 bg-pink-100/20 dark:bg-pink-900/20 rounded-full blur-xl animate-pulse delay-500" />
      <div class="absolute bottom-1/6 right-1/12 w-40 h-40 bg-amber-100/20 dark:bg-amber-900/20 rounded-full blur-2xl animate-pulse delay-700" />
      
      <!-- 数学符号装饰 -->
      <div class="absolute top-20 left-10 text-orange-300/20 dark:text-orange-400/20 text-8xl font-bold select-none rotate-12">
        ∫
      </div>
      <div class="absolute bottom-32 right-20 text-red-300/20 dark:text-red-400/20 text-6xl font-bold select-none -rotate-12">
        ∂
      </div>
      <div class="absolute top-1/3 right-10 text-pink-300/20 dark:text-pink-400/20 text-5xl font-bold select-none rotate-45">
        ∑
      </div>
      <div class="absolute bottom-1/3 left-20 text-amber-300/20 dark:text-amber-400/20 text-4xl font-bold select-none -rotate-45">
        √
      </div>
      <div class="absolute top-2/3 left-1/4 text-orange-200/20 dark:text-orange-300/20 text-3xl font-bold select-none rotate-12">
        π
      </div>
      <div class="absolute top-1/4 right-1/3 text-red-200/20 dark:text-red-300/20 text-4xl font-bold select-none -rotate-12">
        Σ
      </div>
      
      <!-- 网格背景 -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>

    <!-- 配置内容 - 暂时隐藏 -->
    <div class="relative z-10 container mx-auto px-4 py-8">
      <div class="text-center py-20">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('editorConfig.title') }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          {{ t('editorConfig.description') }}
        </p>
        <div class="mt-8 p-6 bg-amber-50/80 dark:bg-amber-900/40 backdrop-blur-sm border border-amber-200/50 dark:border-amber-800/50 rounded-xl">
          <p class="text-amber-800 dark:text-amber-200">
            🚧 富文本编辑器配置功能暂时隐藏，专注于数学公式编辑器功能
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { initMathJax } from 'vue-mathjax-beautiful'
import EditorConfigSection from '../components/EditorConfigSection/index.vue'

const { t } = useI18n()

onMounted(async () => {
  try {
    await initMathJax()
  } catch (error) {
    console.error('MathJax初始化失败:', error)
  }
})
</script> 