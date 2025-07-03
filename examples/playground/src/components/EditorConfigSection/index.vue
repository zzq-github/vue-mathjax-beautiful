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
      
      <div class="grid grid-cols-1 xl:grid-cols-5 gap-8">
        <!-- 配置面板 -->
        <div class="xl:col-span-2">
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <!-- 编辑器类型指示器 -->
            <div class="px-6 pt-4 pb-2">
              <div class="flex items-center gap-2 text-sm">
                <span class="text-gray-600 dark:text-gray-400">{{ t('editorConfig.modes.editorType') }}:</span>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                  {{ t('editorConfig.modes.richTextEditor') }}
                </span>
              </div>
            </div>
            
            <!-- 标签栏 -->
            <div class="border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50">
              <nav class="flex space-x-1 py-2 px-3">
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
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {{ t('editorConfig.basic.title') }}
                    </h4>
                    <span class="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                      {{ t('editorConfig.modes.universal') }}
                    </span>
                  </div>
                  
                  <div class="grid grid-cols-1 gap-4">
                    <div class="space-y-2">
                      <label class="text-sm text-gray-700 dark:text-gray-300">
                        {{ t('editorConfig.basic.placeholder') }}
                      </label>
                      <input 
                        v-model="config.placeholder" 
                        type="text" 
                        class="w-full px-3 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                      <div class="space-y-2">
                        <label class="text-sm text-gray-700 dark:text-gray-300">
                          {{ t('editorConfig.basic.minHeight') }}
                        </label>
                        <input 
                          v-model="config.minHeight" 
                          type="text" 
                          placeholder="300px" 
                          class="w-full px-3 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      
                      <div class="space-y-2">
                        <label class="text-sm text-gray-700 dark:text-gray-300">
                          {{ t('editorConfig.basic.width') }}
                        </label>
                        <input 
                          v-model="config.width" 
                          type="text" 
                          placeholder="100%" 
                          class="w-full px-3 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </div>
                    
                    <div class="space-y-2">
                      <label class="text-sm text-gray-700 dark:text-gray-300">
                        {{ t('editorConfig.basic.theme') }}
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
                          Light
                        </button>
                        <button
                          type="button"
                          @click="config.theme = 'dark'"
                          :class="[
                            'flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200',
                            config.theme === 'dark'
                              ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                          ]"
                        >
                          Dark
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 工具栏配置 -->
              <div v-if="activeTab === 'toolbar'" class="space-y-6">
                <!-- 工具栏开关 -->
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {{ t('editorConfig.modes.toolbarSettings') }}
                    </h4>
                    <span class="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                      {{ t('editorConfig.modes.universal') }}
                    </span>
                  </div>
                  
                  <div class="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg">
                    <div>
                      <span class="text-sm font-medium text-gray-900 dark:text-white">{{ t('editorConfig.toolbar.showToolbar') }}</span>
                                             <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{{ t('editorConfig.modes.showToolbarDesc') }}</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="config.showToolbar" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                
                <!-- 工具选择 -->
                <div v-if="config.showToolbar" class="space-y-4">
                                     <div class="flex items-center justify-between">
                     <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                       {{ t('editorConfig.toolbar.enabledTools') }}
                     </h4>
                     <span class="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                       {{ t('editorConfig.modes.universal') }}
                     </span>
                   </div>
                  
                  <div class="grid grid-cols-1 gap-3">
                    <div v-for="tool in availableTools" :key="tool.value" class="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg">
                      <div class="flex-1">
                        <div class="flex items-center gap-2">
                          <span class="text-sm font-medium text-gray-900 dark:text-white">{{ tool.label }}</span>
                          <span v-if="tool.category" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                                :class="getCategoryBadgeClass(tool.category)">
                            {{ t(`editorConfig.modes.categories.${tool.category}`) }}
                          </span>
                        </div>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{{ tool.description }}</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer ml-3">
                        <input 
                          type="checkbox" 
                          :value="tool.value"
                          v-model="config.enabledTools"
                          class="sr-only peer"
                        />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 功能配置 -->
              <div v-if="activeTab === 'features'" class="space-y-6">
                <!-- 格式功能 -->
                <div class="space-y-4">
                                     <div class="flex items-center justify-between">
                     <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                       {{ t('editorConfig.modes.formatFeatures') }}
                     </h4>
                     <span class="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                       {{ t('editorConfig.modes.universal') }}
                     </span>
                   </div>
                  
                  <div class="grid grid-cols-1 gap-3">
                    <div v-for="feature in formatFeatures" :key="feature.key" class="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg">
                      <div>
                        <span class="text-sm font-medium text-gray-900 dark:text-white">{{ feature.title }}</span>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{{ feature.description }}</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="config[feature.key as keyof typeof config]" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <!-- 高级功能 -->
                <div class="space-y-4">
                                     <div class="flex items-center justify-between">
                     <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                       {{ t('editorConfig.modes.advancedFeatures') }}
                     </h4>
                     <span class="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                       {{ t('editorConfig.modes.universal') }}
                     </span>
                   </div>
                  
                  <div class="grid grid-cols-1 gap-3">
                    <div v-for="feature in advancedFeatures" :key="feature.key" class="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg">
                      <div>
                        <span class="text-sm font-medium text-gray-900 dark:text-white">{{ feature.title }}</span>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{{ feature.description }}</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="config[feature.key as keyof typeof config]" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 限制配置 -->
              <div v-if="activeTab === 'limits'" class="space-y-6">
                <div class="space-y-4">
                                     <div class="flex items-center justify-between">
                     <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                       {{ t('editorConfig.limits.title') }}
                     </h4>
                     <span class="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                       {{ t('editorConfig.modes.universal') }}
                     </span>
                   </div>
                  
                  <div class="grid grid-cols-1 gap-4">
                    <div class="space-y-2">
                      <label class="text-sm text-gray-700 dark:text-gray-300">
                        {{ t('editorConfig.limits.maxLength') }}
                      </label>
                      <input 
                        v-model.number="config.maxLength" 
                        type="number"
                        min="0" 
                        class="w-full px-3 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    
                    <div class="space-y-2">
                      <label class="text-sm text-gray-700 dark:text-gray-300">
                        {{ t('editorConfig.limits.maxImageSize') }} (MB)
                      </label>
                      <input 
                        v-model.number="maxImageSizeMB" 
                        type="number"
                        min="0" 
                        step="0.1"
                        class="w-full px-3 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900 dark:text-gray-100"
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
            <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
              <div class="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-xl">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ t('editorConfig.preview.title') }}
                </h3>
                                 <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                   {{ t('editorConfig.modes.previewDescription') }}
                 </p>
              </div>
              
              <div class="p-6">
                <VueMathjaxEditor
                  v-model="demoContent"
                  v-bind="config"
                  @ready="onEditorReady"
                  @error="onEditorError"
                  @change="onContentChange"
                />
              </div>
            </div>
            
            <!-- 事件日志和代码生成 -->
            <div class="grid grid-cols-1 gap-6">
              <!-- 事件日志 -->
              <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                <div class="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-xl">
                  <div class="flex items-center justify-between">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">{{ t('editorConfig.events.title') }}</h4>
                    <button 
                      @click="clearLog" 
                      class="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg transition-colors"
                    >
                      {{ t('editorConfig.events.clear') }}
                    </button>
                  </div>
                </div>
                <div class="p-4">
                  <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 max-h-32 overflow-y-auto">
                                         <div v-if="eventLog.length === 0" class="text-sm text-gray-500 italic text-center py-2">
                       {{ t('editorConfig.modes.noEvents') }}
                     </div>
                    <div v-else class="space-y-1">
                      <div 
                        v-for="(event, index) in eventLog.slice(-5)" 
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
              
              <!-- 代码生成 -->
              <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                <div class="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-xl">
                  <div class="flex items-center justify-between">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">{{ t('editorConfig.code.title') }}</h4>
                    <button 
                      @click="copyCode" 
                      class="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                    >
                      {{ t('editorConfig.code.copy') }}
                    </button>
                  </div>
                </div>
                <div class="p-4">
                  <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">{{ generatedCode }}</pre>
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
  { 
    value: 'bold', 
    label: t('editorConfig.tools.bold'), 
    description: t('editorConfig.modes.descriptions.toolBold'),
    category: 'format' 
  },
  { 
    value: 'italic', 
    label: t('editorConfig.tools.italic'), 
    description: t('editorConfig.modes.descriptions.toolItalic'),
    category: 'format' 
  },
  { 
    value: 'underline', 
    label: t('editorConfig.tools.underline'), 
    description: t('editorConfig.modes.descriptions.toolUnderline'),
    category: 'format' 
  },
  { 
    value: 'strikethrough', 
    label: t('editorConfig.tools.strikethrough'), 
    description: t('editorConfig.modes.descriptions.toolStrikethrough'),
    category: 'format' 
  },
  { 
    value: 'formula', 
    label: t('editorConfig.tools.formula'), 
    description: t('editorConfig.modes.descriptions.toolFormula'),
    category: 'advanced' 
  },
  { 
    value: 'image', 
    label: t('editorConfig.tools.image'), 
    description: t('editorConfig.modes.descriptions.toolImage'),
    category: 'advanced' 
  },
  { 
    value: 'clear', 
    label: t('editorConfig.tools.clear'), 
    description: t('editorConfig.modes.descriptions.toolClear'),
    category: 'utility' 
  },
]);

// 格式功能列表
const formatFeatures = computed(() => [
  { key: 'enableBold', title: t('editorConfig.format.enableBold'), description: t('editorConfig.modes.descriptions.enableBold') },
  { key: 'enableItalic', title: t('editorConfig.format.enableItalic'), description: t('editorConfig.modes.descriptions.enableItalic') },
  { key: 'enableStrikethrough', title: t('editorConfig.format.enableStrikethrough'), description: t('editorConfig.modes.descriptions.enableStrikethrough') },
]);

// 高级功能列表
const advancedFeatures = computed(() => [
  { key: 'enableFormula', title: t('editorConfig.features.enableFormula'), description: t('editorConfig.modes.descriptions.enableFormula') },
  { key: 'enableImage', title: t('editorConfig.features.enableImage'), description: t('editorConfig.modes.descriptions.enableImage') },
  { key: 'readonly', title: t('editorConfig.features.readonly'), description: t('editorConfig.modes.descriptions.readonly') },
  { key: 'autoFocus', title: t('editorConfig.features.autoFocus'), description: t('editorConfig.modes.descriptions.autoFocus') },
]);

// 获取分类标签样式
const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case 'format':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
    case 'advanced':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
    case 'utility':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

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

// 图片大小MB计算属性
const maxImageSizeMB = computed({
  get: () => config.value.maxImageSize / (1024 * 1024),
  set: (value: number) => {
    config.value.maxImageSize = value * 1024 * 1024;
  }
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
  
  // 基础配置
  if (config.value.placeholder !== 'Enter your content...') {
    props.push(`  placeholder="${config.value.placeholder}"`);
  }
  if (config.value.minHeight !== '300px') {
    props.push(`  min-height="${config.value.minHeight}"`);
  }
  if (config.value.width !== '100%') {
    props.push(`  width="${config.value.width}"`);
  }
  if (config.value.theme !== 'light') {
    props.push(`  theme="${config.value.theme}"`);
  }
  
  // 工具栏配置
  if (!config.value.showToolbar) {
    props.push(`  :show-toolbar="false"`);
  }
  
  // 启用的工具（如果不是默认全部启用）
  const defaultTools = ['bold', 'italic', 'underline', 'strikethrough', 'formula', 'image', 'clear'];
  if (JSON.stringify(config.value.enabledTools.sort()) !== JSON.stringify(defaultTools.sort())) {
    props.push(`  :enabled-tools="['${config.value.enabledTools.join("', '")}']"`);
  }
  
  // 格式功能
  if (!config.value.enableBold) {
    props.push(`  :enable-bold="false"`);
  }
  if (!config.value.enableItalic) {
    props.push(`  :enable-italic="false"`);
  }
  if (!config.value.enableStrikethrough) {
    props.push(`  :enable-strikethrough="false"`);
  }
  
  // 高级功能
  if (!config.value.enableFormula) {
    props.push(`  :enable-formula="false"`);
  }
  if (!config.value.enableImage) {
    props.push(`  :enable-image="false"`);
  }
  
  // 行为设置
  if (config.value.readonly) {
    props.push(`  :readonly="true"`);
  }
  if (config.value.autoFocus) {
    props.push(`  :auto-focus="true"`);
  }
  
  // 限制设置
  if (config.value.maxLength !== 10000) {
    props.push(`  :max-length="${config.value.maxLength}"`);
  }
  if (config.value.maxImageSize !== 5242880) { // 5MB
    props.push(`  :max-image-size="${config.value.maxImageSize}"`);
  }

  const propsString = props.length > 0 ? '\n' + props.join('\n') + '\n' : '';
  
  return `<VueMathjaxEditor${propsString}  v-model="content"
  @ready="onEditorReady"
  @error="onEditorError"
  @change="onContentChange"
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