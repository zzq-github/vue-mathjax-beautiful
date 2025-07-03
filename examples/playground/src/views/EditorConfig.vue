<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">

    <!-- 配置内容 -->
    <div class="container mx-auto px-4 py-8">
      <EditorConfigSection />
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