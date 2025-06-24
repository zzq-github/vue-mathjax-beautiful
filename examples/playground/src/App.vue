<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- 头部导航 -->
    <header class="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div class="container mx-auto flex h-16 items-center justify-between px-4">
        <div class="flex items-center space-x-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <CalculatorIcon class="h-5 w-5" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900">Vue MathJax</h1>
            <p class="text-xs text-gray-500">Beautiful Editor</p>
          </div>
        </div>
        <nav class="hidden md:flex items-center space-x-8">
          <a href="#editor" class="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">编辑器</a>
          <a href="#features" class="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">功能特性</a>
          <a href="#examples" class="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">示例</a>
          <a href="#docs" class="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">文档</a>
        </nav>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="main">
      <!-- 英雄区域 -->
      <section class="relative overflow-hidden py-20 lg:py-32">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700" />
        <div class="absolute inset-0 bg-black/20" />
        <div class="relative container mx-auto px-4 text-center">
          <div class="mx-auto max-w-4xl">
            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Vue 数学公式
              <span class="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                编辑器
              </span>
            </h1>
            <p class="mt-6 text-lg leading-8 text-blue-100 sm:text-xl">
              基于 MathJax 的强大数学公式编辑器组件，支持富文本编辑、LaTeX 语法、实时预览
            </p>
            <div class="mt-8 flex flex-wrap justify-center gap-3">
              <span v-for="tech in ['Vue 3', 'TypeScript', 'MathJax', 'LaTeX']" 
                    :key="tech" 
                    class="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white hover:bg-white/30 transition-colors">
                {{ tech }}
              </span>
            </div>
            <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button class="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-lg hover:bg-blue-50 transition-all duration-200 hover:scale-105">
                <ZapIcon class="mr-2 h-4 w-4" />
                开始使用
              </button>
              <button class="inline-flex items-center justify-center rounded-lg border border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-all duration-200">
                <GithubIcon class="mr-2 h-4 w-4" />
                查看源码
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 编辑器演示区域 -->
      <section id="editor" class="py-20">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">在线演示</h2>
            <p class="mt-4 text-lg text-gray-600">体验强大的数学公式编辑功能</p>
          </div>

          <!-- 富文本编辑器 -->
          <div class="mb-8 overflow-hidden rounded-xl bg-white shadow-xl border border-gray-100">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white">
                    <Edit3Icon class="h-4 w-4" />
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">富文本编辑器</h3>
                    <p class="text-sm text-gray-600">支持文本格式和数学公式的混合编辑</p>
                  </div>
                </div>
                <div class="flex gap-2">
                  <button @click="clearContent" 
                          class="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    清空内容
                  </button>
                  <button @click="loadSample" 
                          class="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    加载示例
                  </button>
                  <button @click="testMathJax" 
                          class="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    测试MathJax
                  </button>
                </div>
              </div>
            </div>
            <div class="p-6">
              <div class="min-h-[400px] rounded-lg border border-gray-200 bg-white">
                <VueMathjaxEditor 
                  v-model="richTextContent"
                  placeholder="开始编写您的内容，支持富文本编辑和数学公式..."
                  min-height="400px"
                  @change="handleRichTextChange"
                  @focus="handleFocus"
                  @blur="handleBlur"
                />
              </div>
            </div>
          </div>

          <!-- 公式编辑器 -->
          <div class="overflow-hidden rounded-xl bg-white shadow-xl border border-gray-100">
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500 text-white">
                    <CalculatorIcon class="h-4 w-4" />
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">公式编辑器</h3>
                    <p class="text-sm text-gray-600">专业的数学公式编辑和预览</p>
                  </div>
                </div>
                <button @click="showFormulaDialog = true" 
                        class="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors">
                  <CalculatorIcon class="mr-2 h-4 w-4 inline" />
                  打开公式编辑器
                </button>
              </div>
            </div>
            <div class="p-6">
              <div class="text-center space-y-4">
                <div class="text-sm text-gray-500">当前公式：</div>
                <div class="text-3xl font-mono bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border" 
                     v-html="renderedFormula"></div>
                <div class="text-xs text-gray-400 font-mono bg-gray-100 p-3 rounded-lg inline-block">
                  {{ formula }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 功能特性 -->
      <section id="features" class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">功能特性</h2>
            <p class="mt-4 text-lg text-gray-600">为数学内容创作提供完整解决方案</p>
          </div>
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="(feature, index) in features" 
                 :key="index" 
                 class="group rounded-xl bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div :class="`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color} mb-4`">
                <component :is="feature.icon" class="h-6 w-6 text-white" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ feature.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 示例展示 -->
      <section id="examples" class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">公式示例</h2>
            <p class="mt-4 text-lg text-gray-600">点击示例快速体验不同类型的数学公式</p>
          </div>
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div v-for="(example, index) in examples" 
                 :key="example.name"
                 :class="`cursor-pointer rounded-xl bg-white p-6 shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                   activeExample === index ? 'ring-2 ring-blue-500 border-blue-200' : 'border-gray-100'
                 }`"
                 @click="loadExample(example.latex, index)">
              <div class="text-center space-y-3">
                <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  {{ example.category }}
                </span>
                <div class="text-lg font-mono min-h-[40px] flex items-center justify-center" 
                     v-html="example.rendered"></div>
                <h4 class="font-semibold text-gray-900">{{ example.name }}</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用文档 -->
      <section id="docs" class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">使用文档</h2>
            <p class="mt-4 text-lg text-gray-600">完整的使用指南和API文档</p>
          </div>
          <div class="grid gap-8 lg:grid-cols-2">
            <!-- 安装说明 -->
            <div class="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <CodeIcon class="h-5 w-5 text-blue-600" />
                安装
              </h3>
              <div class="space-y-3">
                <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  npm install vue-mathjax-beautiful
                </div>
                <p class="text-sm text-gray-600">或者使用 yarn：</p>
                <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  yarn add vue-mathjax-beautiful
                </div>
              </div>
            </div>

            <!-- 基本使用 -->
            <div class="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <ZapIcon class="h-5 w-5 text-green-600" />
                基本使用
              </h3>
              <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                <div class="text-blue-400">&lt;template&gt;</div>
                <div class="ml-2 text-green-400">&lt;VueMathjaxEditor v-model="content" /&gt;</div>
                <div class="text-blue-400">&lt;/template&gt;</div>
                <br>
                <div class="text-blue-400">&lt;script setup&gt;</div>
                <div class="ml-2 text-yellow-400">import { VueMathjaxEditor } from 'vue-mathjax-beautiful'</div>
                <div class="text-blue-400">&lt;/script&gt;</div>
              </div>
            </div>

            <!-- 组件介绍 -->
            <div class="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <Edit3Icon class="h-5 w-5 text-purple-600" />
                组件介绍
              </h3>
              <div class="space-y-3 text-sm">
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong class="text-gray-900">VueMathjaxEditor</strong>
                    <p class="text-gray-600">富文本编辑器，支持文本格式和数学公式混合编辑</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong class="text-gray-900">VueMathjaxBeautiful</strong>
                    <p class="text-gray-600">公式编辑器弹窗，专业的数学公式编辑界面</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- API 属性 -->
            <div class="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <SettingsIcon class="h-5 w-5 text-orange-600" />
                API 属性
              </h3>
              <div class="space-y-3 text-sm">
                <div class="border-l-4 border-blue-500 pl-3">
                  <div class="font-mono font-semibold text-gray-900">v-model</div>
                  <div class="text-gray-600">绑定的内容值 (string)</div>
                </div>
                <div class="border-l-4 border-green-500 pl-3">
                  <div class="font-mono font-semibold text-gray-900">placeholder</div>
                  <div class="text-gray-600">占位符文本 (string)</div>
                </div>
                <div class="border-l-4 border-purple-500 pl-3">
                  <div class="font-mono font-semibold text-gray-900">min-height</div>
                  <div class="text-gray-600">最小高度 (string, 默认: "200px")</div>
                </div>
                <div class="border-l-4 border-orange-500 pl-3">
                  <div class="font-mono font-semibold text-gray-900">readonly</div>
                  <div class="text-gray-600">只读模式 (boolean, 默认: false)</div>
                </div>
              </div>
            </div>

            <!-- 事件说明 -->
            <div class="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <ZapIcon class="h-5 w-5 text-red-600" />
                事件说明
              </h3>
              <div class="space-y-3 text-sm">
                <div class="border-l-4 border-blue-500 pl-3">
                  <div class="font-mono font-semibold text-gray-900">@change</div>
                  <div class="text-gray-600">内容变化时触发 (value: string)</div>
                </div>
                <div class="border-l-4 border-green-500 pl-3">
                  <div class="font-mono font-semibold text-gray-900">@focus</div>
                  <div class="text-gray-600">编辑器获得焦点时触发</div>
                </div>
                <div class="border-l-4 border-purple-500 pl-3">
                  <div class="font-mono font-semibold text-gray-900">@blur</div>
                  <div class="text-gray-600">编辑器失去焦点时触发</div>
                </div>
              </div>
            </div>

            <!-- 快捷键说明 -->
            <div class="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <KeyboardIcon class="h-5 w-5 text-purple-600" />
                快捷键
              </h3>
              <div class="space-y-3">
                <div v-for="shortcut in shortcuts" :key="shortcut.key" class="flex items-center justify-between">
                  <kbd class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
                    {{ shortcut.key }}
                  </kbd>
                  <span class="text-sm text-gray-600">{{ shortcut.action }}</span>
                </div>
              </div>
            </div>

            <!-- LaTeX 语法 -->
            <div class="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <FileTextIcon class="h-5 w-5 text-orange-600" />
                LaTeX 语法示例
              </h3>
              <div class="space-y-3">
                <div v-for="example in latexExamples" :key="example.code" class="flex items-center justify-between">
                  <code class="px-2 py-1 text-xs bg-gray-100 rounded font-mono">{{ example.code }}</code>
                  <span class="text-sm text-gray-600">{{ example.description }}</span>
                </div>
              </div>
            </div>

            <!-- 高级用法 -->
            <div class="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <SettingsIcon class="h-5 w-5 text-indigo-600" />
                高级用法
              </h3>
              <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                <div class="text-gray-400">// 自定义配置</div>
                <div class="text-blue-400">&lt;VueMathjaxEditor</div>
                <div class="ml-2 text-green-400">v-model="content"</div>
                <div class="ml-2 text-green-400">:min-height="'500px'"</div>
                <div class="ml-2 text-green-400">:readonly="false"</div>
                <div class="ml-2 text-green-400">placeholder="请输入内容..."</div>
                <div class="ml-2 text-green-400">@change="handleChange"</div>
                <div class="ml-2 text-green-400">@focus="handleFocus"</div>
                <div class="ml-2 text-green-400">@blur="handleBlur"</div>
                <div class="text-blue-400">/&gt;</div>
              </div>
            </div>

            <!-- 公式编辑器用法 -->
            <div class="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <CalculatorIcon class="h-5 w-5 text-pink-600" />
                公式编辑器用法
              </h3>
              <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                <div class="text-gray-400">// 公式编辑器弹窗</div>
                <div class="text-blue-400">&lt;VueMathjaxBeautiful</div>
                <div class="ml-2 text-green-400">v-model="showDialog"</div>
                <div class="ml-2 text-green-400">:existing-latex="formula"</div>
                <div class="ml-2 text-green-400">@insert="handleInsert"</div>
                <div class="text-blue-400">/&gt;</div>
                <br>
                <div class="text-gray-400">// 处理公式插入</div>
                <div class="text-yellow-400">const handleInsert = (latex) => {</div>
                <div class="ml-2 text-white">formula.value = latex</div>
                <div class="text-yellow-400">}</div>
              </div>
            </div>

            <!-- 常见问题 -->
            <div class="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <FileTextIcon class="h-5 w-5 text-red-600" />
                常见问题
              </h3>
              <div class="space-y-4 text-sm">
                <div>
                  <div class="font-semibold text-gray-900 mb-1">Q: 如何插入复杂的数学公式？</div>
                  <div class="text-gray-600">A: 点击编辑器工具栏的"fx"按钮打开公式编辑器，或直接使用LaTeX语法编写。</div>
                </div>
                <div>
                  <div class="font-semibold text-gray-900 mb-1">Q: 支持哪些LaTeX语法？</div>
                  <div class="text-gray-600">A: 支持完整的MathJax LaTeX语法，包括分数、根式、积分、矩阵等。</div>
                </div>
                <div>
                  <div class="font-semibold text-gray-900 mb-1">Q: 如何自定义编辑器样式？</div>
                  <div class="text-gray-600">A: 可以通过CSS自定义样式，或使用min-height等属性调整编辑器外观。</div>
                </div>
                <div>
                  <div class="font-semibold text-gray-900 mb-1">Q: 是否支持移动端？</div>
                  <div class="text-gray-600">A: 完全支持移动端，采用响应式设计，在各种设备上都有良好体验。</div>
                </div>
              </div>
            </div>

            <!-- 更多资源 -->
            <div class="rounded-xl bg-white p-6 shadow-lg border border-gray-100">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <GithubIcon class="h-5 w-5 text-gray-600" />
                更多资源
              </h3>
              <div class="space-y-3 text-sm">
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <a href="#" class="text-blue-600 hover:text-blue-800 transition-colors">GitHub 仓库</a>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <a href="#" class="text-blue-600 hover:text-blue-800 transition-colors">在线示例</a>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <a href="#" class="text-blue-600 hover:text-blue-800 transition-colors">API 文档</a>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                  <a href="#" class="text-blue-600 hover:text-blue-800 transition-colors">问题反馈</a>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                  <a href="#" class="text-blue-600 hover:text-blue-800 transition-colors">更新日志</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div class="lg:col-span-2">
            <div class="flex items-center space-x-3 mb-4">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <CalculatorIcon class="h-5 w-5" />
              </div>
              <div>
                <h3 class="text-lg font-bold">Vue MathJax Editor</h3>
                <p class="text-sm text-gray-400">专业的数学公式编辑器</p>
              </div>
            </div>
            <p class="text-gray-400 max-w-md">
              为 Vue 3 应用提供强大的数学公式编辑功能，支持 LaTeX 语法和实时预览。
            </p>
          </div>

          <div>
            <h4 class="font-semibold mb-4">资源</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">文档</a></li>
              <li><a href="#" class="hover:text-white transition-colors">示例</a></li>
              <li><a href="#" class="hover:text-white transition-colors">API 参考</a></li>
              <li><a href="#" class="hover:text-white transition-colors">更新日志</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4">社区</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" class="hover:text-white transition-colors">问题反馈</a></li>
              <li><a href="#" class="hover:text-white transition-colors">讨论区</a></li>
              <li><a href="#" class="hover:text-white transition-colors">贡献指南</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2024 Vue MathJax Editor. All rights reserved.</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="hover:text-white transition-colors">隐私政策</a>
            <a href="#" class="hover:text-white transition-colors">使用条款</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- 公式编辑器弹窗 -->
    <VueMathjaxBeautiful
      v-model="showFormulaDialog"
      :existing-latex="formula"
      @insert="handleFormulaInsert"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  Calculator as CalculatorIcon,
  Edit3 as Edit3Icon,
  Eye as EyeIcon,
  Palette as PaletteIcon,
  Smartphone as SmartphoneIcon,
  Settings as SettingsIcon,
  Github as GithubIcon,
  Zap as ZapIcon,
  Code as CodeIcon,
  Keyboard as KeyboardIcon,
  FileText as FileTextIcon,
  X as XIcon
} from 'lucide-vue-next'

// 导入核心组件
import { VueMathjaxEditor, VueMathjaxBeautiful, initMathJax, convertLatexToSvg } from 'vue-mathjax-beautiful'

// 响应式数据
const formula = ref('E = mc^2')
const showFormulaDialog = ref(false)
const renderedFormula = ref('<span class="text-gray-400 italic">正在加载...</span>')
const activeExample = ref(0)
const richTextContent = ref(`**欢迎使用 Vue MathJax Editor！**

这是一个功能强大的数学公式编辑器，专为 Vue 3 设计。

## 主要特性

- **富文本编辑**：支持 *斜体*、**粗体**、__下划线__、~~删除线~~
- **数学公式**：完整支持 LaTeX 语法
- **实时预览**：所见即所得的编辑体验

## 数学公式示例

行内公式：质能方程 $E = mc^2$ 展示了质量与能量的关系。

独立公式：
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

分数与根式：$\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

## 开始使用

点击工具栏中的 **fx 公式** 按钮即可打开公式编辑器，或直接点击现有公式进行编辑。`)

// 计算公式数量
const formulaCount = computed(() => {
  const matches = richTextContent.value.match(/\$\$?[^$]+\$\$?/g)
  return matches ? matches.length : 0
})

// 功能特性数据
const features = ref([
  {
    icon: Edit3Icon,
    title: "富文本编辑",
    description: "支持粗体、斜体、下划线等基本文本格式，提供完整的富文本编辑体验",
    color: "bg-blue-500",
  },
  {
    icon: CalculatorIcon,
    title: "数学公式",
    description: "基于 MathJax 引擎，支持完整的 LaTeX 数学语法，渲染高质量的数学公式",
    color: "bg-purple-500",
  },
  {
    icon: EyeIcon,
    title: "实时预览",
    description: "输入公式时实时预览渲染效果，所见即所得的编辑体验",
    color: "bg-green-500",
  },
  {
    icon: PaletteIcon,
    title: "符号面板",
    description: "提供丰富的数学符号面板，包括希腊字母、运算符、函数等",
    color: "bg-orange-500",
  },
  {
    icon: SmartphoneIcon,
    title: "响应式设计",
    description: "适配各种屏幕尺寸，在桌面端和移动端都有良好的使用体验",
    color: "bg-pink-500",
  },
  {
    icon: SettingsIcon,
    title: "易于集成",
    description: "提供 Vue 3 组件，支持 TypeScript，易于集成到现有项目中",
    color: "bg-indigo-500",
  },
])

// 示例公式
const examples = ref([
  { 
    name: '质能方程', 
    latex: 'E = mc^2',
    category: '物理',
    rendered: '<span class="text-gray-400 italic">加载中...</span>'
  },
  { 
    name: '二次方程', 
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    category: '代数',
    rendered: '<span class="text-gray-400 italic">加载中...</span>'
  },
  { 
    name: '欧拉恒等式', 
    latex: 'e^{i\\pi} + 1 = 0',
    category: '数学',
    rendered: '<span class="text-gray-400 italic">加载中...</span>'
  },
  { 
    name: '积分', 
    latex: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
    category: '微积分',
    rendered: '<span class="text-gray-400 italic">加载中...</span>'
  },
  { 
    name: '无穷级数', 
    latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}',
    category: '级数',
    rendered: '<span class="text-gray-400 italic">加载中...</span>'
  },
  { 
    name: '矩阵', 
    latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',
    category: '线性代数',
    rendered: '<span class="text-gray-400 italic">加载中...</span>'
  },
  { 
    name: '极限', 
    latex: '\\lim_{x \\to \\infty} \\frac{1}{x} = 0',
    category: '微积分',
    rendered: '<span class="text-gray-400 italic">加载中...</span>'
  },
  { 
    name: '三角函数', 
    latex: '\\sin^2(x) + \\cos^2(x) = 1',
    category: '三角学',
    rendered: '<span class="text-gray-400 italic">加载中...</span>'
  }
])

// 快捷键数据
const shortcuts = ref([
  { key: "Ctrl + B", action: "粗体" },
  { key: "Ctrl + I", action: "斜体" },
  { key: "Ctrl + U", action: "下划线" },
  { key: "Ctrl + S", action: "删除线" },
  { key: "Ctrl + Z", action: "撤销" },
  { key: "Ctrl + Y", action: "重做" },
  { key: "点击公式", action: "编辑公式" },
  { key: "$公式$", action: "行内公式" },
  { key: "$$公式$$", action: "独立公式" },
])

// LaTeX 示例
const latexExamples = ref([
  { code: "$E = mc^2$", description: "行内公式" },
  { code: "$$\\int_0^1 x^2 dx$$", description: "独立公式" },
  { code: "\\frac{a}{b}", description: "分数" },
  { code: "\\sqrt{x}", description: "根号" },
  { code: "x^2", description: "上标" },
  { code: "x_i", description: "下标" },
  { code: "\\sum_{i=1}^n", description: "求和" },
  { code: "\\alpha \\beta \\gamma", description: "希腊字母" },
  { code: "\\begin{matrix} a & b \\\\ c & d \\end{matrix}", description: "矩阵" },
  { code: "\\lim_{x \\to 0}", description: "极限" },
  { code: "\\sin \\cos \\tan", description: "三角函数" },
  { code: "\\infty \\pm \\neq", description: "特殊符号" },
])

// 渲染公式的函数
const renderFormula = async () => {
  if (!formula.value) {
    renderedFormula.value = '<span class="text-gray-400 italic">暂无公式</span>'
    return
  }
  
  try {
    console.log('开始渲染当前公式:', formula.value)
    
    // 检查MathJax是否已经初始化
    if (!window.MathJax?.tex2svgPromise) {
      console.warn('MathJax未初始化，等待初始化...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (!window.MathJax?.tex2svgPromise) {
        throw new Error('MathJax初始化超时')
      }
    }
    
    const svgHtml = await convertLatexToSvg(`$${formula.value}$`)
    renderedFormula.value = svgHtml
    console.log('当前公式渲染成功')
  } catch (error) {
    console.error('公式渲染失败:', error)
    renderedFormula.value = `<span class="text-2xl font-mono text-red-500">${formula.value}</span>`
  }
}

// 渲染示例公式
const renderExamples = async () => {
  console.log('开始渲染示例公式...')
  
  for (let i = 0; i < examples.value.length; i++) {
    const example = examples.value[i]
    try {
      console.log(`渲染示例 ${i + 1}:`, example.latex)
      
      // 检查MathJax是否已经初始化
      if (!window.MathJax?.tex2svgPromise) {
        console.warn('MathJax未初始化，等待初始化...')
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (!window.MathJax?.tex2svgPromise) {
          throw new Error('MathJax初始化超时')
        }
      }
      
      const svgHtml = await convertLatexToSvg(`$${example.latex}$`)
      example.rendered = svgHtml
      console.log(`示例 ${i + 1} 渲染成功`)
    } catch (error) {
      console.warn('示例公式渲染失败:', example.latex, error)
      example.rendered = `<span class="text-sm font-mono text-red-500">${example.latex}</span>`
    }
    
    // 添加小延迟避免过快渲染
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  console.log('所有示例公式渲染完成')
}

// 事件处理
function handleRichTextChange(value: string) {
  console.log('富文本内容变化:', value)
}

function handleFormulaInsert(latex: string) {
  formula.value = latex
  console.log('插入公式:', latex)
  renderFormula()
}

function handleFocus() {
  console.log('编辑器获得焦点')
}

function handleBlur() {
  console.log('编辑器失去焦点')
}

function loadExample(latex: string, index: number) {
  formula.value = latex
  activeExample.value = index
  renderFormula()
}

function clearContent() {
  richTextContent.value = ''
}

function loadSample() {
  richTextContent.value = `**数学公式编辑器示例**

这里展示了各种数学公式的使用方法：

## 基础公式

质能方程：$E = mc^2$

勾股定理：$a^2 + b^2 = c^2$

## 复杂公式

二次方程求根：
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

积分：
$$\\int_0^1 x^2 dx = \\frac{1}{3}$$

## 希腊字母

$\\alpha, \\beta, \\gamma, \\delta, \\epsilon$

$\\pi, \\sigma, \\omega, \\Omega$

点击任意公式即可编辑！`
}

async function testMathJax() {
  console.log('手动测试MathJax...')
  console.log('window.MathJax:', window.MathJax)
  console.log('tex2svgPromise:', window.MathJax?.tex2svgPromise)
  
  try {
    if (window.MathJax?.tex2svgPromise) {
      console.log('MathJax可用，测试渲染...')
      const testLatex = 'E = mc^2'
      const result = await convertLatexToSvg(`$${testLatex}$`)
      console.log('测试渲染结果:', result)
      
      // 更新当前公式
      formula.value = testLatex
      await renderFormula()
      
      // 重新渲染示例
      await renderExamples()
    } else {
      console.log('MathJax不可用，尝试重新初始化...')
      await initMathJax()
      console.log('重新初始化完成')
      
      // 再次测试
      if (window.MathJax?.tex2svgPromise) {
        await renderFormula()
        await renderExamples()
      }
    }
  } catch (error) {
    console.error('MathJax测试失败:', error)
  }
}

// 生命周期
onMounted(async () => {
  console.log('示例页面初始化，开始加载MathJax...')
  try {
    // 初始化MathJax
    await initMathJax()
    console.log('MathJax初始化完成')
    
    // 等待一段时间确保MathJax完全加载
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 检查MathJax是否真正可用
    if (window.MathJax?.tex2svgPromise) {
      console.log('MathJax tex2svgPromise 可用，开始渲染公式...')
      
      // 渲染当前公式
      await renderFormula()
      
      // 渲染示例公式
      await renderExamples()
      
      console.log('示例页面初始化完成')
    } else {
      console.error('MathJax初始化失败：tex2svgPromise不可用')
      // 设置错误状态
      renderedFormula.value = '<span class="text-red-500">MathJax加载失败</span>'
      examples.value.forEach(example => {
        example.rendered = `<span class="text-sm font-mono text-red-500">加载失败</span>`
      })
    }
  } catch (error) {
    console.error('示例页面初始化失败:', error)
    // 设置错误状态
    renderedFormula.value = '<span class="text-red-500">初始化失败</span>'
    examples.value.forEach(example => {
      example.rendered = `<span class="text-sm font-mono text-red-500">初始化失败</span>`
    })
  }
})
</script>

<style scoped>
/* 保持原有的响应式设计和动画效果 */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .text-6xl {
    font-size: 3rem;
  }
  
  .text-7xl {
    font-size: 4rem;
  }
  
  .hidden.md\\:flex {
    display: none;
  }
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 代码块样式优化 */
.prose code {
  background-color: #f1f5f9;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

/* 数学公式样式 */
.math-formula {
  display: inline-block;
  margin: 0.25rem;
}

/* 加载动画 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>