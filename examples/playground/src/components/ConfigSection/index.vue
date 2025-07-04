<template>
  <section id="config" class="py-16">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 dark:bg-emerald-900/80 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50 mb-6">
          <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span class="text-sm font-medium text-emerald-700 dark:text-emerald-300">{{ t('config.title') }}</span>
        </div>
        
        <h2 class="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
          {{ t('config.title') }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ t('config.description') }}
        </p>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-5 gap-8">
        <!-- 配置面板 -->
        <div class="xl:col-span-2">
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <!-- 模式指示器 -->
            <div class="px-6 pt-4 pb-2">
              <div class="flex items-center gap-2 text-sm">
                <span class="text-gray-600 dark:text-gray-400">{{ t('config.modes.current') }}:</span>
                <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border"
                      :class="config.inlineMode 
                        ? 'bg-green-100/80 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200/50 dark:border-green-700/50' 
                        : 'bg-blue-100/80 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200/50 dark:border-blue-700/50'">
                  {{ config.inlineMode ? t('config.inlineMode') : t('config.dialogMode') }}
                </span>
              </div>
            </div>
            
            <!-- 标签栏 -->
            <div class="border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <nav class="flex space-x-1 py-2 px-3">
                <button 
                  v-for="tab in configTabs"
                  :key="tab.key"
                  @click="activeTab = tab.key"
                  :class="[
                    'px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200',
                    activeTab === tab.key 
                      ? 'bg-white/90 dark:bg-gray-800/90 text-emerald-600 dark:text-emerald-400 shadow-sm ring-1 ring-emerald-600/10 dark:ring-emerald-400/10 backdrop-blur-sm' 
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
                <!-- 模式选择 -->
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {{ t('config.mode') }}
                    </label>
                    <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-600/50">
                      {{ t('config.modes.universal') }}
                    </span>
                  </div>
                  <div class="flex gap-2 p-1 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                    <button
                      type="button"
                      @click="config.inlineMode = false"
                      :class="[
                        'flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                        !config.inlineMode
                          ? 'bg-white/90 dark:bg-gray-800/90 text-blue-600 dark:text-blue-400 shadow-sm backdrop-blur-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      ]"
                    >
                      {{ t('config.dialogMode') }}
                    </button>
                    <button
                      type="button"
                      @click="config.inlineMode = true"
                      :class="[
                        'flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                        config.inlineMode
                          ? 'bg-white/90 dark:bg-gray-800/90 text-green-600 dark:text-green-400 shadow-sm backdrop-blur-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      ]"
                    >
                      {{ t('config.inlineMode') }}
                    </button>
                  </div>
                </div>

                <!-- 主题选择 -->
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {{ t('config.theme') }}
                    </label>
                    <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-600/50">
                      {{ t('config.modes.universal') }}
                    </span>
                  </div>
                  <div class="flex gap-2 p-1 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                    <button
                      type="button"
                      @click="config.theme = 'light'"
                      :class="[
                        'flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                        config.theme === 'light'
                          ? 'bg-white/90 dark:bg-gray-800/90 text-yellow-600 dark:text-yellow-400 shadow-sm backdrop-blur-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      ]"
                    >
                      {{ t('config.lightTheme') }}
                    </button>
                    <button
                      type="button"
                      @click="config.theme = 'dark'"
                      :class="[
                        'flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                        config.theme === 'dark'
                          ? 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 shadow-sm backdrop-blur-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      ]"
                    >
                      {{ t('config.darkTheme') }}
                    </button>
                  </div>
                </div>

                <!-- 弹窗专用文本设置 -->
                <div v-if="!config.inlineMode" class="space-y-4">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {{ t('config.textSettings') }}
                    </h4>
                    <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs bg-blue-100/80 dark:bg-blue-900/50 backdrop-blur-sm text-blue-800 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50">
                      {{ t('config.modes.dialogOnly') }}
                    </span>
                  </div>
                  <div class="grid grid-cols-1 gap-4">
                    <div class="space-y-2">
                      <label class="text-sm text-gray-700 dark:text-gray-300">
                        {{ t('config.textSettings') }}
                      </label>
                      <input
                        v-model="config.title"
                        type="text"
                        :placeholder="t('config.placeholders.title')"
                        class="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    
                    <div class="space-y-2">
                      <label class="text-sm text-gray-700 dark:text-gray-300">
                        {{ t('config.subtitle') }}
                      </label>
                      <input
                        v-model="config.subtitle"
                        type="text"
                        :placeholder="t('config.placeholders.subtitle')"
                        class="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- 显示选项 -->
              <div v-if="activeTab === 'display'" class="space-y-6">
                <!-- 界面功能开关 -->
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {{ t('config.features') }}
                    </h4>
                    <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-600/50">
                      {{ t('config.modes.universal') }}
                    </span>
                  </div>
                  
                  <div class="grid grid-cols-1 gap-3">
                    <div v-for="feature in featureList" :key="feature.key" class="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/30 backdrop-blur-sm rounded-xl border border-gray-200/30 dark:border-gray-600/30">
                      <div class="flex-1">
                        <div class="flex items-center gap-2">
                          <span class="text-sm font-medium text-gray-900 dark:text-white">{{ feature.label }}</span>
                          <span v-if="feature.mode" class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium backdrop-blur-sm border"
                                :class="feature.mode === 'dialog' 
                                  ? 'bg-blue-100/80 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200/50 dark:border-blue-700/50' 
                                  : 'bg-green-100/80 text-green-700 dark:bg-green-900/50 dark:text-green-300 border-green-200/50 dark:border-green-700/50'">
                            {{ feature.mode === 'dialog' ? t('config.modes.dialog') : t('config.modes.inline') }}
                          </span>
                        </div>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{{ feature.description }}</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer ml-3">
                        <input type="checkbox" v-model="config[feature.key as keyof typeof config]" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200/80 dark:bg-gray-600/80 backdrop-blur-sm peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 dark:peer-focus:ring-emerald-800/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600 shadow-sm"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- 符号分类 -->
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {{ t('config.enabledCategories') }}
                    </h4>
                    <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-600/50">
                      {{ t('config.modes.universal') }}
                    </span>
                  </div>
                  <div class="grid grid-cols-1 gap-3">
                    <div class="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/30 backdrop-blur-sm rounded-xl border border-gray-200/30 dark:border-gray-600/30">
                      <div>
                        <span class="text-sm font-medium text-gray-900 dark:text-white">{{ t('config.basicSymbols') }}</span>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{{ t('config.basicSymbolsDesc') }}</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="enabledBasic" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200/80 dark:bg-gray-600/80 backdrop-blur-sm peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 dark:peer-focus:ring-emerald-800/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600 shadow-sm"></div>
                      </label>
                    </div>
                    
                    <div class="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/30 backdrop-blur-sm rounded-xl border border-gray-200/30 dark:border-gray-600/30">
                      <div>
                        <span class="text-sm font-medium text-gray-900 dark:text-white">{{ t('config.greekLetters') }}</span>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{{ t('config.greekLettersDesc') }}</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="enabledGreek" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200/80 dark:bg-gray-600/80 backdrop-blur-sm peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 dark:peer-focus:ring-emerald-800/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600 shadow-sm"></div>
                      </label>
                    </div>
                    
                    <div class="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/30 backdrop-blur-sm rounded-xl border border-gray-200/30 dark:border-gray-600/30">
                      <div>
                        <span class="text-sm font-medium text-gray-900 dark:text-white">{{ t('config.advancedSymbols') }}</span>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{{ t('config.advancedSymbolsDesc') }}</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="enabledAdvanced" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200/80 dark:bg-gray-600/80 backdrop-blur-sm peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 dark:peer-focus:ring-emerald-800/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600 shadow-sm"></div>
                      </label>
                    </div>
                    
                    <div class="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/30 backdrop-blur-sm rounded-xl border border-gray-200/30 dark:border-gray-600/30">
                      <div>
                        <span class="text-sm font-medium text-gray-900 dark:text-white">{{ t('config.showFormulaExamples') }}</span>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{{ t('config.showFormulaExamplesDesc') }}</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="config.showFormulaExamples" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200/80 dark:bg-gray-600/80 backdrop-blur-sm peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 dark:peer-focus:ring-emerald-800/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600 shadow-sm"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 输入设置 -->
              <div v-if="activeTab === 'input'" class="space-y-6">
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {{ t('config.inputSettings') }}
                    </h4>
                    <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-600/50">
                      {{ t('config.modes.universal') }}
                    </span>
                  </div>
                  
                  <div class="grid grid-cols-1 gap-4">
                    <div class="space-y-2">
                      <label class="text-sm text-gray-700 dark:text-gray-300">
                        {{ t('config.placeholder') }}
                      </label>
                      <input
                        v-model="config.placeholder"
                        type="text"
                        :placeholder="t('config.placeholders.placeholder')"
                        class="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-900 dark:text-gray-100"
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
                          class="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      
                      <div class="space-y-2">
                        <div class="flex items-center gap-2">
                          <label class="text-sm text-gray-700 dark:text-gray-300">
                            {{ t('config.rows') }}
                          </label>
                          <span class="inline-flex items-center px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                            {{ t('config.modes.inlineOnly') }}
                          </span>
                        </div>
                        <input
                          v-model.number="config.rows"
                          type="number"
                          min="1"
                          max="10"
                          :disabled="!config.inlineMode"
                          class="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 弹窗专用按钮文本设置 -->
                <div v-if="!config.inlineMode" class="space-y-4">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {{ t('config.buttonTextSettings') }}
                    </h4>
                    <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs bg-blue-100/80 dark:bg-blue-900/50 backdrop-blur-sm text-blue-800 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50">
                      {{ t('config.modes.dialogOnly') }}
                    </span>
                  </div>
                  
                  <div class="grid grid-cols-1 gap-4">
                    <div class="space-y-2">
                      <label class="text-sm text-gray-700 dark:text-gray-300">
                        {{ t('config.insertButton') }}
                      </label>
                      <input
                        v-model="config.insertButtonText"
                        type="text"
                        :placeholder="t('config.placeholders.insertButton')"
                        class="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                      <div class="space-y-2">
                        <label class="text-sm text-gray-700 dark:text-gray-300">
                          {{ t('config.cancelButton') }}
                        </label>
                        <input
                          v-model="config.cancelButtonText"
                          type="text"
                          :placeholder="t('config.placeholders.cancelButton')"
                          class="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      
                      <div class="space-y-2">
                        <label class="text-sm text-gray-700 dark:text-gray-300">
                          {{ t('config.clearButton') }}
                        </label>
                        <input
                          v-model="config.clearButtonText"
                          type="text"
                          :placeholder="t('config.placeholders.clearButton')"
                          class="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 行为设置 -->
              <div v-if="activeTab === 'behavior'" class="space-y-6">
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {{ t('config.behaviorSettings') }}
                    </h4>
                    <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-600/50">
                      {{ t('config.modes.universal') }}
                    </span>
                  </div>
                  
                  <div class="grid grid-cols-1 gap-3">
                    <div class="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/30 backdrop-blur-sm rounded-xl border border-gray-200/30 dark:border-gray-600/30">
                      <div>
                        <span class="text-sm font-medium text-gray-900 dark:text-white">{{ t('config.readonly') }}</span>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{{ t('config.readonlyDesc') }}</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="config.readonly" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200/80 dark:bg-gray-600/80 backdrop-blur-sm peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 dark:peer-focus:ring-emerald-800/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600 shadow-sm"></div>
                      </label>
                    </div>
                    
                    <div class="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/30 backdrop-blur-sm rounded-xl border border-gray-200/30 dark:border-gray-600/30">
                      <div>
                        <span class="text-sm font-medium text-gray-900 dark:text-white">{{ t('config.autoFocus') }}</span>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{{ t('config.autoFocusDesc') }}</p>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" v-model="config.autoFocus" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200/80 dark:bg-gray-600/80 backdrop-blur-sm peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 dark:peer-focus:ring-emerald-800/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600 shadow-sm"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 演示区域 -->
        <div class="xl:col-span-3">
          <div class="sticky top-8 space-y-6">
            <!-- 预览面板 -->
            <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <div class="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-xl">
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
                    class="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-105"
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
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <div class="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-xl">
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
                        <span class="text-emerald-600 dark:text-emerald-400">[{{ event.time }}]</span>
                        <span class="text-green-600 dark:text-green-400 font-semibold">{{ event.type }}:</span>
                        {{ event.data }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 当前配置 -->
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <div class="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-xl">
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { VueMathjaxBeautiful } from 'vue-mathjax-beautiful';
import { useI18n } from '../../composables/useI18n';

const { t } = useI18n();

// 当前激活的标签页
const activeTab = ref('basic');

// 配置标签页
const configTabs = computed(() => [
  { key: 'basic', label: t('config.tabs.basic') },
  { key: 'display', label: t('config.tabs.display') },
  { key: 'input', label: t('config.tabs.input') },
  { key: 'behavior', label: t('config.tabs.behavior') },
]);

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
  { 
    key: 'showSymbols', 
    label: t('config.showSymbols'), 
    description: t('config.showSymbolsDesc'),
    mode: null
  },
  { 
    key: 'showPreview', 
    label: t('config.showPreview'), 
    description: t('config.showPreviewDesc'),
    mode: null
  },
  { 
    key: 'showThemeToggle', 
    label: t('config.showThemeToggle'), 
    description: t('config.showThemeToggleDesc'),
    mode: 'dialog'
  },
  { 
    key: 'showClearButton', 
    label: t('config.showClearButton'), 
    description: t('config.showClearButtonDesc'),
    mode: null
  },
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