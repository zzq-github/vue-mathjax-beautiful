<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
    <!-- 装饰性背景 -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- 浮动圆圈 -->
      <div class="absolute top-1/6 right-1/5 w-64 h-64 bg-indigo-100/20 dark:bg-indigo-900/20 rounded-full blur-3xl animate-pulse" />
      <div class="absolute bottom-1/4 left-1/6 w-48 h-48 bg-blue-100/20 dark:bg-blue-900/20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div class="absolute top-1/2 left-1/12 w-32 h-32 bg-purple-100/20 dark:bg-purple-900/20 rounded-full blur-xl animate-pulse delay-500" />
      <div class="absolute bottom-1/6 right-1/12 w-40 h-40 bg-violet-100/20 dark:bg-violet-900/20 rounded-full blur-2xl animate-pulse delay-700" />
      
      <!-- 数学符号装饰 -->
      <div class="absolute top-20 left-10 text-indigo-300/20 dark:text-indigo-400/20 text-8xl font-bold select-none rotate-12">∫</div>
      <div class="absolute bottom-32 right-20 text-blue-300/20 dark:text-blue-400/20 text-6xl font-bold select-none -rotate-12">∂</div>
      <div class="absolute top-1/3 right-10 text-purple-300/20 dark:text-purple-400/20 text-5xl font-bold select-none rotate-45">∑</div>
      <div class="absolute bottom-1/3 left-20 text-violet-300/20 dark:text-violet-400/20 text-4xl font-bold select-none -rotate-45">√</div>
      <div class="absolute top-2/3 left-1/4 text-indigo-200/20 dark:text-indigo-300/20 text-3xl font-bold select-none rotate-12">π</div>
      <div class="absolute top-1/4 right-1/3 text-blue-200/20 dark:text-blue-300/20 text-4xl font-bold select-none -rotate-12">Σ</div>
      
      <!-- 网格背景 -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>

    <!-- 页面头部 -->
    <!-- <div class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {{ t('docs.title') }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          {{ t('docs.description') }}
        </p>
      </div>
    </div> -->

    <!-- 文档内容 -->
    <div class="relative z-10 container mx-auto px-4 py-8">
      <DocsSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '../composables/useI18n'
import DocsSection from '../components/DocsSection/index.vue'

const { t } = useI18n()
</script> 