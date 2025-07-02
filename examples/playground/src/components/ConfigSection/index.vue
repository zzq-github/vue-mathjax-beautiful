<template>
  <section id="config" class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 py-16">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          {{ t('config.title') }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ t('config.description') }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 配置面板 -->
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <div class="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-2xl">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ t('config.settings') }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {{ t('config.settingsDescription') }}
            </p>
          </div>
          
          <div class="p-6 space-y-8">
            <!-- 模式选择 -->
            <div class="space-y-3">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ t('config.mode') }}
              </label>
              <div class="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <button
                  type="button"
                  @click="config.inlineMode = false"
                  :class="[
                    'flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200',
                    !config.inlineMode
                      ? 'bg-white dark:bg-gray-800 text-yellow-600 dark:text-yellow-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  ]"
                >
                  {{ t('config.dialogMode') }}
                </button>
                <button
                  type="button"
                  @click="config.inlineMode = true"
                  :class="[
                    'flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200',
                    config.inlineMode
                      ? 'bg-white dark:bg-gray-800 text-yellow-600 dark:text-yellow-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  ]"
                >
                  {{ t('config.inlineMode') }}
                </button>
              </div>
            </div>

            <!-- 主题选择 -->
            <div class="space-y-3">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ t('config.theme') }}
              </label>
              <div class="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <button
                  type="button"
                  @click="config.theme = 'light'"
                  :class="[
                    'flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200',
                    config.theme === 'light'
                      ? 'bg-white dark:bg-gray-800 text-yellow-600 dark:text-yellow-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  ]"
                >
                  {{ t('config.lightTheme') }}
                </button>
                <button
                  type="button"
                  @click="config.theme = 'dark'"
                  :class="[
                    'flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200',
                    config.theme === 'dark'
                      ? 'bg-white dark:bg-gray-800 text-yellow-600 dark:text-yellow-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
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
              
              <div class="grid grid-cols-1 gap-3">
                <div v-for="feature in featureList" :key="feature.key" class="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg">
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ feature.label }}</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="config[feature.key as keyof typeof config]" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <!-- 输入设置 -->
            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ t('config.inputSettings') }}
              </h4>
              
              <div class="grid grid-cols-1 gap-4">
                <div class="space-y-2">
                  <label class="text-sm text-gray-700 dark:text-gray-300">
                    {{ t('config.placeholder') }}
                  </label>
                  <input
                    v-model="config.placeholder"
                    type="text"
                    class="w-full px-3 py-2.5 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100"
                  />
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm text-gray-700 dark:text-gray-300">
                      {{ t('config.maxLength') }}
                    </label>
                    <input
                      v-model.number="config.maxLength"
                      type="number"
                      min="10"
                      max="5000"
                      class="w-full px-3 py-2.5 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div class="space-y-2">
                    <label class="text-sm text-gray-700 dark:text-gray-300">
                      {{ t('config.rows') }}
                    </label>
                    <input
                      v-model.number="config.rows"
                      type="number"
                      min="1"
                      max="10"
                      class="w-full px-3 py-2.5 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- 符号分类 -->
            <div class="space-y-4">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ t('config.enabledCategories') }}
              </label>
              <div class="grid grid-cols-1 gap-3">
                <div class="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg">
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('config.basicSymbols') }}</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="enabledBasic" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg">
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('config.greekLetters') }}</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="enabledGreek" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg">
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('config.advancedSymbols') }}</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="enabledAdvanced" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg">
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('config.showFormulaExamples') }}</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="config.showFormulaExamples" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 演示区域 -->
        <div class="space-y-6">
          <!-- 预览面板 -->
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <div class="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-2xl">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
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
                  type="button"
                  @click="showDialog = true"
                  class="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
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
                  :show-formula-examples="config.showFormulaExamples"
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
                  :show-formula-examples="config.showFormulaExamples"
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
            </div>
          </div>
          
          <!-- 事件日志和配置代码 -->
          <div class="grid grid-cols-1 gap-6">
            <!-- 事件日志 -->
            <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <div class="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-2xl">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ t('config.eventLog') }}
                </h4>
              </div>
              <div class="p-4">
                <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 max-h-32 overflow-y-auto">
                  <div v-if="eventLog.length === 0" class="text-sm text-gray-500 italic text-center py-2">
                    {{ t('config.noEvents') }}
                  </div>
                  <div v-else class="space-y-1">
                    <div
                      v-for="(event, index) in eventLog.slice(-5)"
                      :key="index"
                      class="text-xs font-mono text-gray-600 dark:text-gray-400 p-2 bg-white/50 dark:bg-gray-800/50 rounded"
                    >
                      <span class="text-blue-600 dark:text-blue-400">[{{ event.time }}]</span>
                      <span class="text-green-600 dark:text-green-400 font-semibold">{{ event.type }}:</span>
                      {{ event.data }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 当前配置 -->
            <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <div class="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-2xl">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ t('config.currentConfig') }}
                </h4>
              </div>
              <div class="p-4">
                <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">{{ configCode }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { VueMathjaxBeautiful } from 'vue-mathjax-beautiful';
import { useI18n } from '../../composables/useI18n';

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
  autoFocus: false,
  showFormulaExamples: true,
  placeholder: '输入 LaTeX 公式或点击下方符号...',
  maxLength: 1000,
  rows: 3,
  title: '数学公式编辑器',
  subtitle: '使用下方按钮或直接输入 LaTeX 代码',
  insertButtonText: '插入公式',
  cancelButtonText: '取消',
  clearButtonText: '清空',
});

// 功能列表
const featureList = computed(() => [
  { key: 'showSymbols', label: t('config.showSymbols') },
  { key: 'showPreview', label: t('config.showPreview') },
  { key: 'showThemeToggle', label: t('config.showThemeToggle') },
  { key: 'showClearButton', label: t('config.showClearButton') },
  { key: 'readonly', label: t('config.readonly') },
  { key: 'autoFocus', label: t('config.autoFocus') },
]);

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
  
  if (eventLog.value.length > 10) {
    eventLog.value = eventLog.value.slice(-10);
  }
};

// 事件处理器
const handleInsert = (latex: string) => addEvent('insert', latex);
const handleChange = (latex: string) => addEvent('change', latex);
const handleClear = () => addEvent('clear', '清空内容');
const handleClose = () => addEvent('close', '关闭弹窗');
const handleThemeChange = (theme: string) => addEvent('themeChange', theme);

// 生成配置代码
const configCode = computed(() => {
  return `<VueMathjaxBeautiful
  ${config.inlineMode ? ':inline-mode="true"' : 'v-model="showDialog"'}
  theme="${config.theme}"
  :show-symbols="${config.showSymbols}"
  :show-preview="${config.showPreview}"
  :show-theme-toggle="${config.showThemeToggle}"
  :show-clear-button="${config.showClearButton}"
  :show-formula-examples="${config.showFormulaExamples}"
  :readonly="${config.readonly}"
  :auto-focus="${config.autoFocus}"
  placeholder="${config.placeholder}"
  :max-length="${config.maxLength}"
  :rows="${config.rows}"
  :enabled-categories="['${computedEnabledCategories.value.join("', '")}']"
  @insert="handleInsert"
  @change="handleChange"
  @clear="handleClear"
  @theme-change="handleThemeChange"
/>`;
});
</script>

<style scoped>
/* 滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style> 