<template>
  <section id="config" class="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl transition-colors duration-300">
          {{ t('config.title') }}
        </h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {{ t('config.description') }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 配置面板 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ t('config.settings') }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {{ t('config.settingsDescription') }}
            </p>
          </div>
          
          <div class="p-6 space-y-6">
            <!-- 模式选择 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('config.mode') }}
              </label>
              <div class="flex gap-3">
                <button
                  @click="config.inlineMode = false"
                  :class="[
                    'px-4 py-2 text-sm font-medium rounded-lg border transition-colors',
                    !config.inlineMode
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  ]"
                >
                  {{ t('config.dialogMode') }}
                </button>
                <button
                  @click="config.inlineMode = true"
                  :class="[
                    'px-4 py-2 text-sm font-medium rounded-lg border transition-colors',
                    config.inlineMode
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  ]"
                >
                  {{ t('config.inlineMode') }}
                </button>
              </div>
            </div>

            <!-- 主题选择 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('config.theme') }}
              </label>
              <div class="flex gap-3">
                <button
                  @click="config.theme = 'light'"
                  :class="[
                    'px-4 py-2 text-sm font-medium rounded-lg border transition-colors',
                    config.theme === 'light'
                      ? 'bg-yellow-500 text-white border-yellow-500'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  ]"
                >
                  {{ t('config.lightTheme') }}
                </button>
                <button
                  @click="config.theme = 'dark'"
                  :class="[
                    'px-4 py-2 text-sm font-medium rounded-lg border transition-colors',
                    config.theme === 'dark'
                      ? 'bg-gray-800 text-white border-gray-800'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  ]"
                >
                  {{ t('config.darkTheme') }}
                </button>
              </div>
            </div>

            <!-- 功能开关 -->
            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ t('config.features') }}
              </h4>
              
              <div class="space-y-3">
                <label class="flex items-center">
                  <input
                    v-model="config.showSymbols"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {{ t('config.showSymbols') }}
                  </span>
                </label>
                
                <label class="flex items-center">
                  <input
                    v-model="config.showPreview"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {{ t('config.showPreview') }}
                  </span>
                </label>
                
                <label class="flex items-center">
                  <input
                    v-model="config.showThemeToggle"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {{ t('config.showThemeToggle') }}
                  </span>
                </label>
                
                <label class="flex items-center">
                  <input
                    v-model="config.showClearButton"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {{ t('config.showClearButton') }}
                  </span>
                </label>
                
                <label class="flex items-center">
                  <input
                    v-model="config.readonly"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {{ t('config.readonly') }}
                  </span>
                </label>
                
                <label class="flex items-center">
                  <input
                    v-model="config.autoFocus"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {{ t('config.autoFocus') }}
                  </span>
                </label>
              </div>
            </div>

            <!-- 输入设置 -->
            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ t('config.inputSettings') }}
              </h4>
              
              <div>
                <label class="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('config.placeholder') }}
                </label>
                <input
                  v-model="config.placeholder"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>
              
              <div>
                <label class="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('config.maxLength') }}
                </label>
                <input
                  v-model.number="config.maxLength"
                  type="number"
                  min="10"
                  max="5000"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>
              
              <div>
                <label class="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                  {{ t('config.rows') }}
                </label>
                <input
                  v-model.number="config.rows"
                  type="number"
                  min="1"
                  max="10"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                />
              </div>
            </div>

            <!-- 符号分类 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('config.enabledCategories') }}
              </label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    v-model="enabledBasic"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {{ t('config.basicSymbols') }}
                  </span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="enabledGreek"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {{ t('config.greekLetters') }}
                  </span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="enabledAdvanced"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {{ t('config.advancedSymbols') }}
                  </span>
                </label>
              </div>
            </div>

            <!-- 显示当前配置按钮 -->
            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                @click="showCurrentConfig = !showCurrentConfig"
                class="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                {{ showCurrentConfig ? t('config.hideConfig') : t('config.showConfig') }}
              </button>
            </div>
          </div>
        </div>

        <!-- 演示区域 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ t('config.preview') }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {{ t('config.previewDescription') }}
            </p>
          </div>
          
          <div class="p-6">
            <!-- 弹窗模式预览 -->
            <div v-if="!config.inlineMode" class="space-y-4">
              <button
                @click="showDialog = true"
                class="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                {{ t('config.openDialog') }}
              </button>
              
              <VueMathjaxBeautiful
                v-model="showDialog"
                :theme="config.theme"
                :show-symbols="config.showSymbols"
                :show-preview="config.showPreview"
                :show-theme-toggle="config.showThemeToggle"
                :show-clear-button="config.showClearButton"
                :readonly="config.readonly"
                :auto-focus="config.autoFocus"
                :placeholder="config.placeholder"
                :max-length="config.maxLength"
                :rows="config.rows"
                :enabled-categories="computedEnabledCategories"
                :title="config.title"
                :subtitle="config.subtitle"
                :insert-button-text="config.insertButtonText"
                :cancel-button-text="config.cancelButtonText"
                :clear-button-text="config.clearButtonText"
                @insert="handleInsert"
                @change="handleChange"
                @clear="handleClear"
                @close="handleClose"
                @theme-change="handleThemeChange"
              />
            </div>
            
            <!-- 内联模式预览 -->
            <div v-else>
              <VueMathjaxBeautiful
                :inline-mode="true"
                :theme="config.theme"
                :show-symbols="config.showSymbols"
                :show-preview="config.showPreview"
                :show-theme-toggle="config.showThemeToggle"
                :show-clear-button="config.showClearButton"
                :readonly="config.readonly"
                :auto-focus="config.autoFocus"
                :placeholder="config.placeholder"
                :max-length="config.maxLength"
                :rows="config.rows"
                :enabled-categories="computedEnabledCategories"
                :insert-button-text="config.insertButtonText"
                :clear-button-text="config.clearButtonText"
                @insert="handleInsert"
                @change="handleChange"
                @clear="handleClear"
                @theme-change="handleThemeChange"
              />
            </div>
            
            <!-- 事件日志 -->
            <div class="mt-6">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('config.eventLog') }}
              </h4>
              <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 min-h-[120px] max-h-[200px] overflow-y-auto">
                <div v-if="eventLog.length === 0" class="text-sm text-gray-500 italic">
                  {{ t('config.noEvents') }}
                </div>
                <div v-else class="space-y-1">
                  <div
                    v-for="(event, index) in eventLog.slice(-10)"
                    :key="index"
                    class="text-xs font-mono text-gray-600 dark:text-gray-400"
                  >
                    <span class="text-blue-600 dark:text-blue-400">[{{ event.time }}]</span>
                    <span class="text-green-600 dark:text-green-400 font-semibold">{{ event.type }}:</span>
                    {{ event.data }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 当前配置展示 -->
      <div
        v-if="showCurrentConfig"
        class="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300"
      >
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ t('config.currentConfig') }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {{ t('config.currentConfigDescription') }}
          </p>
        </div>
        <div class="p-6">
          <pre class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-sm font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">{{ configCode }}</pre>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { VueMathjaxBeautiful } from 'vue-mathjax-beautiful';
import { useI18n } from '../../composables/useI18n';

// 国际化功能
const { t } = useI18n();

// 响应式配置
const config = reactive({
  inlineMode: false,
  theme: 'light',
  showSymbols: true,
  showPreview: true,
  showThemeToggle: true,
  showClearButton: true,
  readonly: false,
  autoFocus: true,
  placeholder: '输入 LaTeX 公式或点击下方符号...',
  maxLength: 1000,
  rows: 3,
  title: '数学公式编辑器',
  subtitle: '使用下方按钮或直接输入 LaTeX 代码',
  insertButtonText: '插入公式',
  cancelButtonText: '取消',
  clearButtonText: '清空',
});

// 符号分类选择
const enabledBasic = ref(true);
const enabledGreek = ref(true);
const enabledAdvanced = ref(true);

// 计算启用的分类
const computedEnabledCategories = computed(() => {
  const categories: string[] = [];
  if (enabledBasic.value) categories.push('basic');
  if (enabledGreek.value) categories.push('greek');
  if (enabledAdvanced.value) categories.push('advanced');
  return categories;
});

// 弹窗显示状态
const showDialog = ref(false);
const showCurrentConfig = ref(false);

// 事件日志
const eventLog = ref<Array<{ time: string; type: string; data: string }>>([]);

// 添加事件到日志
const addEvent = (type: string, data: any) => {
  const time = new Date().toLocaleTimeString();
  eventLog.value.push({
    time,
    type,
    data: typeof data === 'string' ? data : JSON.stringify(data)
  });
};

// 事件处理器
const handleInsert = (latex: string) => {
  addEvent('insert', latex);
};

const handleChange = (latex: string) => {
  addEvent('change', latex);
};

const handleClear = () => {
  addEvent('clear', '清空内容');
};

const handleClose = () => {
  addEvent('close', '关闭弹窗');
};

const handleThemeChange = (theme: string) => {
  addEvent('themeChange', theme);
};

// 生成配置代码
const configCode = computed(() => {
  return `<VueMathjaxBeautiful
  ${config.inlineMode ? ':inline-mode="true"' : 'v-model="showDialog"'}
  theme="${config.theme}"
  :show-symbols="${config.showSymbols}"
  :show-preview="${config.showPreview}"
  :show-theme-toggle="${config.showThemeToggle}"
  :show-clear-button="${config.showClearButton}"
  :readonly="${config.readonly}"
  :auto-focus="${config.autoFocus}"
  placeholder="${config.placeholder}"
  :max-length="${config.maxLength}"
  :rows="${config.rows}"
  :enabled-categories="['${computedEnabledCategories.value.join("', '")}']"
  title="${config.title}"
  subtitle="${config.subtitle}"
  insert-button-text="${config.insertButtonText}"
  cancel-button-text="${config.cancelButtonText}"
  clear-button-text="${config.clearButtonText}"
  @insert="handleInsert"
  @change="handleChange"
  @clear="handleClear"
  @close="handleClose"
  @theme-change="handleThemeChange"
/>`;
});
</script>

<style scoped>
/* 自定义滚动条 */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 暗黑模式滚动条 */
.dark .overflow-y-auto::-webkit-scrollbar-track {
  background: #1f2937;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style> 