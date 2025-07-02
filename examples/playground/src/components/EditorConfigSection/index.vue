<template>
  <div id="editor-config" class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 py-16">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          {{ t('editorConfig.title') }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ t('editorConfig.description') }}
        </p>
      </div>
      
      <div class="grid grid-cols-1 xl:grid-cols-5 gap-3">
        <!-- 配置面板 -->
        <div class="xl:col-span-2">
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <!-- 简化的标签栏 -->
            <div class="border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50">
              <nav class="flex space-x-1 p-1">
                <button 
                  v-for="tab in configTabs"
                  :key="tab.key"
                  @click="activeTab = tab.key"
                  :class="[
                    'px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                    activeTab === tab.key 
                      ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-blue-600/10 dark:ring-blue-400/10' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  ]"
                >
                  {{ tab.label }}
                </button>
              </nav>
            </div>
            
            <!-- 配置内容 -->
            <div class="p-6">
              <!-- 基础配置 -->
              <div v-if="activeTab === 'basic'" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.basic.placeholder') }}</label>
                    <input 
                      v-model="config.placeholder" 
                      type="text" 
                      class="w-full px-3 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.basic.theme') }}</label>
                    <select 
                      v-model="config.theme"
                      class="w-full px-3 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                  
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.basic.minHeight') }}</label>
                    <input 
                      v-model="config.minHeight" 
                      type="text" 
                      placeholder="300px" 
                      class="w-full px-3 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.basic.width') }}</label>
                    <input 
                      v-model="config.width" 
                      type="text" 
                      placeholder="100%" 
                      class="w-full px-3 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>
              
              <!-- 工具栏配置 -->
              <div v-if="activeTab === 'toolbar'" class="space-y-6">
                <div class="flex items-center justify-between p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg border border-blue-200/30 dark:border-blue-800/30">
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-white">{{ t('editorConfig.toolbar.showToolbar') }}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ t('editorConfig.toolbar.showToolbarDesc') }}</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="config.showToolbar" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div class="space-y-2">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.toolbar.enabledTools') }}</label>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label v-for="tool in availableTools" :key="tool.value" class="flex items-center space-x-2 p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-600/30 transition-colors cursor-pointer">
                      <input 
                        type="checkbox" 
                        :value="tool.value"
                        v-model="config.enabledTools"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span class="text-sm text-gray-700 dark:text-gray-300 text-ellipsis overflow-hidden whitespace-nowrap" :title="tool.label">{{ tool.label }}</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <!-- 功能配置 -->
              <div v-if="activeTab === 'features'" class="space-y-3">
                <div v-for="feature in featureList" :key="feature.key" class="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg">
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-white">{{ feature.title }}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ feature.description }}</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="config[feature.key as keyof typeof config]" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              
              <!-- 限制配置 -->
              <div v-if="activeTab === 'limits'" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.limits.maxLength') }}</label>
                    <input 
                      v-model.number="config.maxLength" 
                      min="0" 
                      class="w-full px-3 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.limits.maxImageSize') }}(bytes)</label>
                    <div class="flex items-center">
                      <input 
                        v-model.number="config.maxImageSize" 
                        min="0" 
                        class="flex-1 min-w-0 px-3 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 预览面板 -->
        <div class="xl:col-span-3">
          <div class="sticky top-8 space-y-6">
            <!-- 编辑器预览 -->
            <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ t('editorConfig.preview.title') }}</h3>
              <div class="mb-6">
                <VueMathjaxEditor
                  v-model="demoContent"
                  v-bind="config"
                  @ready="onEditorReady"
                  @error="onEditorError"
                  @change="onContentChange"
                />
              </div>
            </div>
            
            <!-- 代码生成 -->
            <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">{{ t('editorConfig.code.title') }}</h4>
                <button 
                  @click="copyCode" 
                  class="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                >
                  {{ t('editorConfig.code.copy') }}
                </button>
              </div>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono"><code>{{ generatedCode }}</code></pre>
            </div>
            
            <!-- 事件日志 -->
            <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">{{ t('editorConfig.events.title') }}</h4>
                <button 
                  @click="clearLog" 
                  class="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg transition-colors"
                >
                  {{ t('editorConfig.events.clear') }}
                </button>
              </div>
              <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 max-h-40 overflow-y-auto">
                <div v-if="eventLog.length === 0" class="text-sm text-gray-500 italic text-center py-4">
                  暂无事件
                </div>
                <div v-else class="space-y-2">
                  <div 
                    v-for="(event, index) in eventLog.slice(-10)" 
                    :key="index"
                    class="text-xs font-mono p-2 rounded"
                    :class="{
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200': event.type === 'info',
                      'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200': event.type === 'success',
                      'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200': event.type === 'error'
                    }"
                  >
                    <span class="opacity-75">{{ event.time }}</span> {{ event.name }}: {{ event.data }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from '../../composables/useI18n';
import { VueMathjaxEditor } from 'vue-mathjax-beautiful';

const { t } = useI18n();

// 当前激活的标签页
const activeTab = ref('basic');

// 配置标签页
const configTabs = computed(() => [
  { key: 'basic', label: t('editorConfig.tabs.basic') },
  { key: 'toolbar', label: t('editorConfig.tabs.toolbar') },
  { key: 'features', label: t('editorConfig.tabs.features') },
  { key: 'limits', label: t('editorConfig.tabs.limits') },
]);

// 可选工具
const availableTools = computed(() => [
  { value: 'bold', label: t('editorConfig.tools.bold') },
  { value: 'italic', label: t('editorConfig.tools.italic') },
  { value: 'underline', label: t('editorConfig.tools.underline') },
  { value: 'strikethrough', label: t('editorConfig.tools.strikethrough') },
  { value: 'formula', label: t('editorConfig.tools.formula') },
  { value: 'image', label: t('editorConfig.tools.image') },
  { value: 'clear', label: t('editorConfig.tools.clear') },
]);

// 功能列表
const featureList = computed(() => [
  { key: 'enableBold', title: t('editorConfig.format.enableBold'), description: t('editorConfig.format.enableBoldDesc') },
  { key: 'enableItalic', title: t('editorConfig.format.enableItalic'), description: t('editorConfig.format.enableItalicDesc') },
  { key: 'enableStrikethrough', title: t('editorConfig.format.enableStrikethrough'), description: t('editorConfig.format.enableStrikethroughDesc') },
  { key: 'enableFormula', title: t('editorConfig.features.enableFormula'), description: t('editorConfig.features.enableFormulaDesc') },
  { key: 'enableImage', title: t('editorConfig.features.enableImage'), description: t('editorConfig.features.enableImageDesc') },
  { key: 'readonly', title: t('editorConfig.features.readonly'), description: t('editorConfig.features.readonlyDesc') },
  { key: 'autoFocus', title: t('editorConfig.features.autoFocus'), description: t('editorConfig.features.autoFocusDesc') },
]);

// 编辑器配置
const config = ref({
  placeholder: 'Enter your content...',
  minHeight: '300px',
  width: '100%',
  theme: 'light' as 'light' | 'dark',
  showToolbar: true,
  enabledTools: ['bold', 'italic', 'underline', 'strikethrough', 'formula', 'image', 'clear'],
  enableBold: true,
  enableItalic: true,
  enableStrikethrough: true,
  enableFormula: true,
  enableImage: true,
  readonly: false,
  autoFocus: false,
  maxLength: 10000,
  maxImageSize: 5242880,
});

// 演示内容
const demoContent = ref('欢迎使用 **VueMathjaxEditor** 富文本编辑器！\n\n这是一个支持 *斜体*、__下划线__、~~删除线~~ 等格式的编辑器。\n\n您可以插入数学公式：$E = mc^2$');

// 事件日志
const eventLog = ref<Array<{ time: string; name: string; data: string; type: string }>>([]);

// 添加事件日志
const addLog = (name: string, data: any = '', type: string = 'info') => {
  const time = new Date().toLocaleTimeString();
  eventLog.value.unshift({
    time,
    name,
    data: typeof data === 'object' ? JSON.stringify(data) : String(data),
    type
  });
  
  if (eventLog.value.length > 20) {
    eventLog.value = eventLog.value.slice(0, 20);
  }
};

// 清除日志
const clearLog = () => {
  eventLog.value = [];
};

// 事件处理器
const onEditorReady = () => addLog('ready', '', 'success');
const onEditorError = (error: Error) => addLog('error', error.message, 'error');
const onContentChange = (content: string) => addLog('change', `${content.length} 字符`, 'info');

// 生成代码
const generatedCode = computed(() => {
  const props: string[] = [];
  
  if (config.value.placeholder !== 'Enter your content...') {
    props.push(`  placeholder="${config.value.placeholder}"`);
  }
  if (config.value.theme !== 'light') {
    props.push(`  theme="${config.value.theme}"`);
  }
  if (!config.value.showToolbar) {
    props.push(`  :show-toolbar="false"`);
  }
  if (config.value.readonly) {
    props.push(`  :readonly="true"`);
  }
  if (config.value.autoFocus) {
    props.push(`  :auto-focus="true"`);
  }

  const propsString = props.length > 0 ? '\n' + props.join('\n') + '\n' : '';
  
  return `<VueMathjaxEditor${propsString}  v-model="content"
/>`;
});

// 复制代码到剪贴板
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(generatedCode.value);
    addLog('copy', '代码已复制到剪贴板', 'success');
  } catch (err) {
    console.error('Failed to copy code:', err);
    addLog('error', '复制失败', 'error');
  }
};
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