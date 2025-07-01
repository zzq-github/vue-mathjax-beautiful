<template>
  <section
    id="examples"
    class="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300"
  >
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl transition-colors duration-300">
          {{ t('examples.title') }}
        </h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {{ t('examples.description') }}
        </p>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(example, index) in examples"
          :key="example.name()"
          :class="`cursor-pointer rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
            activeExample === index
              ? 'ring-2 ring-blue-500 border-blue-200 dark:border-blue-600'
              : 'border-gray-100 dark:border-gray-700'
          }`"
          @click="$emit('loadExample', example.latex, index)"
        >
          <div class="text-center space-y-3">
            <span class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300 transition-colors duration-300">
              {{ example.category() }}
            </span>
            <div
              class="text-lg font-mono min-h-[40px] flex items-center justify-center dark:text-white transition-colors duration-300"
              v-html="example.rendered"
            ></div>
            <h4 class="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
              {{ example.name() }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '../../composables/useI18n';

// 国际化功能
const { t } = useI18n();

// Props
defineProps<{
  examples: Array<{
    name: () => string;
    latex: string;
    category: () => string;
    rendered: string;
  }>;
  activeExample: number;
}>();

// Emits
defineEmits<{
  loadExample: [latex: string, index: number];
}>();
</script> 