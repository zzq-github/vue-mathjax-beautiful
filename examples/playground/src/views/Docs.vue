<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
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
    <div class="container mx-auto px-4 py-8">
      <DocsSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '../composables/useI18n'
import DocsSection from '../components/DocsSection/index.vue'

const { t } = useI18n()
</script> 