<template>
  <section id="docs" class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl transition-colors duration-300">
          {{ t('docs.title') }}
        </h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">
          {{ t('docs.description') }}
        </p>
      </div>
      <div class="grid gap-8 lg:grid-cols-2">
        <!-- 安装说明 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <CodeIcon class="h-5 w-5 text-blue-600 dark:text-blue-400" />
            {{ t('docs.sections.installation.title') }}
          </h3>
          <div class="space-y-3">
            <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm transition-colors duration-300">
              npm install vue-mathjax-beautiful
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              {{ t('docs.sections.installation.yarn') }}
            </p>
            <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm transition-colors duration-300">
              yarn add vue-mathjax-beautiful
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              {{ t('docs.sections.installation.pnpm') }}
            </p>
            <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm transition-colors duration-300">
              pnpm add vue-mathjax-beautiful
            </div>
          </div>
        </div>

        <!-- 基本使用 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <ZapIcon class="h-5 w-5 text-green-600 dark:text-green-400" />
            {{ t('docs.sections.basicUsage.title') }}
          </h3>
          <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm transition-colors duration-300">
            <div class="text-blue-400 dark:text-blue-300">&lt;template&gt;</div>
            <div class="ml-2 text-green-400 dark:text-green-300">
              &lt;VueMathjaxEditor v-model="content" /&gt;
            </div>
            <div class="text-blue-400 dark:text-blue-300">&lt;/template&gt;</div>
            <br />
            <div class="text-blue-400 dark:text-blue-300">&lt;script setup&gt;</div>
            <div class="ml-2 text-yellow-400 dark:text-yellow-300">
              import { VueMathjaxEditor } from 'vue-mathjax-beautiful'
            </div>
            <div class="ml-2 text-yellow-400 dark:text-yellow-300">
              import 'vue-mathjax-beautiful/dist/style.css'
            </div>
            <div class="text-blue-400 dark:text-blue-300">&lt;/script&gt;</div>
          </div>
        </div>

        <!-- 组件介绍 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <CalculatorIcon class="h-5 w-5 text-purple-600 dark:text-purple-400" />
            {{ t('docs.sections.coreComponents.title') }}
          </h3>
          <div class="space-y-4 text-sm">
            <div class="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg transition-colors duration-300">
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
            <div class="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors duration-300">
              <div class="flex items-start gap-3">
                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong class="text-blue-900 dark:text-blue-200 transition-colors duration-300">{{ t('docs.sections.coreComponents.editor.title') }}</strong>
                  <p class="text-blue-700 dark:text-blue-300 mt-1 transition-colors duration-300">
                    {{ t('docs.sections.coreComponents.editor.description') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- VueMathjaxBeautiful API -->
        <div class="lg:col-span-2 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 shadow-lg border border-purple-200 dark:border-purple-800 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-purple-900 dark:text-purple-200 mb-4 transition-colors duration-300">
            <CalculatorIcon class="h-5 w-5 text-purple-600 dark:text-purple-400" />
            {{ t('docs.sections.vueMathjaxBeautifulApi.title') }}
          </h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <!-- 基础属性 -->
            <div class="space-y-3">
              <h4 class="font-semibold text-purple-800 dark:text-purple-300">{{ t('docs.sections.vueMathjaxBeautifulApi.basicProps') }}</h4>
              <div class="border-l-4 border-purple-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">v-model (boolean)</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxBeautifulApi.props.modelValue') }}</div>
              </div>
              <div class="border-l-4 border-blue-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">title (string)</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxBeautifulApi.props.title') }}</div>
              </div>
              <div class="border-l-4 border-green-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">subtitle (string)</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxBeautifulApi.props.subtitle') }}</div>
              </div>
              <div class="border-l-4 border-orange-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">placeholder (string)</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxBeautifulApi.props.placeholder') }}</div>
              </div>
            </div>
            <!-- 行为属性 -->
            <div class="space-y-3">
              <h4 class="font-semibold text-purple-800 dark:text-purple-300">{{ t('docs.sections.vueMathjaxBeautifulApi.behaviorProps') }}</h4>
              <div class="border-l-4 border-red-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">inline-mode (boolean)</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxBeautifulApi.props.inlineMode') }}</div>
              </div>
              <div class="border-l-4 border-indigo-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">existing-latex (string)</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxBeautifulApi.props.existingLatex') }}</div>
              </div>
              <div class="border-l-4 border-pink-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">show-theme-toggle (boolean)</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxBeautifulApi.props.showThemeToggle') }}</div>
              </div>
            </div>
          </div>
          <!-- 事件 -->
          <div class="mt-6 pt-4 border-t border-purple-200 dark:border-purple-700">
            <h4 class="font-semibold text-purple-800 dark:text-purple-300 mb-3">{{ t('docs.sections.vueMathjaxBeautifulApi.events') }}</h4>
            <div class="grid md:grid-cols-2 gap-3 text-sm">
              <div class="border-l-4 border-green-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">@insert</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxBeautifulApi.eventDesc.insert') }}</div>
              </div>
              <div class="border-l-4 border-red-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">@cancel</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxBeautifulApi.eventDesc.cancel') }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- VueMathjaxEditor API -->
        <div class="lg:col-span-2 rounded-xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-6 shadow-lg border border-green-200 dark:border-green-800 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-green-900 dark:text-green-200 mb-4 transition-colors duration-300">
            <FileTextIcon class="h-5 w-5 text-green-600 dark:text-green-400" />
            {{ t('docs.sections.vueMathjaxEditorApi.title') }}
          </h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <!-- 基础属性 -->
            <div class="space-y-3">
              <h4 class="font-semibold text-green-800 dark:text-green-300">{{ t('docs.sections.vueMathjaxEditorApi.basicProps') }}</h4>
              <div class="border-l-4 border-blue-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">v-model (string)</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxEditorApi.props.modelValue') }}</div>
              </div>
              <div class="border-l-4 border-green-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">placeholder (string)</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxEditorApi.props.placeholder') }}</div>
              </div>
              <div class="border-l-4 border-purple-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">min-height (string)</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxEditorApi.props.minHeight') }}</div>
              </div>
              <div class="border-l-4 border-orange-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">width (string)</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxEditorApi.props.width') }}</div>
              </div>
            </div>
            <!-- 功能属性 -->
            <div class="space-y-3">
              <h4 class="font-semibold text-green-800 dark:text-green-300">{{ t('docs.sections.vueMathjaxEditorApi.featureProps') }}</h4>
              <div class="border-l-4 border-red-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">readonly (boolean)</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxEditorApi.props.readonly') }}</div>
              </div>
              <div class="border-l-4 border-indigo-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">show-toolbar (boolean)</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxEditorApi.props.showToolbar') }}</div>
              </div>
              <div class="border-l-4 border-pink-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">theme (string)</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxEditorApi.props.theme') }}</div>
              </div>
              <div class="border-l-4 border-yellow-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">auto-focus (boolean)</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxEditorApi.props.autoFocus') }}</div>
              </div>
            </div>
          </div>
          <!-- 事件 -->
          <div class="mt-6 pt-4 border-t border-green-200 dark:border-green-700">
            <h4 class="font-semibold text-green-800 dark:text-green-300 mb-3">{{ t('docs.sections.vueMathjaxEditorApi.events') }}</h4>
            <div class="grid md:grid-cols-3 gap-3 text-sm">
              <div class="border-l-4 border-blue-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">@change</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxEditorApi.eventDesc.change') }}</div>
              </div>
              <div class="border-l-4 border-green-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">@focus</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxEditorApi.eventDesc.focus') }}</div>
              </div>
              <div class="border-l-4 border-purple-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">@blur</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxEditorApi.eventDesc.blur') }}</div>
              </div>
              <div class="border-l-4 border-orange-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">@ready</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxEditorApi.eventDesc.ready') }}</div>
              </div>
              <div class="border-l-4 border-red-500 pl-3">
                <div class="font-mono font-semibold text-gray-900 dark:text-white">@error</div>
                <div class="text-gray-600 dark:text-gray-400">{{ t('docs.sections.vueMathjaxEditorApi.eventDesc.error') }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 事件说明 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <ZapIcon class="h-5 w-5 text-red-600 dark:text-red-400" />
            {{ t('docs.sections.events.title') }}
          </h3>
          <div class="space-y-3 text-sm">
            <div class="border-l-4 border-blue-500 pl-3">
              <div class="font-mono font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                @change
              </div>
              <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {{ t('docs.sections.events.change') }}
              </div>
            </div>
            <div class="border-l-4 border-green-500 pl-3">
              <div class="font-mono font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                @focus
              </div>
              <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {{ t('docs.sections.events.focus') }}
              </div>
            </div>
            <div class="border-l-4 border-purple-500 pl-3">
              <div class="font-mono font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                @blur
              </div>
              <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {{ t('docs.sections.events.blur') }}
              </div>
            </div>
          </div>
        </div>

        <!-- 快捷键说明 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <KeyboardIcon class="h-5 w-5 text-purple-600 dark:text-purple-400" />
            {{ t('docs.sections.shortcuts.title') }}
          </h3>
          <div class="space-y-3">
            <div
              v-for="shortcut in shortcuts"
              :key="shortcut.key"
              class="flex items-center justify-between"
            >
              <kbd class="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors duration-300">
                {{ shortcut.key }}
              </kbd>
              <span class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{{ shortcut.action }}</span>
            </div>
          </div>
        </div>

        <!-- LaTeX 语法 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <FileTextIcon class="h-5 w-5 text-orange-600 dark:text-orange-400" />
            {{ t('docs.sections.latexSyntax.title') }}
          </h3>
          <div class="space-y-3">
            <div
              v-for="example in latexExamples"
              :key="example.code"
              class="flex items-center justify-between"
            >
              <code class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded font-mono transition-colors duration-300">{{ example.code }}</code>
              <span class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{{ example.description }}</span>
            </div>
          </div>
        </div>

        <!-- 高级用法 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <SettingsIcon class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            {{ t('docs.sections.advancedUsage.title') }}
          </h3>
          <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm transition-colors duration-300">
            <div class="text-gray-400 dark:text-gray-500">// 自定义配置</div>
            <div class="text-blue-400 dark:text-blue-300">&lt;VueMathjaxEditor</div>
            <div class="ml-2 text-green-400 dark:text-green-300">v-model="content"</div>
            <div class="ml-2 text-green-400 dark:text-green-300">:min-height="'500px'"</div>
            <div class="ml-2 text-green-400 dark:text-green-300">:readonly="false"</div>
            <div class="ml-2 text-green-400 dark:text-green-300">
              placeholder="请输入内容..."
            </div>
            <div class="ml-2 text-green-400 dark:text-green-300">@change="handleChange"</div>
            <div class="ml-2 text-green-400 dark:text-green-300">@focus="handleFocus"</div>
            <div class="ml-2 text-green-400 dark:text-green-300">@blur="handleBlur"</div>
            <div class="text-blue-400 dark:text-blue-300">/&gt;</div>
          </div>
        </div>

        <!-- LaTeX 工具函数 API -->
        <div class="lg:col-span-2 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 shadow-lg border border-orange-200 dark:border-orange-800 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-orange-900 dark:text-orange-200 mb-4 transition-colors duration-300">
            <CodeIcon class="h-5 w-5 text-orange-600 dark:text-orange-400" />
            {{ t('docs.sections.latexApiUtils.title') }}
          </h3>
          <div class="grid md:grid-cols-2 gap-6 text-sm">
            <!-- 核心转换函数 -->
            <div class="space-y-4">
              <h4 class="font-semibold text-orange-800 dark:text-orange-300 border-b border-orange-200 dark:border-orange-700 pb-2">
                {{ t('docs.sections.latexApiUtils.coreConversion') }}
              </h4>
              <div class="space-y-3">
                <div class="bg-white dark:bg-gray-800 p-3 rounded-lg border border-orange-200 dark:border-orange-700">
                  <div class="font-mono font-semibold text-orange-700 dark:text-orange-300 mb-1">initMathJax(config?)</div>
                  <div class="text-gray-600 dark:text-gray-400 text-xs">{{ t('docs.sections.latexApiUtils.functions.initMathJax') }}</div>
                </div>
                <div class="bg-white dark:bg-gray-800 p-3 rounded-lg border border-orange-200 dark:border-orange-700">
                  <div class="font-mono font-semibold text-orange-700 dark:text-orange-300 mb-1">convertLatexToSvg(content)</div>
                  <div class="text-gray-600 dark:text-gray-400 text-xs">{{ t('docs.sections.latexApiUtils.functions.convertLatexToSvg') }}</div>
                </div>
                <div class="bg-white dark:bg-gray-800 p-3 rounded-lg border border-orange-200 dark:border-orange-700">
                  <div class="font-mono font-semibold text-orange-700 dark:text-orange-300 mb-1">batchConvertLatex(contents)</div>
                  <div class="text-gray-600 dark:text-gray-400 text-xs">{{ t('docs.sections.latexApiUtils.functions.batchConvertLatex') }}</div>
                </div>
                <div class="bg-white dark:bg-gray-800 p-3 rounded-lg border border-orange-200 dark:border-orange-700">
                  <div class="font-mono font-semibold text-orange-700 dark:text-orange-300 mb-1">extractLatexFromSvg(content)</div>
                  <div class="text-gray-600 dark:text-gray-400 text-xs">{{ t('docs.sections.latexApiUtils.functions.extractLatexFromSvg') }}</div>
                </div>
              </div>
            </div>
            
            <!-- 匹配和检测函数 -->
            <div class="space-y-4">
              <h4 class="font-semibold text-orange-800 dark:text-orange-300 border-b border-orange-200 dark:border-orange-700 pb-2">
                {{ t('docs.sections.latexApiUtils.matchingDetection') }}
              </h4>
              <div class="space-y-3">
                <div class="bg-white dark:bg-gray-800 p-3 rounded-lg border border-orange-200 dark:border-orange-700">
                  <div class="font-mono font-semibold text-orange-700 dark:text-orange-300 mb-1">matchLatex(content)</div>
                  <div class="text-gray-600 dark:text-gray-400 text-xs">{{ t('docs.sections.latexApiUtils.functions.matchLatex') }}</div>
                </div>
                <div class="bg-white dark:bg-gray-800 p-3 rounded-lg border border-orange-200 dark:border-orange-700">
                  <div class="font-mono font-semibold text-orange-700 dark:text-orange-300 mb-1">hasLatexFormula(content)</div>
                  <div class="text-gray-600 dark:text-gray-400 text-xs">{{ t('docs.sections.latexApiUtils.functions.hasLatexFormula') }}</div>
                </div>
                <div class="bg-white dark:bg-gray-800 p-3 rounded-lg border border-orange-200 dark:border-orange-700">
                  <div class="font-mono font-semibold text-orange-700 dark:text-orange-300 mb-1">clearMathTags(element, tagName)</div>
                  <div class="text-gray-600 dark:text-gray-400 text-xs">{{ t('docs.sections.latexApiUtils.functions.clearMathTags') }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 使用示例 -->
          <div class="mt-6 pt-4 border-t border-orange-200 dark:border-orange-700">
            <h4 class="font-semibold text-orange-800 dark:text-orange-300 mb-3">{{ t('docs.sections.latexApiUtils.usageExample') }}</h4>
            <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm">
              <div class="text-gray-400 dark:text-gray-500">// 导入工具函数</div>
              <div class="text-blue-400 dark:text-blue-300">import { </div>
              <div class="ml-2 text-green-400 dark:text-green-300">initMathJax, convertLatexToSvg, matchLatex</div>
              <div class="text-blue-400 dark:text-blue-300">} from 'vue-mathjax-beautiful'</div>
              <br />
              <div class="text-gray-400 dark:text-gray-500">// 初始化 MathJax</div>
              <div class="text-yellow-400 dark:text-yellow-300">await initMathJax()</div>
              <br />
              <div class="text-gray-400 dark:text-gray-500">// 转换 LaTeX 为 SVG</div>
              <div class="text-yellow-400 dark:text-yellow-300">const result = await convertLatexToSvg('$E=mc^2$')</div>
              <br />
              <div class="text-gray-400 dark:text-gray-500">// 匹配公式</div>
              <div class="text-yellow-400 dark:text-yellow-300">const matches = matchLatex(content)</div>
            </div>
          </div>
        </div>

        <!-- 完整集成示例 -->
        <div class="lg:col-span-2 rounded-xl bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-900/20 dark:to-cyan-900/20 p-6 shadow-lg border border-indigo-200 dark:border-indigo-800 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-indigo-900 dark:text-indigo-200 mb-4 transition-colors duration-300">
            <SettingsIcon class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            {{ t('docs.sections.integrationExample.title') }}
          </h3>
          
          <!-- Vue 3 组合式API示例 -->
          <div class="mb-6">
            <h4 class="font-semibold text-indigo-800 dark:text-indigo-300 mb-3">{{ t('docs.sections.integrationExample.composition') }}</h4>
            <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div class="text-blue-400">&lt;template&gt;</div>
              <div class="ml-2 text-green-400">&lt;div class="math-editor-container"&gt;</div>
              <div class="ml-4 text-gray-400">&lt;!-- 富文本编辑器 --&gt;</div>
              <div class="ml-4 text-green-400">&lt;VueMathjaxEditor</div>
              <div class="ml-6 text-yellow-400">v-model="content"</div>
              <div class="ml-6 text-yellow-400">:min-height="'300px'"</div>
              <div class="ml-6 text-yellow-400">:readonly="isReadonly"</div>
              <div class="ml-6 text-yellow-400">placeholder="开始编写您的数学内容..."</div>
              <div class="ml-6 text-yellow-400">@change="handleContentChange"</div>
              <div class="ml-6 text-yellow-400">@ready="handleEditorReady"</div>
              <div class="ml-4 text-green-400">/&gt;</div>
              <br />
              <div class="ml-4 text-gray-400">&lt;!-- 公式编辑器弹窗 --&gt;</div>
              <div class="ml-4 text-green-400">&lt;VueMathjaxBeautiful</div>
              <div class="ml-6 text-yellow-400">v-model="showFormulaDialog"</div>
              <div class="ml-6 text-yellow-400">:existing-latex="selectedFormula"</div>
              <div class="ml-6 text-yellow-400">title="高级公式编辑器"</div>
              <div class="ml-6 text-yellow-400">@insert="handleFormulaInsert"</div>
              <div class="ml-6 text-yellow-400">@cancel="handleCancel"</div>
              <div class="ml-4 text-green-400">/&gt;</div>
              <div class="ml-2 text-green-400">&lt;/div&gt;</div>
              <div class="text-blue-400">&lt;/template&gt;</div>
              <br />
              <div class="text-blue-400">&lt;script setup lang="ts"&gt;</div>
              <div class="text-purple-400">import { ref, onMounted } from 'vue'</div>
              <div class="text-purple-400">import {</div>
              <div class="ml-2 text-purple-400">VueMathjaxEditor, VueMathjaxBeautiful,</div>
              <div class="ml-2 text-purple-400">initMathJax, convertLatexToSvg</div>
              <div class="text-purple-400">} from 'vue-mathjax-beautiful'</div>
              <div class="text-purple-400">import 'vue-mathjax-beautiful/dist/style.css'</div>
              <br />
              <div class="text-gray-400">// 响应式数据</div>
              <div class="text-white">const content = ref('')</div>
              <div class="text-white">const showFormulaDialog = ref(false)</div>
              <div class="text-white">const selectedFormula = ref('')</div>
              <div class="text-white">const isReadonly = ref(false)</div>
              <br />
              <div class="text-gray-400">// 初始化MathJax</div>
              <div class="text-yellow-400">onMounted(async () => {</div>
              <div class="ml-2 text-white">await initMathJax()</div>
              <div class="text-yellow-400">})</div>
              <br />
              <div class="text-gray-400">// 事件处理函数</div>
              <div class="text-yellow-400">const handleContentChange = (value: string) => {</div>
              <div class="ml-2 text-white">console.log('Content changed:', value)</div>
              <div class="text-yellow-400">}</div>
              <br />
              <div class="text-yellow-400">const handleFormulaInsert = (latex: string) => {</div>
              <div class="ml-2 text-white">content.value += `$${latex}$`</div>
              <div class="ml-2 text-white">showFormulaDialog.value = false</div>
              <div class="text-yellow-400">}</div>
              <div class="text-blue-400">&lt;/script&gt;</div>
            </div>
          </div>

          <!-- TypeScript类型支持 -->
          <div class="mb-6">
            <h4 class="font-semibold text-indigo-800 dark:text-indigo-300 mb-3">{{ t('docs.sections.integrationExample.typescript') }}</h4>
            <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div class="text-gray-400">// 导入类型定义</div>
              <div class="text-purple-400">import type {</div>
              <div class="ml-2 text-purple-400">MatchLatexResult, Symbol, Category</div>
              <div class="text-purple-400">} from 'vue-mathjax-beautiful'</div>
              <br />
              <div class="text-gray-400">// 使用类型</div>
              <div class="text-white">interface EditorConfig {</div>
              <div class="ml-2 text-white">minHeight: string</div>
              <div class="ml-2 text-white">readonly: boolean</div>
              <div class="ml-2 text-white">theme: 'default' | 'minimal'</div>
              <div class="text-white">}</div>
            </div>
          </div>

          <!-- 工具函数使用示例 -->
          <div>
            <h4 class="font-semibold text-indigo-800 dark:text-indigo-300 mb-3">{{ t('docs.sections.integrationExample.utilityFunctions') }}</h4>
            <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div class="text-gray-400">// 检测和处理LaTeX公式</div>
              <div class="text-purple-400">import { matchLatex, hasLatexFormula } from 'vue-mathjax-beautiful'</div>
              <br />
              <div class="text-white">const text = '这是一个公式: $E=mc^2$ 和另一个: $$\\int_0^1 x dx$$'</div>
              <br />
              <div class="text-gray-400">// 检测是否包含公式</div>
              <div class="text-white">if (hasLatexFormula(text)) {</div>
              <div class="ml-2 text-gray-400">// 获取所有公式匹配信息</div>
              <div class="ml-2 text-white">const matches = matchLatex(text)</div>
              <div class="ml-2 text-white">matches.forEach(match => {</div>
              <div class="ml-4 text-white">console.log('Formula:', match.content)</div>
              <div class="ml-4 text-white">console.log('Type:', match.isInline ? 'inline' : 'display')</div>
              <div class="ml-2 text-white">})</div>
              <div class="text-white">}</div>
            </div>
          </div>
        </div>

        <!-- 常见问题 -->
        <div class="lg:col-span-2 rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            <FileTextIcon class="h-5 w-5 text-red-600 dark:text-red-400" />
            {{ t('docs.sections.faq.title') }}
          </h3>
          <div class="grid md:grid-cols-2 gap-6 text-sm">
            <div class="space-y-4">
              <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div class="font-semibold text-red-900 dark:text-red-200 mb-2">
                  {{ t('docs.sections.faq.questions.complexFormulas.q') }}
                </div>
                <div class="text-red-700 dark:text-red-300">
                  {{ t('docs.sections.faq.questions.complexFormulas.a') }}
                </div>
              </div>
              <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div class="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                  {{ t('docs.sections.faq.questions.latexSupport.q') }}
                </div>
                <div class="text-blue-700 dark:text-blue-300">
                  {{ t('docs.sections.faq.questions.latexSupport.a') }}
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div class="font-semibold text-green-900 dark:text-green-200 mb-2">
                  {{ t('docs.sections.faq.questions.customStyle.q') }}
                </div>
                <div class="text-green-700 dark:text-green-300">
                  {{ t('docs.sections.faq.questions.customStyle.a') }}
                </div>
              </div>
              <div class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                <div class="font-semibold text-purple-900 dark:text-purple-200 mb-2">
                  {{ t('docs.sections.faq.questions.mobile.q') }}
                </div>
                <div class="text-purple-700 dark:text-purple-300">
                  {{ t('docs.sections.faq.questions.mobile.a') }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 更多资源 -->
        <div class="rounded-xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <h3 class="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 transition-colors duration-300">
            <GithubIcon class="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
            {{ t('docs.sections.resources.title') }}
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <a
              href="#"
              class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
              <span class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">{{ t('docs.sections.resources.github') }}</span>
            </a>
            <a
              href="#examples"
              class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div class="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
              <span class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">{{ t('docs.sections.resources.examples') }}</span>
            </a>
            <a
              href="#"
              class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div class="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
              <span class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">{{ t('docs.sections.resources.api') }}</span>
            </a>
            <a
              href="#"
              class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div class="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
              <span class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">{{ t('docs.sections.resources.issues') }}</span>
            </a>
            <a
              href="#"
              class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group sm:col-span-2"
            >
              <div class="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
              <span class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">{{ t('docs.sections.resources.changelog') }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  Code as CodeIcon,
  Zap as ZapIcon,
  Calculator as CalculatorIcon,
  Settings as SettingsIcon,
  Keyboard as KeyboardIcon,
  FileText as FileTextIcon,
  Github as GithubIcon,
} from 'lucide-vue-next';
import { useI18n } from '../../composables/useI18n';

// 国际化功能
const { t } = useI18n();

// 快捷键数据（国际化）
const shortcuts = computed(() => [
  { key: 'Ctrl + B', action: t('docs.sections.shortcuts.bold') },
  { key: 'Ctrl + I', action: t('docs.sections.shortcuts.italic') },
  { key: 'Ctrl + U', action: t('docs.sections.shortcuts.underline') },
  { key: 'Ctrl + S', action: t('docs.sections.shortcuts.strikethrough') },
  { key: 'Ctrl + Z', action: t('docs.sections.shortcuts.undo') },
  { key: 'Ctrl + Y', action: t('docs.sections.shortcuts.redo') },
  { key: 'Ctrl + M', action: t('docs.sections.shortcuts.editFormula') },
  { key: '$...$', action: t('docs.sections.shortcuts.inlineFormula') },
  { key: '$$...$$', action: t('docs.sections.shortcuts.displayFormula') },
]);

// LaTeX 示例（国际化）
const latexExamples = computed(() => [
  { code: '$E = mc^2$', description: t('docs.sections.latexSyntax.inlineFormula') },
  { code: '$$\\int_0^1 x^2 dx$$', description: t('docs.sections.latexSyntax.displayFormula') },
  { code: '\\frac{a}{b}', description: t('docs.sections.latexSyntax.fraction') },
  { code: '\\sqrt{x}', description: t('docs.sections.latexSyntax.sqrt') },
  { code: 'x^2', description: t('docs.sections.latexSyntax.superscript') },
  { code: 'x_i', description: t('docs.sections.latexSyntax.subscript') },
  { code: '\\sum_{i=1}^n', description: t('docs.sections.latexSyntax.sum') },
  { code: '\\alpha \\beta \\gamma', description: t('docs.sections.latexSyntax.greekLetters') },
  { code: '\\begin{matrix} a & b \\\\ c & d \\end{matrix}', description: t('docs.sections.latexSyntax.matrix') },
  { code: '\\lim_{x \\to 0}', description: t('docs.sections.latexSyntax.limit') },
  { code: '\\sin \\cos \\tan', description: t('docs.sections.latexSyntax.trigFunctions') },
  { code: '\\infty \\pm \\neq', description: t('docs.sections.latexSyntax.specialSymbols') },
]);
</script> 