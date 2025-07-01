<template>
  <section id="editor" class="py-20">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl transition-colors duration-300">
          {{ t('demo.title') }}
        </h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {{ t('demo.description') }}
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-4">
          <div class="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
            <CalculatorIcon class="h-4 w-4 text-purple-600" />
            <span class="text-sm font-medium text-purple-800">{{ t('demo.professionalEditor') }}</span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
            <Edit3Icon class="h-4 w-4 text-blue-600" />
            <span class="text-sm font-medium text-blue-800">{{ t('demo.richTextEditorLabel') }}</span>
          </div>
        </div>
      </div>

      <!-- 公式编辑器 - 优先展示 -->
      <div class="mb-8 sm:mb-12 overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500 text-white flex-shrink-0">
                <CalculatorIcon class="h-4 w-4" />
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                  {{ t('demo.formulaEditor.title') }}
                </h3>
                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300 mt-0.5">
                  {{ t('demo.formulaEditor.description') }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <span class="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/30 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:text-purple-300 transition-colors duration-300">
                {{ t('demo.formulaEditor.inlineMode') }}
              </span>
              <span class="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-300 transition-colors duration-300">
                {{ t('demo.formulaEditor.realTimePreview') }}
              </span>
            </div>
          </div>
        </div>
        <div class="p-4 sm:p-6">
          <!-- 使用 VueMathjaxBeautiful 组件 -->
          <VueMathjaxBeautiful
            :inline-mode="true"
            :theme="isDark ? 'dark' : 'light'"
            @insert="$emit('formulaInsert', $event)"
          />
          <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors duration-300">
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                <span class="text-white text-xs font-bold">💡</span>
              </div>
              <div class="text-sm text-blue-800 dark:text-blue-200 transition-colors duration-300">
                <p class="font-medium mb-1">{{ t('demo.formulaEditor.tips.title') }}</p>
                <ul class="space-y-1 text-blue-700 dark:text-blue-300 transition-colors duration-300">
                  <li>• {{ t('demo.formulaEditor.tips.clickSymbols') }}</li>
                  <li>• {{ t('demo.formulaEditor.tips.latexSupport') }}</li>
                  <li>• {{ t('demo.formulaEditor.tips.realTime') }}</li>
                  <li>• {{ t('demo.formulaEditor.tips.modes') }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 富文本编辑器 -->
      <div class="overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white flex-shrink-0">
                <Edit3Icon class="h-4 w-4" />
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                  {{ t('demo.richTextEditor.title') }}
                </h3>
                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300 mt-0.5">
                  {{ t('demo.richTextEditor.description') }}
                </p>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-3">
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300 transition-colors duration-300">
                  {{ t('demo.richTextEditor.richText') }}
                </span>
                <span class="inline-flex items-center rounded-full bg-orange-100 dark:bg-orange-900/30 px-2.5 py-0.5 text-xs font-medium text-orange-800 dark:text-orange-300 transition-colors duration-300">
                  {{ t('demo.richTextEditor.latexSupport') }}
                </span>
              </div>
              <div class="flex gap-2">
                <button @click="$emit('clearContent')" class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300 flex-shrink-0">
                  {{ t('buttons.clearContent') }}
                </button>
                <button @click="$emit('loadSample')" class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300 flex-shrink-0">
                  {{ t('buttons.loadSample') }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="p-4 sm:p-6">
          <div class="min-h-[300px] sm:min-h-[400px]">
            <VueMathjaxEditor
              :model-value="richTextContent"
              @update:model-value="$emit('update:richTextContent', $event)"
              :theme="isDark ? 'dark' : 'light'"
              :placeholder="t('demo.richTextEditor.placeholder')"
              @change="$emit('richTextChange', $event)"
              @focus="$emit('editorFocus')"
              @blur="$emit('editorBlur')"
            />
          </div>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg transition-colors duration-300">
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
                <div class="text-sm text-green-800 dark:text-green-200 transition-colors duration-300">
                  <p class="font-medium mb-1">{{ t('demo.richTextEditor.latexExamples.title') }}</p>
                  <ul class="space-y-1 text-green-700 dark:text-green-300 font-mono text-xs transition-colors duration-300">
                    <li>
                      • {{ t('demo.richTextEditor.latexExamples.inline') }}<code class="bg-green-100 dark:bg-green-800 px-1 rounded">$E=mc^2$</code>
                    </li>
                    <li>
                      • {{ t('demo.richTextEditor.latexExamples.display') }}<code class="bg-green-100 dark:bg-green-800 px-1 rounded">$$\int_0^1 x^2 dx$$</code>
                    </li>
                    <li>
                      • {{ t('demo.richTextEditor.latexExamples.fraction') }}<code class="bg-green-100 dark:bg-green-800 px-1 rounded">\frac{a}{b}</code>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg transition-colors duration-300">
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center mt-0.5">
                  <span class="text-white text-xs font-bold">⚡</span>
                </div>
                <div class="text-sm text-amber-800 dark:text-amber-200 transition-colors duration-300">
                  <p class="font-medium mb-1">{{ t('demo.richTextEditor.shortcuts.title') }}</p>
                  <ul class="space-y-1 text-amber-700 dark:text-amber-300 text-xs transition-colors duration-300">
                    <li>
                      •
                      <kbd class="px-1 bg-amber-100 dark:bg-amber-800 rounded">Ctrl+B</kbd> {{ t('demo.richTextEditor.shortcuts.bold') }}
                    </li>
                    <li>
                      •
                      <kbd class="px-1 bg-amber-100 dark:bg-amber-800 rounded">Ctrl+I</kbd> {{ t('demo.richTextEditor.shortcuts.italic') }}
                    </li>
                    <li>
                      •
                      <kbd class="px-1 bg-amber-100 dark:bg-amber-800 rounded">Ctrl+U</kbd>
                      {{ t('demo.richTextEditor.shortcuts.underline') }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Calculator as CalculatorIcon, Edit3 as Edit3Icon } from 'lucide-vue-next';
import { VueMathjaxEditor, VueMathjaxBeautiful } from 'vue-mathjax-beautiful';
import { useI18n } from '../../composables/useI18n';

// 国际化功能
const { t } = useI18n();

// Props
defineProps<{
  isDark: boolean;
  richTextContent: string;
}>();

// Emits
defineEmits<{
  formulaInsert: [latex: string];
  clearContent: [];
  loadSample: [];
  'update:richTextContent': [value: string];
  richTextChange: [value: string];
  editorFocus: [];
  editorBlur: [];
}>();
</script> 