<template>
  <div id="editor-config" class="section bg-gradient-to-br from-purple-50 to-blue-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-purple-900 transition-all duration-500">
    <div class="section-header">
      <h2 class="section-title text-gray-900 dark:text-white bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">{{ t('editorConfig.title') }}</h2>
      <p class="section-description text-gray-700 dark:text-gray-300">{{ t('editorConfig.description') }}</p>
    </div>
    
    <div class="config-container">
      <!-- 配置面板 -->
      <div class="config-panel bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl border border-purple-200/50 dark:border-purple-700/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
        <div class="config-tabs border-b border-purple-200/50 dark:border-purple-700/50 bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-900/20 dark:to-blue-900/20">
          <button 
            v-for="tab in configTabs"
            :key="tab.key"
            class="tab-button px-4 py-3 text-sm font-medium transition-all duration-200"
            :class="activeTab === tab.key 
              ? 'text-white bg-gradient-to-r from-purple-600 to-blue-600 border-b-2 border-transparent shadow-lg' 
              : 'text-gray-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50/50 dark:hover:bg-purple-900/30'"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>
        
        <div class="config-content p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
          <!-- 基础配置 -->
          <div v-if="activeTab === 'basic'" class="config-group space-y-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ t('editorConfig.basic.title') }}</h3>
            
            <div class="config-item space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.basic.placeholder') }}</label>
              <input 
                v-model="config.placeholder" 
                type="text" 
                class="w-full px-3 py-2 border border-purple-200 dark:border-purple-600 rounded-md shadow-sm bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-500"
              />
            </div>
            
            <div class="config-item space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.basic.minHeight') }}</label>
              <input 
                v-model="config.minHeight" 
                type="text" 
                placeholder="300px" 
                class="w-full px-3 py-2 border border-purple-200 dark:border-purple-600 rounded-md shadow-sm bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-500"
              />
            </div>
            
            <div class="config-item space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.basic.maxHeight') }}</label>
              <input 
                v-model="config.maxHeight" 
                type="text" 
                placeholder="none" 
                class="w-full px-3 py-2 border border-purple-200 dark:border-purple-600 rounded-md shadow-sm bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-500"
              />
            </div>
            
            <div class="config-item space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.basic.width') }}</label>
              <input 
                v-model="config.width" 
                type="text" 
                placeholder="100%" 
                class="w-full px-3 py-2 border border-purple-200 dark:border-purple-600 rounded-md shadow-sm bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-500"
              />
            </div>
            
            <div class="config-item space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.basic.borderRadius') }}</label>
              <input 
                v-model="config.borderRadius" 
                type="text" 
                placeholder="12px" 
                class="w-full px-3 py-2 border border-purple-200 dark:border-purple-600 rounded-md shadow-sm bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-500"
              />
            </div>
            
            <div class="config-item space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.basic.theme') }}</label>
              <select 
                v-model="config.theme"
                class="w-full px-3 py-2 border border-purple-200 dark:border-purple-600 rounded-md shadow-sm bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
          
          <!-- 工具栏配置 -->
          <div v-if="activeTab === 'toolbar'" class="config-group space-y-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ t('editorConfig.toolbar.title') }}</h3>
            
            <div class="config-item">
              <label class="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  v-model="config.showToolbar" 
                  class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                />
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.toolbar.showToolbar') }}</span>
              </label>
            </div>
            
            <div class="config-item space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.toolbar.position') }}</label>
              <select 
                v-model="config.toolbarPosition"
                class="w-full px-3 py-2 border border-purple-200 dark:border-purple-600 rounded-md shadow-sm bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-500"
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>
            
            <div class="config-item space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.toolbar.enabledTools') }}</label>
              <div class="checkbox-group grid grid-cols-2 lg:grid-cols-3 gap-3">
                <label v-for="tool in availableTools" :key="tool.value" class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    :value="tool.value"
                    v-model="config.enabledTools"
                    class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ tool.label }}</span>
                </label>
              </div>
            </div>
          </div>
          
          <!-- 格式功能 -->
          <div v-if="activeTab === 'format'" class="config-group space-y-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ t('editorConfig.format.title') }}</h3>
            
            <div class="space-y-4">
              <div class="config-item">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="config.enableBold" 
                    class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.format.enableBold') }}</span>
                </label>
              </div>
              
              <div class="config-item">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="config.enableItalic" 
                    class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.format.enableItalic') }}</span>
                </label>
              </div>
              
              <div class="config-item">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="config.enableUnderline" 
                    class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.format.enableUnderline') }}</span>
                </label>
              </div>
              
              <div class="config-item">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="config.enableStrikethrough" 
                    class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.format.enableStrikethrough') }}</span>
                </label>
              </div>
            </div>
          </div>
          
          <!-- 功能配置 -->
          <div v-if="activeTab === 'features'" class="config-group space-y-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ t('editorConfig.features.title') }}</h3>
            
            <div class="space-y-4">
              <div class="config-item">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="config.enableFormula" 
                    class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.features.enableFormula') }}</span>
                </label>
              </div>
              
              <div class="config-item">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="config.enableImage" 
                    class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.features.enableImage') }}</span>
                </label>
              </div>
              
              <div class="config-item">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="config.enableClearFormat" 
                    class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.features.enableClearFormat') }}</span>
                </label>
              </div>
              
              <div class="config-item">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="config.enableThemeToggle" 
                    class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.features.enableThemeToggle') }}</span>
                </label>
              </div>
              
              <div class="config-item">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="config.readonly" 
                    class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.features.readonly') }}</span>
                </label>
              </div>
              
              <div class="config-item">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="config.autoFocus" 
                    class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.features.autoFocus') }}</span>
                </label>
              </div>
              
              <div class="config-item">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="config.spellcheck" 
                    class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.features.spellcheck') }}</span>
                </label>
              </div>
              
              <div class="config-item">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="config.enableShortcuts" 
                    class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.features.enableShortcuts') }}</span>
                </label>
              </div>
            </div>
          </div>
          
          <!-- 限制配置 -->
          <div v-if="activeTab === 'limits'" class="config-group space-y-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ t('editorConfig.limits.title') }}</h3>
            
            <div class="config-item space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.limits.maxLength') }}</label>
              <input 
                v-model.number="config.maxLength" 
                type="number" 
                min="0" 
                class="w-full px-3 py-2 border border-purple-200 dark:border-purple-600 rounded-md shadow-sm bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-500"
              />
            </div>
            
            <div class="config-item space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.limits.maxImageSize') }}</label>
              <div class="flex items-center space-x-2">
                <input 
                  v-model.number="config.maxImageSize" 
                  type="number" 
                  min="0" 
                  class="flex-1 px-3 py-2 border border-purple-200 dark:border-purple-600 rounded-md shadow-sm bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-500"
                />
                <span class="text-sm text-gray-500 dark:text-gray-400">bytes</span>
              </div>
            </div>
            
            <div class="config-item space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.limits.allowedImageTypes') }}</label>
              <div class="checkbox-group grid grid-cols-2 gap-3">
                <label v-for="type in availableImageTypes" :key="type.value" class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    :value="type.value"
                    v-model="config.allowedImageTypes"
                    class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ type.label }}</span>
                </label>
              </div>
            </div>
          </div>
          
          <!-- 统计和保存 -->
          <div v-if="activeTab === 'stats'" class="config-group space-y-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ t('editorConfig.stats.title') }}</h3>
            
            <div class="space-y-4">
              <div class="config-item">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="config.showCharCount" 
                    class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.stats.showCharCount') }}</span>
                </label>
              </div>
              
              <div class="config-item">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="config.showWordCount" 
                    class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.stats.showWordCount') }}</span>
                </label>
              </div>
              
              <div class="config-item">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="config.enableAutoSave" 
                    class="w-4 h-4 text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 rounded focus:ring-purple-500 focus:ring-2 transition-all duration-200"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.stats.enableAutoSave') }}</span>
                </label>
              </div>
              
              <div class="config-item space-y-2" v-if="config.enableAutoSave">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('editorConfig.stats.autoSaveInterval') }}</label>
                <div class="flex items-center space-x-2">
                  <input 
                    v-model.number="config.autoSaveInterval" 
                    type="number" 
                    min="1000" 
                    step="1000" 
                    class="flex-1 px-3 py-2 border border-purple-200 dark:border-purple-600 rounded-md shadow-sm bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-500"
                  />
                  <span class="text-sm text-gray-500 dark:text-gray-400">ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 代码生成 -->
        <div class="code-section border-t border-purple-200/50 dark:border-purple-700/50 p-6 bg-gradient-to-r from-purple-50/30 to-blue-50/30 dark:from-purple-900/10 dark:to-blue-900/10">
          <h4 class="text-base font-semibold text-gray-900 dark:text-white mb-3">{{ t('editorConfig.code.title') }}</h4>
          <pre class="bg-gray-900/95 dark:bg-gray-800/95 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-purple-200/30 dark:border-purple-700/30 backdrop-blur-sm"><code>{{ generatedCode }}</code></pre>
          <button 
            @click="copyCode" 
            class="copy-btn mt-3 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm rounded-md transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {{ t('editorConfig.code.copy') }}
          </button>
        </div>
      </div>
      
      <!-- 预览面板 -->
      <div class="preview-panel bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl border border-purple-200/50 dark:border-purple-700/50 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">{{ t('editorConfig.preview.title') }}</h3>
        
        <!-- 编辑器预览 -->
        <div class="editor-preview mb-8">
          <VueMathjaxEditor
            v-model="demoContent"
            v-bind="config"
            @ready="onEditorReady"
            @error="onEditorError"
            @themeChange="onThemeChange"
            @formatToggle="onFormatToggle"
            @imageUpload="onImageUpload"
            @imageUploaded="onImageUploaded"
            @imageError="onImageError"
            @formulaInsert="onFormulaInsert"
            @save="onSave"
            @charLimitReached="onCharLimitReached"
            @wordCountChange="onWordCountChange"
            @charCountChange="onCharCountChange"
            @change="onContentChange"
            @focus="onFocus"
            @blur="onBlur"
          />
        </div>
        
        <!-- 事件日志 -->
        <div class="event-log">
          <h4 class="text-base font-semibold text-gray-900 dark:text-white mb-3">{{ t('editorConfig.events.title') }}</h4>
          <div class="log-content bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-purple-900/20 rounded-lg p-4 min-h-[120px] max-h-[200px] overflow-y-auto border border-purple-200/50 dark:border-purple-700/50 backdrop-blur-sm">
            <div 
              v-if="eventLog.length === 0" 
              class="text-sm text-gray-500 dark:text-gray-400 italic text-center py-8"
            >
              暂无事件
            </div>
            <div v-else class="space-y-2">
              <div 
                v-for="(event, index) in eventLog" 
                :key="index"
                class="log-item text-xs font-mono px-3 py-2 rounded backdrop-blur-sm"
                :class="{
                  'bg-blue-100/80 dark:bg-blue-900/40 border border-blue-200/50 dark:border-blue-700/50': event.type === 'info',
                  'bg-green-100/80 dark:bg-green-900/40 border border-green-200/50 dark:border-green-700/50': event.type === 'success',
                  'bg-yellow-100/80 dark:bg-yellow-900/40 border border-yellow-200/50 dark:border-yellow-700/50': event.type === 'warning',
                  'bg-red-100/80 dark:bg-red-900/40 border border-red-200/50 dark:border-red-700/50': event.type === 'error'
                }"
              >
                <span class="log-time text-gray-600 dark:text-gray-400 mr-2">{{ event.time }}</span>
                <span class="log-event font-semibold text-gray-800 dark:text-gray-200 mr-2">{{ event.name }}:</span>
                <span class="log-data text-gray-700 dark:text-gray-300">{{ event.data }}</span>
              </div>
            </div>
          </div>
          <button 
            @click="clearLog" 
            class="clear-log-btn mt-3 px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-xs rounded-md transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            {{ t('editorConfig.events.clear') }}
          </button>
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
  { key: 'format', label: t('editorConfig.tabs.format') },
  { key: 'features', label: t('editorConfig.tabs.features') },
  { key: 'limits', label: t('editorConfig.tabs.limits') },
  { key: 'stats', label: t('editorConfig.tabs.stats') },
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
  { value: 'theme', label: t('editorConfig.tools.theme') },
]);

// 可选图片类型
const availableImageTypes = computed(() => [
  { value: 'image/jpeg', label: 'JPEG' },
  { value: 'image/png', label: 'PNG' },
  { value: 'image/gif', label: 'GIF' },
  { value: 'image/webp', label: 'WebP' },
]);

// 编辑器配置
const config = ref({
  // 基础配置
  placeholder: '开始编写您的内容...',
  minHeight: '300px',
  maxHeight: 'none',
  width: '100%',
  borderRadius: '12px',
  theme: 'light' as 'light' | 'dark',
  
  // 工具栏配置
  showToolbar: true,
  toolbarPosition: 'top' as 'top' | 'bottom',
  enabledTools: ['bold', 'italic', 'underline', 'strikethrough', 'formula', 'image', 'clear', 'theme'],
  
  // 格式功能控制
  enableBold: true,
  enableItalic: true,
  enableUnderline: true,
  enableStrikethrough: true,
  
  // 插入功能控制
  enableFormula: true,
  enableImage: true,
  enableClearFormat: true,
  enableThemeToggle: true,
  
  // 编辑器行为配置
  readonly: false,
  autoFocus: false,
  spellcheck: true,
  maxLength: 10000,
  
  // 统计显示
  showCharCount: true,
  showWordCount: false,
  
  // 功能增强
  enableShortcuts: true,
  enableAutoSave: false,
  autoSaveInterval: 30000,
  
  // 上传配置
  maxImageSize: 5242880, // 5MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  
  // 自定义样式类
  customClass: '',
  toolbarClass: '',
  editorClass: '',
});

// 演示内容
const demoContent = ref('欢迎使用 **VueMathjaxEditor** 富文本编辑器！\n\n这是一个支持 *斜体*、__下划线__、~~删除线~~ 等格式的编辑器。\n\n您可以插入数学公式：$E = mc^2$\n\n还可以插入块级公式：$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$');

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
  
  // 限制日志数量
  if (eventLog.value.length > 50) {
    eventLog.value = eventLog.value.slice(0, 50);
  }
};

// 清除日志
const clearLog = () => {
  eventLog.value = [];
};

// 事件处理器
const onEditorReady = () => addLog('ready', '', 'success');
const onEditorError = (error: Error) => addLog('error', error.message, 'error');
const onThemeChange = (theme: string) => addLog('themeChange', theme, 'info');
const onFormatToggle = (format: string, active: boolean) => addLog('formatToggle', `${format}: ${active}`, 'info');
const onImageUpload = (file: File) => addLog('imageUpload', `${file.name} (${file.size} bytes)`, 'info');
const onImageUploaded = (url: string) => addLog('imageUploaded', url, 'success');
const onImageError = (error: string) => addLog('imageError', error, 'error');
const onFormulaInsert = (latex: string) => addLog('formulaInsert', latex, 'success');
const onSave = (content: string) => addLog('save', `${content.length} characters`, 'success');
const onCharLimitReached = () => addLog('charLimitReached', '', 'warning');
const onWordCountChange = (count: number) => addLog('wordCountChange', count, 'info');
const onCharCountChange = (count: number) => addLog('charCountChange', count, 'info');
const onContentChange = (content: string) => addLog('change', `${content.length} characters`, 'info');
const onFocus = () => addLog('focus', '', 'info');
const onBlur = () => addLog('blur', '', 'info');

// 生成代码
const generatedCode = computed(() => {
  const props: string[] = [];
  
  // 只添加非默认值的属性
  if (config.value.placeholder !== '开始编写您的内容...') {
    props.push(`  placeholder="${config.value.placeholder}"`);
  }
  if (config.value.minHeight !== '300px') {
    props.push(`  min-height="${config.value.minHeight}"`);
  }
  if (config.value.maxHeight !== 'none') {
    props.push(`  max-height="${config.value.maxHeight}"`);
  }
  if (config.value.width !== '100%') {
    props.push(`  width="${config.value.width}"`);
  }
  if (config.value.borderRadius !== '12px') {
    props.push(`  border-radius="${config.value.borderRadius}"`);
  }
  if (config.value.theme !== 'light') {
    props.push(`  theme="${config.value.theme}"`);
  }
  if (!config.value.showToolbar) {
    props.push(`  :show-toolbar="false"`);
  }
  if (config.value.toolbarPosition !== 'top') {
    props.push(`  toolbar-position="${config.value.toolbarPosition}"`);
  }
  if (JSON.stringify(config.value.enabledTools) !== JSON.stringify(['bold', 'italic', 'underline', 'strikethrough', 'formula', 'image', 'clear', 'theme'])) {
    props.push(`  :enabled-tools="[${config.value.enabledTools.map(t => `'${t}'`).join(', ')}]"`);
  }
  if (!config.value.enableBold) {
    props.push(`  :enable-bold="false"`);
  }
  if (!config.value.enableItalic) {
    props.push(`  :enable-italic="false"`);
  }
  if (!config.value.enableUnderline) {
    props.push(`  :enable-underline="false"`);
  }
  if (!config.value.enableStrikethrough) {
    props.push(`  :enable-strikethrough="false"`);
  }
  if (!config.value.enableFormula) {
    props.push(`  :enable-formula="false"`);
  }
  if (!config.value.enableImage) {
    props.push(`  :enable-image="false"`);
  }
  if (!config.value.enableClearFormat) {
    props.push(`  :enable-clear-format="false"`);
  }
  if (!config.value.enableThemeToggle) {
    props.push(`  :enable-theme-toggle="false"`);
  }
  if (config.value.readonly) {
    props.push(`  :readonly="true"`);
  }
  if (config.value.autoFocus) {
    props.push(`  :auto-focus="true"`);
  }
  if (!config.value.spellcheck) {
    props.push(`  :spellcheck="false"`);
  }
  if (config.value.maxLength !== 10000) {
    props.push(`  :max-length="${config.value.maxLength}"`);
  }
  if (!config.value.showCharCount) {
    props.push(`  :show-char-count="false"`);
  }
  if (config.value.showWordCount) {
    props.push(`  :show-word-count="true"`);
  }
  if (!config.value.enableShortcuts) {
    props.push(`  :enable-shortcuts="false"`);
  }
  if (config.value.enableAutoSave) {
    props.push(`  :enable-auto-save="true"`);
  }
  if (config.value.autoSaveInterval !== 30000) {
    props.push(`  :auto-save-interval="${config.value.autoSaveInterval}"`);
  }

  const propsString = props.length > 0 ? '\n' + props.join('\n') + '\n' : '';
  
  return `<VueMathjaxEditor${propsString}  v-model="content"
/>`;
});

// 复制代码到剪贴板
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(generatedCode.value);
    // 这里可以添加成功提示
  } catch (err) {
    console.error('Failed to copy code:', err);
  }
};
</script>

<style scoped>
.section {
  padding: 4rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.125rem;
  max-width: 3xl;
  margin: 0 auto;
}

.config-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 7xl;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (max-width: 1024px) {
  .config-container {
    grid-template-columns: 1fr;
  }
}

.config-panel {
  max-height: 80vh;
  overflow-y: auto;
}

.config-tabs {
  display: flex;
  flex-wrap: wrap;
}

.tab-button {
  border: none;
  background: none;
  cursor: pointer;
  white-space: nowrap;
}

.config-content {
  max-height: calc(80vh - 60px);
  overflow-y: auto;
}

.config-group h3 {
  margin-bottom: 1.5rem;
}

.config-item {
  margin-bottom: 1rem;
}

.checkbox-group {
  display: grid;
  gap: 0.75rem;
}

.code-section {
  margin-top: 2rem;
}

.preview-panel {
  position: sticky;
  top: 2rem;
  max-height: 80vh;
  overflow-y: auto;
}

.event-log {
  margin-top: 2rem;
}

.log-content {
  font-family: 'Courier New', Courier, monospace;
}

.log-item {
  font-size: 0.75rem;
  line-height: 1.4;
}

/* 滚动条样式 */
.config-panel::-webkit-scrollbar,
.preview-panel::-webkit-scrollbar,
.log-content::-webkit-scrollbar {
  width: 6px;
}

.config-panel::-webkit-scrollbar-track,
.preview-panel::-webkit-scrollbar-track,
.log-content::-webkit-scrollbar-track {
  background: transparent;
}

.config-panel::-webkit-scrollbar-thumb,
.preview-panel::-webkit-scrollbar-thumb,
.log-content::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #c084fc, #a855f7);
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(168, 85, 247, 0.2);
}

.config-panel::-webkit-scrollbar-thumb:hover,
.preview-panel::-webkit-scrollbar-thumb:hover,
.log-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #a855f7, #9333ea);
  box-shadow: 0 2px 6px rgba(168, 85, 247, 0.3);
}

/* 暗色主题滚动条 */
.dark .config-panel::-webkit-scrollbar-thumb,
.dark .preview-panel::-webkit-scrollbar-thumb,
.dark .log-content::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #7c3aed, #6b21a8);
  box-shadow: 0 1px 3px rgba(124, 58, 237, 0.3);
}

.dark .config-panel::-webkit-scrollbar-thumb:hover,
.dark .preview-panel::-webkit-scrollbar-thumb:hover,
.dark .log-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #8b5cf6, #7c3aed);
  box-shadow: 0 2px 6px rgba(139, 92, 246, 0.4);
}
</style>