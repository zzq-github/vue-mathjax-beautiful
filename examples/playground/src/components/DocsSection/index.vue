<template>
  <section id="docs" class="py-20 relative min-h-screen">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/80 dark:bg-indigo-900/80 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-700/50 mb-6">
          <div class="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
          <span class="text-sm font-medium text-indigo-700 dark:text-indigo-300">{{ t('docs.title') }}</span>
        </div>
        
        <h2 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent sm:text-4xl mb-4">
          {{ t('docs.title') }}
        </h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300 max-w-3xl mx-auto">
          {{ t('docs.description') }}
        </p>
      </div>

      <!-- 移动端快速导航 -->
      <div class="lg:hidden mb-8">
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-4">
          <h3 class="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white mb-3">
            <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
            {{ t('docs.toc.title') }}
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              v-for="item in tocItems"
              :key="`mobile-${item.id}`"
              @click="scrollToSection(item.id)"
              :class="[
                'flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-200 text-left',
                activeSection === item.id
                  ? 'bg-indigo-100/80 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50/50 dark:hover:bg-gray-700/30'
              ]"
            >
              <component :is="item.icon" class="h-3 w-3 flex-shrink-0" />
              <span class="text-xs truncate">{{ t(`toc.${item.id}`) }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="grid gap-8 lg:grid-cols-12 relative items-start">
        <!-- 文档内容 -->
        <div class="col-span-12 order-2 lg:order-1 lg:pr-20">
      <div class="grid gap-8 lg:grid-cols-1">
        <!-- 安装说明 -->
            <div id="install" class="lg:col-span-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300">
              <h3 class="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-sm">
                  <CodeIcon class="h-4 w-4" />
                </div>
            {{ t('docs.sections.installation.title') }}
          </h3>
              
              <div class="grid md:grid-cols-2 gap-6">
                <!-- 包管理器安装 -->
                <div class="space-y-4">
                  <h4 class="font-semibold text-blue-800 dark:text-blue-300 text-base mb-4">{{ t('docs.sections.installation.packageManagers') }}</h4>
                  
                  <div class="space-y-3">
                    <div>
                      <div class="flex items-center gap-2 mb-2">
                        <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">NPM</span>
                      </div>
                      <div class="bg-gray-900/90 dark:bg-gray-950/90 backdrop-blur-sm text-gray-100 dark:text-gray-200 p-3 rounded-lg font-mono text-sm transition-colors duration-300 border border-gray-700/50">
                        npm install vue-mathjax-beautiful
                      </div>
                    </div>
                    
                    <div>
                      <div class="flex items-center gap-2 mb-2">
                        <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Yarn</span>
                      </div>
                      <div class="bg-gray-900/90 dark:bg-gray-950/90 backdrop-blur-sm text-gray-100 dark:text-gray-200 p-3 rounded-lg font-mono text-sm transition-colors duration-300 border border-gray-700/50">
                        yarn add vue-mathjax-beautiful
                      </div>
                    </div>
                    
                    <div>
                      <div class="flex items-center gap-2 mb-2">
                        <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">PNPM</span>
                      </div>
                      <div class="bg-gray-900/90 dark:bg-gray-950/90 backdrop-blur-sm text-gray-100 dark:text-gray-200 p-3 rounded-lg font-mono text-sm transition-colors duration-300 border border-gray-700/50">
                        pnpm add vue-mathjax-beautiful
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 系统要求和快速导入 -->
                <div class="space-y-4">
                  <h4 class="font-semibold text-blue-800 dark:text-blue-300 text-base mb-4">{{ t('docs.sections.installation.requirements') }}</h4>
                
                  <!-- 快速导入 -->
                  <div>
                    <div class="flex items-center gap-2 mb-3">
                      <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('docs.sections.installation.quickImport') }}</span>
                    </div>
                    <div class="bg-gray-900/90 dark:bg-gray-950/90 backdrop-blur-sm text-gray-100 dark:text-gray-200 p-3 rounded-lg font-mono text-xs transition-colors duration-300 border border-gray-700/50">
                      <div class="text-purple-400">import { VueMathjaxBeautiful } from 'vue-mathjax-beautiful'</div>
                      <div class="text-purple-400">import 'vue-mathjax-beautiful/dist/style.css'</div>
                    </div>
                  </div>

                  <!-- CDN 选项 -->
                  <div>
                    <div class="flex items-center gap-2 mb-3">
                      <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('docs.sections.installation.cdn') }}</span>
                    </div>
                    <div class="bg-gray-900/90 dark:bg-gray-950/90 backdrop-blur-sm text-gray-100 dark:text-gray-200 p-3 rounded-lg font-mono text-xs transition-colors duration-300 border border-gray-700/50">
                      <div class="text-green-400">&lt;script src="https://unpkg.com/vue-mathjax-beautiful"&gt;&lt;/script&gt;</div>
                    </div>
                  </div>

                  <!-- 本地 MathJax 引入 -->
                  <div>
                    <div class="flex items-center gap-2 mb-3">
                      <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('docs.sections.installation.localMathjaxTitle') }}</span>
                    </div>
                    <div class="bg-white/80 dark:bg-gray-900/40 backdrop-blur-sm text-gray-700 dark:text-gray-200 p-4 rounded-lg text-xs transition-colors duration-300 border border-gray-200/60 dark:border-gray-700/60 space-y-2">
                      <p class="text-gray-600 dark:text-gray-300">{{ t('docs.sections.installation.localMathjaxDesc') }}</p>
                      <ol class="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-200">
                        <li>{{ t('docs.sections.installation.localMathjaxStep1') }}</li>
                        <li>{{ t('docs.sections.installation.localMathjaxStep2') }}</li>
                        <li>{{ t('docs.sections.installation.localMathjaxStep3') }}</li>
                      </ol>
                      <div class="bg-gray-900/90 dark:bg-gray-950/90 text-gray-100 dark:text-gray-200 p-2 rounded font-mono text-[11px] border border-gray-700/50">
                        &lt;script src="/mathjax/tex-svg.js"&gt;&lt;/script&gt;
                      </div>
                      <p class="text-[11px] text-amber-600 dark:text-amber-300">{{ t('docs.sections.installation.localMathjaxTip') }}</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          <!-- 基本使用 -->
          <div id="basicUsage" class="lg:col-span-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300">
              <h3 class="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-sm">
                  <ZapIcon class="h-4 w-4" />
                </div>
                {{ t('docs.sections.basicUsage.title') }}
          </h3>

        <!-- 完整集成示例 -->
              <div class="space-y-6">
        <!-- Vue 3 组合式API示例 -->
                <div>
                  <h4 class="font-semibold text-green-800 dark:text-green-300 mb-3 text-base">{{ t('docs.sections.integrationExample.composition') }}</h4>
                  <div class="bg-gray-900/90 dark:bg-gray-950/90 backdrop-blur-sm text-gray-100 dark:text-gray-200 p-4 rounded-xl font-mono text-sm transition-colors duration-300 border border-gray-700/50 overflow-x-auto">
              <div class="text-blue-400">&lt;template&gt;</div>
              <div class="ml-2 text-green-400">&lt;div class="math-editor-container"&gt;</div>
              <div class="ml-4 text-gray-400">&lt;!-- Formula Editor --&gt;</div>
              <div class="ml-4 text-green-400">&lt;VueMathjaxBeautiful</div>
              <div class="ml-6 text-yellow-400">v-model="showFormulaDialog"</div>
              <div class="ml-6 text-yellow-400">:existing-latex="selectedFormula"</div>
                    <div class="ml-6 text-yellow-400">title="公式编辑器"</div>
              <div class="ml-6 text-yellow-400">@insert="handleFormulaInsert"</div>
              <div class="ml-6 text-yellow-400">@cancel="handleCancel"</div>
              <div class="ml-4 text-green-400">/&gt;</div>
              <div class="ml-2 text-green-400">&lt;/div&gt;</div>
              <div class="text-blue-400">&lt;/template&gt;</div>
                  </div>
                </div>

                <!-- JavaScript 部分 -->
                <div>
                  <h4 class="font-semibold text-green-800 dark:text-green-300 mb-3 text-base">{{ t('docs.sections.integrationExample.scriptSetup') }}</h4>
                  <div class="bg-gray-900/90 dark:bg-gray-950/90 backdrop-blur-sm text-gray-100 dark:text-gray-200 p-4 rounded-xl font-mono text-sm transition-colors duration-300 border border-gray-700/50 overflow-x-auto">
              <div class="text-blue-400">&lt;script setup lang="ts"&gt;</div>
              <div class="text-purple-400">import { ref, onMounted } from 'vue'</div>
              <div class="text-purple-400">import {</div>
              <div class="ml-2 text-purple-400">VueMathjaxBeautiful,</div>
                    <div class="ml-2 text-purple-400">initMathJax</div>
              <div class="text-purple-400">} from 'vue-mathjax-beautiful'</div>
              <div class="text-purple-400">import 'vue-mathjax-beautiful/dist/style.css'</div>
              <br />
              <div class="text-gray-400">// 响应式数据</div>
              <div class="text-white">const showFormulaDialog = ref(false)</div>
              <div class="text-white">const selectedFormula = ref('')</div>
              <br />
              <div class="text-gray-400">// 初始化MathJax</div>
              <div class="text-yellow-400">onMounted(async () => {</div>
              <div class="ml-2 text-white">await initMathJax()</div>
              <div class="text-yellow-400">})</div>
              <br />
              <div class="text-gray-400">// 事件处理函数</div>
              <div class="text-yellow-400">const handleFormulaInsert = (latex: string) => {</div>
              <div class="ml-2 text-white">console.log('插入公式:', latex)</div>
                    <div class="ml-2 text-white">showFormulaDialog.value = false</div>
                    <div class="text-yellow-400">}</div>
                    <br />
                    <div class="text-yellow-400">const handleCancel = () => {</div>
              <div class="ml-2 text-white">showFormulaDialog.value = false</div>
              <div class="text-yellow-400">}</div>
              <div class="text-blue-400">&lt;/script&gt;</div>
            </div>
          </div>

          <!-- 工具函数使用示例 -->
          <div>
                  <h4 class="font-semibold text-green-800 dark:text-green-300 mb-3 text-base">{{ t('docs.sections.integrationExample.utilityFunctions') }}</h4>
                  <div class="bg-gray-900/90 dark:bg-gray-950/90 backdrop-blur-sm text-gray-100 dark:text-gray-200 p-4 rounded-xl font-mono text-sm transition-colors duration-300 border border-gray-700/50 overflow-x-auto">
              <div class="text-gray-400">// 检测和处理LaTeX公式</div>
                    <div class="text-purple-400">import { matchLatex, hasLatexFormula, convertLatexToSvg } from 'vue-mathjax-beautiful'</div>
              <br />
              <div class="text-white">const text = '这是一个公式: $E=mc^2$ 和另一个: $$\\int_0^1 x dx$$'</div>
              <br />
              <div class="text-gray-400">// 检测是否包含公式</div>
              <div class="text-white">if (hasLatexFormula(text)) {</div>
              <div class="ml-2 text-gray-400">// 获取所有公式匹配信息</div>
              <div class="ml-2 text-white">const matches = matchLatex(text)</div>
              <div class="ml-2 text-white">matches.forEach(match => {</div>
                    <div class="ml-4 text-white">console.log('公式:', match.content)</div>
                    <div class="ml-4 text-white">console.log('类型:', match.isInline ? '行内' : '块级')</div>
              <div class="ml-2 text-white">})</div>
                    <br />
                    <div class="ml-2 text-gray-400">// 转换公式为SVG</div>
                    <div class="ml-2 text-white">const svgResult = await convertLatexToSvg('E=mc^2')</div>
              <div class="text-white">}</div>
                  </div>
                </div>

                <!-- 常用配置 -->
                <div>
                  <h4 class="font-semibold text-green-800 dark:text-green-300 mb-3 text-base">{{ t('docs.sections.basicUsage.commonConfig') }}</h4>
                  <div class="grid md:grid-cols-2 gap-4 text-sm">
                    <div class="p-4 bg-emerald-50/80 dark:bg-emerald-900/40 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50 rounded-xl transition-colors duration-300">
                      <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong class="text-emerald-900 dark:text-emerald-200 transition-colors duration-300">{{ t('docs.sections.basicUsage.configs.minimalSetup') }}</strong>
                          <p class="text-emerald-700 dark:text-emerald-300 mt-1 transition-colors duration-300 font-mono text-xs">
                            &lt;VueMathjaxBeautiful :inline-mode="true" /&gt;
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="p-4 bg-blue-50/80 dark:bg-blue-900/40 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 rounded-xl transition-colors duration-300">
                      <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong class="text-blue-900 dark:text-blue-200 transition-colors duration-300">{{ t('docs.sections.basicUsage.configs.customTheme') }}</strong>
                          <p class="text-blue-700 dark:text-blue-300 mt-1 transition-colors duration-300 font-mono text-xs">
                            :theme="'dark'"
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="p-4 bg-purple-50/80 dark:bg-purple-900/40 backdrop-blur-sm border border-purple-200/50 dark:border-purple-800/50 rounded-xl transition-colors duration-300">
                      <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong class="text-purple-900 dark:text-purple-200 transition-colors duration-300">{{ t('docs.sections.basicUsage.configs.existingLatex') }}</strong>
                          <p class="text-purple-700 dark:text-purple-300 mt-1 transition-colors duration-300 font-mono text-xs">
                            :existing-latex="'E=mc^2'"
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="p-4 bg-orange-50/80 dark:bg-orange-900/40 backdrop-blur-sm border border-orange-200/50 dark:border-orange-800/50 rounded-xl transition-colors duration-300">
                      <div class="flex items-start gap-3">
                        <div class="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <strong class="text-orange-900 dark:text-orange-200 transition-colors duration-300">{{ t('docs.sections.basicUsage.configs.inlineDialog') }}</strong>
                          <p class="text-orange-700 dark:text-orange-300 mt-1 transition-colors duration-300 font-mono text-xs">
                            :inline-mode="true"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 组件介绍 -->
          <div id="coreComponents" class="mt-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300">
              <h3 class="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-sm">
                  <CalculatorIcon class="h-4 w-4" />
                </div>
                {{ t('docs.sections.coreComponents.title') }}
              </h3>
              <div class="grid md:grid-cols-2 gap-4 text-sm">
                <div class="p-4 bg-purple-50/80 dark:bg-purple-900/40 backdrop-blur-sm border border-purple-200/50 dark:border-purple-800/50 rounded-xl transition-colors duration-300">
                  <div class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong class="text-purple-900 dark:text-purple-200 transition-colors duration-300">{{ t('docs.sections.coreComponents.beautiful.title') }}</strong>
                      <p class="text-purple-700 dark:text-purple-300 mt-1 transition-colors duration-300">
                        {{ t('docs.sections.coreComponents.beautiful.description') }}
                      </p>
                    </div>
                  </div>
                </div>
                <!-- <div class="p-4 bg-blue-50/80 dark:bg-blue-900/40 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 rounded-xl transition-colors duration-300">
                  <div class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong class="text-blue-900 dark:text-blue-200 transition-colors duration-300">{{ t('docs.sections.coreComponents.editor.title') }}</strong>
                      <p class="text-blue-700 dark:text-blue-300 mt-1 transition-colors duration-300">
                        {{ t('docs.sections.coreComponents.editor.description') }}
                      </p>
                    </div>
                  </div>
            </div> -->
          </div>
        </div>

          <!-- VueMathjaxBeautiful API -->
          <div id="beautifulApi" class="mt-8 rounded-2xl bg-gradient-to-br from-purple-50/80 to-blue-50/80 dark:from-purple-900/40 dark:to-blue-900/40 backdrop-blur-sm p-6 shadow-xl border border-purple-200/50 dark:border-purple-800/50 transition-colors duration-300">
            <h3 class="flex items-center gap-3 text-lg font-semibold text-purple-900 dark:text-purple-200 mb-6 transition-colors duration-300">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-sm">
                <CalculatorIcon class="h-4 w-4" />
              </div>
              {{ t('docs.sections.vueMathjaxBeautifulApi.title') }}
          </h3>
          <div class="grid md:grid-cols-2 gap-6 text-sm">
              <!-- 基础属性 -->
            <div class="space-y-4">
                <h4 class="font-semibold text-purple-800 dark:text-purple-300 text-base">{{ t('docs.sections.vueMathjaxBeautifulApi.basicProps') }}</h4>
                <div class="space-y-3">
                  <div class="border-l-4 border-purple-500 pl-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-r-lg">
                    <div class="font-mono font-semibold text-gray-900 dark:text-white">v-model (boolean)</div>
                    <div class="text-gray-600 dark:text-gray-400 text-xs mt-1">{{ t('docs.sections.vueMathjaxBeautifulApi.props.modelValue') }}</div>
                  </div>
                  <div class="border-l-4 border-blue-500 pl-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-r-lg">
                    <div class="font-mono font-semibold text-gray-900 dark:text-white">title (string)</div>
                    <div class="text-gray-600 dark:text-gray-400 text-xs mt-1">{{ t('docs.sections.vueMathjaxBeautifulApi.props.title') }}</div>
                  </div>
                  <div class="border-l-4 border-green-500 pl-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-r-lg">
                    <div class="font-mono font-semibold text-gray-900 dark:text-white">subtitle (string)</div>
                    <div class="text-gray-600 dark:text-gray-400 text-xs mt-1">{{ t('docs.sections.vueMathjaxBeautifulApi.props.subtitle') }}</div>
                  </div>
                  <div class="border-l-4 border-orange-500 pl-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-r-lg">
                    <div class="font-mono font-semibold text-gray-900 dark:text-white">placeholder (string)</div>
                    <div class="text-gray-600 dark:text-gray-400 text-xs mt-1">{{ t('docs.sections.vueMathjaxBeautifulApi.props.placeholder') }}</div>
                  </div>
                </div>
              </div>
              <!-- 行为属性 -->
              <div class="space-y-4">
                <h4 class="font-semibold text-purple-800 dark:text-purple-300 text-base">{{ t('docs.sections.vueMathjaxBeautifulApi.behaviorProps') }}</h4>
                <div class="space-y-3">
                  <div class="border-l-4 border-red-500 pl-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-r-lg">
                    <div class="font-mono font-semibold text-gray-900 dark:text-white">inline-mode (boolean)</div>
                    <div class="text-gray-600 dark:text-gray-400 text-xs mt-1">{{ t('docs.sections.vueMathjaxBeautifulApi.props.inlineMode') }}</div>
                  </div>
                  <div class="border-l-4 border-indigo-500 pl-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-r-lg">
                    <div class="font-mono font-semibold text-gray-900 dark:text-white">existing-latex (string)</div>
                    <div class="text-gray-600 dark:text-gray-400 text-xs mt-1">{{ t('docs.sections.vueMathjaxBeautifulApi.props.existingLatex') }}</div>
                  </div>
                  <div class="border-l-4 border-pink-500 pl-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-r-lg">
                    <div class="font-mono font-semibold text-gray-900 dark:text-white">show-theme-toggle (boolean)</div>
                    <div class="text-gray-600 dark:text-gray-400 text-xs mt-1">{{ t('docs.sections.vueMathjaxBeautifulApi.props.showThemeToggle') }}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 事件 -->
            <div class="mt-8 pt-6 border-t border-purple-200/50 dark:border-purple-700/50">
              <h4 class="font-semibold text-purple-800 dark:text-purple-300 mb-4 text-base">{{ t('docs.sections.vueMathjaxBeautifulApi.events') }}</h4>
              <div class="grid md:grid-cols-2 gap-4 text-sm">
                <div class="border-l-4 border-green-500 pl-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-r-lg">
                  <div class="font-mono font-semibold text-gray-900 dark:text-white">@insert</div>
                  <div class="text-gray-600 dark:text-gray-400 text-xs mt-1">{{ t('docs.sections.vueMathjaxBeautifulApi.eventDesc.insert') }}</div>
                </div>
                <div class="border-l-4 border-red-500 pl-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-r-lg">
                  <div class="font-mono font-semibold text-gray-900 dark:text-white">@cancel</div>
                  <div class="text-gray-600 dark:text-gray-400 text-xs mt-1">{{ t('docs.sections.vueMathjaxBeautifulApi.eventDesc.cancel') }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- VueMathjaxEditor API - 暂时隐藏 -->
          <!-- <div id="editorApi" class="mt-8 rounded-2xl bg-gradient-to-br from-green-50/80 to-teal-50/80 dark:from-green-900/40 dark:to-teal-900/40 backdrop-blur-sm p-6 shadow-xl border border-green-200/50 dark:border-green-800/50 transition-colors duration-300">
            ... VueMathjaxEditor API 内容 ...
          </div> -->

          <!-- 示例和最佳实践 -->
          <div id="examples" class="mt-8 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-900/40 dark:to-orange-900/40 backdrop-blur-sm p-6 shadow-xl border border-amber-200/50 dark:border-amber-800/50 transition-colors duration-300">
            <h3 class="flex items-center gap-3 text-lg font-semibold text-amber-900 dark:text-amber-200 mb-6 transition-colors duration-300">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-sm">
                <BookOpenIcon class="h-4 w-4" />
              </div>
              {{ t('docs.sections.examples.title') }}
            </h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <h4 class="font-semibold text-amber-800 dark:text-amber-300">{{ t('docs.sections.examples.commonUsage') }}</h4>
                <div class="bg-gray-900/90 dark:bg-gray-950/90 backdrop-blur-sm text-gray-100 dark:text-gray-200 p-4 rounded-xl font-mono text-sm border border-gray-700/50">
                  <div class="text-green-400">// {{ t('docs.sections.examples.inlineUsage') }}</div>
                  <div>&lt;VueMathjaxBeautiful :inline-mode="true" /&gt;</div>
                  <br />
                  <div class="text-green-400">// {{ t('docs.sections.examples.dialogUsage') }}</div>
                  <div>&lt;VueMathjaxBeautiful :inline-mode="false" /&gt;</div>
                </div>
              </div>
              <div class="space-y-4">
                <h4 class="font-semibold text-amber-800 dark:text-amber-300">{{ t('docs.sections.examples.bestPractices') }}</h4>
                <ul class="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                  <li class="flex items-start gap-2">
                    <div class="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{{ t('docs.sections.examples.practice1') }}</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{{ t('docs.sections.examples.practice2') }}</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{{ t('docs.sections.examples.practice3') }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 目录导航 - 右侧边栏 -->
        <!-- 浮动右侧导航栏 -->
        <div
          class="hidden lg:block fixed z-30"
          style="top: 6rem; right: 1rem; width: 16rem; max-height: 80vh;"
        >
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-4 overflow-y-auto">
            <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
              <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
              {{ t('docs.toc.title') }}
            </h3>
            <nav class="space-y-2">
              <a
                v-for="item in tocItems"
                :key="item.id"
                :href="`#${item.id}`"
                @click.prevent="scrollToSection(item.id)"
                :class="[
                  'block px-3 py-2 text-sm rounded-lg transition-all duration-200',
                  activeSection === item.id
                    ? 'bg-indigo-100/80 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border-l-2 border-indigo-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50/50 dark:hover:bg-gray-700/30'
                ]"
              >
                <div class="flex items-center gap-2">
                  <component :is="item.icon" class="h-4 w-4 flex-shrink-0" />
                  <span class="truncate">{{ t(`docs.toc.${item.id}`) }}</span>
                </div>
              </a>
            </nav>
            <!-- 快速链接 -->
            <div class="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{{ t('docs.toc.quickLinks') }}</h4>
              <div class="space-y-2">
                <a
                  href="https://github.com/zzq-github/vue-mathjax-beautiful"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 rounded-lg transition-all duration-200"
                >
                  <GithubIcon class="h-4 w-4" />
                  <span>{{ t('docs.toc.github') }}</span>
                  <ExternalLinkIcon class="h-3 w-3 ml-auto" />
                </a>
                <a
                  href="https://www.npmjs.com/package/vue-mathjax-beautiful"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 rounded-lg transition-all duration-200"
                >
                  <PackageIcon class="h-4 w-4" />
                  <span>{{ t('docs.toc.npm') }}</span>
                  <ExternalLinkIcon class="h-3 w-3 ml-auto" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  Code as CodeIcon,
  Zap as ZapIcon,
  Cpu as CpuIcon,
  Calculator as CalculatorIcon,
  BookOpen as BookOpenIcon,
  Github as GithubIcon,
  Package as PackageIcon,
  ExternalLink as ExternalLinkIcon
} from 'lucide-vue-next'
import { useI18n } from '../../composables/useI18n'

const { t } = useI18n()

// 当前活跃的部分
const activeSection = ref('install')

// 目录项
const tocItems = ref([
  { id: 'install', icon: CodeIcon },
  { id: 'basicUsage', icon: ZapIcon },
  { id: 'coreComponents', icon: CpuIcon },
  { id: 'beautifulApi', icon: CalculatorIcon },
  { id: 'examples', icon: BookOpenIcon }
])

// 滚动到指定部分
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 100 // 导航栏高度偏移
    const elementPosition = element.offsetTop - offset
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}

// 节流函数
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0
  return (...args: any[]) => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

// 检查当前滚动位置
const checkActiveSection = () => {
  const sections = tocItems.value.map(item => item.id)
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const offset = 120 // 调整偏移量以更好地匹配导航栏高度

  for (let i = sections.length - 1; i >= 0; i--) {
    const element = document.getElementById(sections[i])
    if (element && element.offsetTop - offset <= scrollTop + 30) { // 增加一些容差
      activeSection.value = sections[i]
      break
    }
  }
}

// 节流版本的滚动检查
const throttledCheckActiveSection = throttle(checkActiveSection, 100)

// 监听滚动事件
onMounted(() => {
  window.addEventListener('scroll', throttledCheckActiveSection)
  checkActiveSection() // 初始检查
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledCheckActiveSection)
})
</script> 