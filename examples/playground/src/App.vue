<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
    <!-- 头部导航 -->
    <header class="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors duration-300">
      <div class="container mx-auto flex h-16 items-center justify-between px-4">
        <div class="flex items-center space-x-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <CalculatorIcon class="h-5 w-5" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Vue MathJax</h1>
            <p class="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">Beautiful Editor</p>
          </div>
        </div>
        <!-- 桌面端导航 -->
        <nav class="hidden md:flex items-center space-x-8">
          <a href="#editor" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">编辑器</a>
          <a href="#features" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">功能特性</a>
          <a href="#examples" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">示例</a>
          <a href="#docs" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">文档</a>
          
          <!-- 主题切换按钮 -->
          <button
            @click="toggleTheme"
            class="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
            :aria-label="isDark ? '暗色主题' : '亮色主题'"
            :title="isDark ? '切换到亮色主题' : '切换到暗色主题'"
          >
            <div class="relative w-5 h-5">
              <!-- 太阳图标 -->
              <svg 
                v-show="!isDark"
                class="absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
              </svg>
              
              <!-- 月亮图标 -->
              <svg 
                v-show="isDark"
                class="absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110"
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </div>
          </button>
        </nav>

        <!-- 移动端导航 -->
        <div class="flex md:hidden items-center space-x-2">
          <!-- 主题切换按钮 -->
          <button
            @click="toggleTheme"
            class="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
            :aria-label="isDark ? '暗色主题' : '亮色主题'"
            :title="isDark ? '切换到亮色主题' : '切换到暗色主题'"
          >
            <div class="relative w-4 h-4">
              <!-- 太阳图标 -->
              <svg 
                v-show="!isDark"
                class="absolute inset-0 w-4 h-4 text-yellow-500 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
              </svg>
              
              <!-- 月亮图标 -->
              <svg 
                v-show="isDark"
                class="absolute inset-0 w-4 h-4 text-blue-400 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110"
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </div>
          </button>

          <!-- 汉堡菜单按钮 -->
          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            aria-label="打开菜单"
          >
            <svg 
              v-show="!showMobileMenu"
              class="w-5 h-5 text-gray-600 dark:text-gray-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              v-show="showMobileMenu"
              class="w-5 h-5 text-gray-600 dark:text-gray-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 移动端菜单面板 -->
      <Transition name="mobile-menu">
        <div 
          v-if="showMobileMenu" 
          class="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300"
        >
          <div class="container mx-auto px-4 py-4 space-y-3">
            <a 
              href="#editor" 
              @click="closeMobileMenu"
              class="block py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              编辑器
            </a>
            <a 
              href="#features" 
              @click="closeMobileMenu"
              class="block py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              功能特性
            </a>
            <a 
              href="#examples" 
              @click="closeMobileMenu"
              class="block py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              示例
            </a>
            <a 
              href="#docs" 
              @click="closeMobileMenu"
              class="block py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              文档
            </a>
          </div>
        </div>
      </Transition>
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
              <span class="mt-2 block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                编辑器
              </span>
            </h1>
            <p class="mt-6 text-lg leading-8 text-blue-100 sm:text-xl">
              专业的数学公式编辑器组件库，提供 240+ 符号面板、38 个公式模板，支持富文本编辑和 LaTeX 语法
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
             <h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl transition-colors duration-300">在线演示</h2>
             <p class="mt-4 text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">体验专业的数学公式编辑器和富文本编辑功能</p>
             <div class="mt-6 flex flex-wrap justify-center gap-4">
               <div class="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
                 <CalculatorIcon class="h-4 w-4 text-purple-600" />
                 <span class="text-sm font-medium text-purple-800">专业公式编辑器</span>
               </div>
               <div class="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
                 <Edit3Icon class="h-4 w-4 text-blue-600" />
                 <span class="text-sm font-medium text-blue-800">富文本编辑器</span>
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
                     <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">VueMathjaxBeautiful - 专业公式编辑器</h3>
                     <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300 mt-0.5">提供 240+ 数学符号和 38 个公式模板，支持实时预览和LaTeX语法</p>
                   </div>
                 </div>
                 <div class="flex items-center gap-2 flex-shrink-0">
                   <span class="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/30 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:text-purple-300 transition-colors duration-300">
                     内联模式
                   </span>
                   <span class="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-300 transition-colors duration-300">
                     实时预览
                   </span>
                 </div>
               </div>
             </div>
             <div class="p-4 sm:p-6">
               <!-- 使用 VueMathjaxBeautiful 组件 -->
               <VueMathjaxBeautiful
                 :inline-mode="true"
                 :theme="isDark ? 'dark' : 'light'"
                 @insert="handleFormulaInsert"
               />
               <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors duration-300">
                 <div class="flex items-start gap-3">
                   <div class="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                     <span class="text-white text-xs font-bold">💡</span>
                   </div>
                   <div class="text-sm text-blue-800 dark:text-blue-200 transition-colors duration-300">
                     <p class="font-medium mb-1">使用提示：</p>
                     <ul class="space-y-1 text-blue-700 dark:text-blue-300 transition-colors duration-300">
                       <li>• 点击符号面板中的符号快速插入</li>
                       <li>• 支持直接输入 LaTeX 语法</li>
                       <li>• 实时预览让您所见即所得</li>
                       <li>• 支持弹窗模式和内联模式两种使用方式</li>
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
                     <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">VueMathjaxEditor - 富文本编辑器</h3>
                     <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300 mt-0.5">支持文本格式和数学公式的混合编辑，适合编写包含数学内容的文档</p>
                   </div>
                 </div>
                 <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                   <div class="flex items-center gap-2">
                     <span class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300 transition-colors duration-300">
                       富文本
                     </span>
                     <span class="inline-flex items-center rounded-full bg-orange-100 dark:bg-orange-900/30 px-2.5 py-0.5 text-xs font-medium text-orange-800 dark:text-orange-300 transition-colors duration-300">
                       LaTeX支持
                     </span>
                   </div>
                   <div class="flex gap-2">
                     <button @click="clearContent" 
                             class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300 flex-shrink-0">
                       清空内容
                     </button>
                     <button @click="loadSample" 
                             class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300 flex-shrink-0">
                       加载示例
                     </button>
                   </div>
                 </div>
               </div>
             </div>
             <div class="p-4 sm:p-6">
               <div class="min-h-[300px] sm:min-h-[400px]">
                 <VueMathjaxEditor 
                   v-model="richTextContent"
                   :theme="isDark ? 'dark' : 'light'"
                   placeholder="开始编写您的内容，支持富文本编辑和数学公式..."
                   @change="handleRichTextChange"
                   @focus="handleFocus"
                   @blur="handleBlur"
                 />
               </div>
               <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg transition-colors duration-300">
                   <div class="flex items-start gap-3">
                     <div class="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                       <span class="text-white text-xs font-bold">✓</span>
                     </div>
                     <div class="text-sm text-green-800 dark:text-green-200 transition-colors duration-300">
                       <p class="font-medium mb-1">LaTeX 语法示例：</p>
                       <ul class="space-y-1 text-green-700 dark:text-green-300 font-mono text-xs transition-colors duration-300">
                         <li>• 行内公式：<code class="bg-green-100 dark:bg-green-800 px-1 rounded">$E=mc^2$</code></li>
                         <li>• 独立公式：<code class="bg-green-100 dark:bg-green-800 px-1 rounded">$$\int_0^1 x^2 dx$$</code></li>
                         <li>• 分数：<code class="bg-green-100 dark:bg-green-800 px-1 rounded">\frac{a}{b}</code></li>
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
                       <p class="font-medium mb-1">快捷键：</p>
                       <ul class="space-y-1 text-amber-700 dark:text-amber-300 text-xs transition-colors duration-300">
                         <li>• <kbd class="px-1 bg-amber-100 dark:bg-amber-800 rounded">Ctrl+B</kbd> 粗体</li>
                         <li>• <kbd class="px-1 bg-amber-100 dark:bg-amber-800 rounded">Ctrl+I</kbd> 斜体</li>
                         <li>• <kbd class="px-1 bg-amber-100 dark:bg-amber-800 rounded">Ctrl+U</kbd> 下划线</li>
                       </ul>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>

      <!-- 功能特性 -->
      <section id="features" class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl transition-colors duration-300">功能特性</h2>
            <p class="mt-4 text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">为数学内容创作提供完整解决方案</p>
          </div>
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="(feature, index) in features" 
                 :key="index" 
                 class="group rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div :class="`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color} mb-4`">
                <component :is="feature.icon" class="h-6 w-6 text-white" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">{{ feature.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

             <!-- 示例展示 -->
       <section id="examples" class="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
         <div class="container mx-auto px-4">
           <div class="text-center mb-16">
             <h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl transition-colors duration-300">公式示例库</h2>
             <p class="mt-4 text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">点击示例快速加载到公式编辑器，体验不同类型的数学公式</p>
           </div>
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div v-for="(example, index) in examples" 
                 :key="example.name"
                 :class="`cursor-pointer rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                   activeExample === index ? 'ring-2 ring-blue-500 border-blue-200 dark:border-blue-600' : 'border-gray-100 dark:border-gray-700'
                 }`"
                 @click="loadExample(example.latex, index)">
              <div class="text-center space-y-3">
                <span class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300 transition-colors duration-300">
                  {{ example.category }}
                </span>
                <div class="text-lg font-mono min-h-[40px] flex items-center justify-center dark:text-white transition-colors duration-300" 
                     v-html="example.rendered"></div>
                <h4 class="font-semibold text-gray-900 dark:text-white transition-colors duration-300">{{ example.name }}</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用文档 -->
      <section id="docs" class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl transition-colors duration-300">使用文档</h2>
            <p class="mt-4 text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">完整的使用指南和API文档</p>
          </div>
          <div class="grid gap-8 lg:grid-cols-2">
            <!-- 安装说明 -->
            <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                <CodeIcon class="h-5 w-5 text-blue-600 dark:text-blue-400" />
                安装
              </h3>
              <div class="space-y-3">
                <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm transition-colors duration-300">
                  npm install vue-mathjax-beautiful
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">或者使用 yarn：</p>
                <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm transition-colors duration-300">
                  yarn add vue-mathjax-beautiful
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">或者使用 pnpm（推荐）：</p>
                <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm transition-colors duration-300">
                  pnpm add vue-mathjax-beautiful
                </div>
              </div>
            </div>

            <!-- 基本使用 -->
            <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                <ZapIcon class="h-5 w-5 text-green-600 dark:text-green-400" />
                基本使用
              </h3>
              <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm transition-colors duration-300">
                <div class="text-blue-400 dark:text-blue-300">&lt;template&gt;</div>
                <div class="ml-2 text-green-400 dark:text-green-300">&lt;VueMathjaxEditor v-model="content" /&gt;</div>
                <div class="text-blue-400 dark:text-blue-300">&lt;/template&gt;</div>
                <br>
                <div class="text-blue-400 dark:text-blue-300">&lt;script setup&gt;</div>
                <div class="ml-2 text-yellow-400 dark:text-yellow-300">import { VueMathjaxEditor } from 'vue-mathjax-beautiful'</div>
                <div class="text-blue-400 dark:text-blue-300">&lt;/script&gt;</div>
              </div>
            </div>

            <!-- 组件介绍 -->
            <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                <CalculatorIcon class="h-5 w-5 text-purple-600 dark:text-purple-400" />
                核心组件
              </h3>
              <div class="space-y-4 text-sm">
                <div class="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg transition-colors duration-300">
                  <div class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong class="text-purple-900 dark:text-purple-200 transition-colors duration-300">VueMathjaxBeautiful</strong>
                      <p class="text-purple-700 dark:text-purple-300 mt-1 transition-colors duration-300">专业公式编辑器，提供 240+ 符号面板和 38 个公式模板，支持内联和弹窗两种模式</p>
                    </div>
                  </div>
                </div>
                <div class="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors duration-300">
                  <div class="flex items-start gap-3">
                    <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong class="text-blue-900 dark:text-blue-200 transition-colors duration-300">VueMathjaxEditor</strong>
                      <p class="text-blue-700 dark:text-blue-300 mt-1 transition-colors duration-300">富文本编辑器，支持文本格式和数学公式混合编辑，适合编写学术文档</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- API 属性 -->
            <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                <SettingsIcon class="h-5 w-5 text-orange-600 dark:text-orange-400" />
                API 属性
              </h3>
              <div class="space-y-3 text-sm">
                <div class="border-l-4 border-blue-500 pl-3">
                  <div class="font-mono font-semibold text-gray-900 dark:text-white transition-colors duration-300">v-model</div>
                  <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">绑定的内容值 (string)</div>
                </div>
                <div class="border-l-4 border-green-500 pl-3">
                  <div class="font-mono font-semibold text-gray-900 dark:text-white transition-colors duration-300">placeholder</div>
                  <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">占位符文本 (string)</div>
                </div>
                <div class="border-l-4 border-purple-500 pl-3">
                  <div class="font-mono font-semibold text-gray-900 dark:text-white transition-colors duration-300">min-height</div>
                  <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">最小高度 (string, 默认: "200px")</div>
                </div>
                <div class="border-l-4 border-orange-500 pl-3">
                  <div class="font-mono font-semibold text-gray-900 dark:text-white transition-colors duration-300">readonly</div>
                  <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">只读模式 (boolean, 默认: false)</div>
                </div>
              </div>
            </div>

            <!-- 事件说明 -->
            <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                <ZapIcon class="h-5 w-5 text-red-600 dark:text-red-400" />
                事件说明
              </h3>
              <div class="space-y-3 text-sm">
                <div class="border-l-4 border-blue-500 pl-3">
                  <div class="font-mono font-semibold text-gray-900 dark:text-white transition-colors duration-300">@change</div>
                  <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">内容变化时触发 (value: string)</div>
                </div>
                <div class="border-l-4 border-green-500 pl-3">
                  <div class="font-mono font-semibold text-gray-900 dark:text-white transition-colors duration-300">@focus</div>
                  <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">编辑器获得焦点时触发</div>
                </div>
                <div class="border-l-4 border-purple-500 pl-3">
                  <div class="font-mono font-semibold text-gray-900 dark:text-white transition-colors duration-300">@blur</div>
                  <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">编辑器失去焦点时触发</div>
                </div>
              </div>
            </div>

            <!-- 快捷键说明 -->
            <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                <KeyboardIcon class="h-5 w-5 text-purple-600 dark:text-purple-400" />
                快捷键
              </h3>
              <div class="space-y-3">
                <div v-for="shortcut in shortcuts" :key="shortcut.key" class="flex items-center justify-between">
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
                LaTeX 语法示例
              </h3>
              <div class="space-y-3">
                <div v-for="example in latexExamples" :key="example.code" class="flex items-center justify-between">
                  <code class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded font-mono transition-colors duration-300">{{ example.code }}</code>
                  <span class="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{{ example.description }}</span>
                </div>
              </div>
            </div>

            <!-- 高级用法 -->
            <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                <SettingsIcon class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                高级用法
              </h3>
              <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm transition-colors duration-300">
                <div class="text-gray-400 dark:text-gray-500">// 自定义配置</div>
                <div class="text-blue-400 dark:text-blue-300">&lt;VueMathjaxEditor</div>
                <div class="ml-2 text-green-400 dark:text-green-300">v-model="content"</div>
                <div class="ml-2 text-green-400 dark:text-green-300">:min-height="'500px'"</div>
                <div class="ml-2 text-green-400 dark:text-green-300">:readonly="false"</div>
                <div class="ml-2 text-green-400 dark:text-green-300">placeholder="请输入内容..."</div>
                <div class="ml-2 text-green-400 dark:text-green-300">@change="handleChange"</div>
                <div class="ml-2 text-green-400 dark:text-green-300">@focus="handleFocus"</div>
                <div class="ml-2 text-green-400 dark:text-green-300">@blur="handleBlur"</div>
                <div class="text-blue-400 dark:text-blue-300">/&gt;</div>
              </div>
            </div>

            <!-- 公式编辑器用法 -->
            <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                <CalculatorIcon class="h-5 w-5 text-pink-600 dark:text-pink-400" />
                公式编辑器用法
              </h3>
              <div class="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono text-sm transition-colors duration-300">
                <div class="text-gray-400 dark:text-gray-500">// 公式编辑器弹窗</div>
                <div class="text-blue-400 dark:text-blue-300">&lt;VueMathjaxBeautiful</div>
                <div class="ml-2 text-green-400 dark:text-green-300">v-model="showDialog"</div>
                <div class="ml-2 text-green-400 dark:text-green-300">:existing-latex="formula"</div>
                <div class="ml-2 text-green-400 dark:text-green-300">@insert="handleInsert"</div>
                <div class="text-blue-400 dark:text-blue-300">/&gt;</div>
                <br>
                <div class="text-gray-400 dark:text-gray-500">// 处理公式插入</div>
                <div class="text-yellow-400 dark:text-yellow-300">const handleInsert = (latex) => {</div>
                <div class="ml-2 text-white dark:text-gray-100">formula.value = latex</div>
                <div class="text-yellow-400 dark:text-yellow-300">}</div>
              </div>
            </div>

            <!-- 常见问题 -->
            <div class="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                <FileTextIcon class="h-5 w-5 text-red-600 dark:text-red-400" />
                常见问题
              </h3>
              <div class="space-y-4 text-sm">
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">Q: 如何插入复杂的数学公式？</div>
                  <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">A: 点击编辑器工具栏的"fx"按钮打开公式编辑器，或直接使用LaTeX语法编写。</div>
                </div>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">Q: 支持哪些LaTeX语法？</div>
                  <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">A: 支持完整的MathJax LaTeX语法，包括分数、根式、积分、矩阵等。</div>
                </div>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">Q: 如何自定义编辑器样式？</div>
                  <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">A: 可以通过CSS自定义样式，或使用min-height等属性调整编辑器外观。</div>
                </div>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">Q: 是否支持移动端？</div>
                  <div class="text-gray-600 dark:text-gray-400 transition-colors duration-300">A: 完全支持移动端，采用响应式设计，在各种设备上都有良好体验。</div>
                </div>
              </div>
            </div>

            <!-- 更多资源 -->
            <div class="rounded-xl bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <h3 class="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 transition-colors duration-300">
                <GithubIcon class="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
                更多资源
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <a href="#" class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                  <div class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">GitHub 仓库</span>
                </a>
                <a href="#examples" class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                  <div class="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">在线示例</span>
                </a>
                <a href="#" class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                  <div class="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <span class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">API 文档</span>
                </a>
                <a href="#" class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                  <div class="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                  <span class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">问题反馈</span>
                </a>
                <a href="#" class="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group sm:col-span-2">
                  <div class="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                  <span class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">更新日志</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 返回顶部按钮 -->
    <Transition name="back-to-top">
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        aria-label="返回顶部"
      >
        <svg 
          class="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        
        <!-- 进度环 -->
        <svg 
          class="absolute inset-0 h-12 w-12 -rotate-90 transform"
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            stroke-width="2"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            stroke-width="2"
            stroke-linecap="round"
            :stroke-dasharray="scrollProgress"
            stroke-dashoffset="0"
            class="transition-all duration-150"
          />
        </svg>
      </button>
    </Transition>

    <!-- 页脚 -->
    <footer class="bg-gray-900 text-white py-8 sm:py-12">
      <div class="container mx-auto px-4">
        <!-- 移动端优化的网格布局 -->
        <div class="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <!-- 主要信息区域 -->
          <div class="sm:col-span-2 lg:col-span-2">
            <div class="flex items-center space-x-3 mb-4">
              <div class="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0">
                <CalculatorIcon class="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="text-base sm:text-lg font-bold">Vue MathJax Editor</h3>
                <p class="text-xs sm:text-sm text-gray-400">专业的数学公式编辑器</p>
              </div>
            </div>
            <p class="text-sm sm:text-base text-gray-400 max-w-md leading-relaxed">
              为 Vue 3 应用提供强大的数学公式编辑功能，支持 LaTeX 语法和实时预览。
            </p>
          </div>

          <!-- 资源链接 -->
          <div class="order-1 sm:order-none">
            <h4 class="font-semibold mb-3 sm:mb-4 text-sm sm:text-base flex items-center">
              <div class="w-1 h-4 bg-blue-500 rounded mr-2"></div>
              资源
            </h4>
            <ul class="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <a href="#docs" class="hover:text-white transition-colors flex items-center py-1">
                  <span class="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 flex-shrink-0"></span>
                  文档
                </a>
              </li>
              <li>
                <a href="#examples" class="hover:text-white transition-colors flex items-center py-1">
                  <span class="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 flex-shrink-0"></span>
                  示例
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-white transition-colors flex items-center py-1">
                  <span class="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 flex-shrink-0"></span>
                  API 参考
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-white transition-colors flex items-center py-1">
                  <span class="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 flex-shrink-0"></span>
                  更新日志
                </a>
              </li>
            </ul>
          </div>

          <!-- 社区链接 -->
          <div class="order-2 sm:order-none">
            <h4 class="font-semibold mb-3 sm:mb-4 text-sm sm:text-base flex items-center">
              <div class="w-1 h-4 bg-purple-500 rounded mr-2"></div>
              社区
            </h4>
            <ul class="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <a href="#" class="hover:text-white transition-colors flex items-center py-1">
                  <GithubIcon class="w-3 h-3 mr-2 flex-shrink-0" />
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-white transition-colors flex items-center py-1">
                  <span class="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 flex-shrink-0"></span>
                  问题反馈
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-white transition-colors flex items-center py-1">
                  <span class="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 flex-shrink-0"></span>
                  讨论区
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-white transition-colors flex items-center py-1">
                  <span class="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 flex-shrink-0"></span>
                  贡献指南
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 底部版权信息 -->
        <div class="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div class="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
            <p class="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              &copy; 2024 Vue MathJax Beautiful. All rights reserved.
            </p>
            <div class="flex justify-center sm:justify-end space-x-4 sm:space-x-6">
              <a href="#" class="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">隐私政策</a>
              <a href="#" class="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">使用条款</a>
            </div>
          </div>
        </div>
      </div>
    </footer>


  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
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
const activeExample = ref(3)
const showBackToTop = ref(false)
const scrollY = ref(0)
const isDark = ref(false)
const showMobileMenu = ref(false)

// 计算滚动进度
const scrollProgress = computed(() => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight - windowHeight
  const progress = documentHeight > 0 ? (scrollY.value / documentHeight) * 125.6 : 0 // 125.6 是圆周长 (2 * π * 20)
  return `${progress} 125.6`
})

const richTextContent = ref(`**欢迎使用 Vue MathJax Beautiful！**

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
    icon: CalculatorIcon,
    title: "专业公式编辑",
    description: "基于 MathJax 引擎，提供 240+ 数学符号和 38 个公式模板，支持完整的 LaTeX 语法",
    color: "bg-purple-500",
  },
  {
    icon: PaletteIcon,
    title: "丰富符号面板",
    description: "内置基础符号、希腊字母、高级符号三大分类，涵盖代数、几何、微积分等各个领域",
    color: "bg-pink-500",
  },
  {
    icon: EyeIcon,
    title: "实时预览",
    description: "输入公式时实时预览渲染效果，所见即所得的编辑体验，支持内联和弹窗两种模式",
    color: "bg-green-500",
  },
  {
    icon: Edit3Icon,
    title: "富文本编辑",
    description: "支持粗体、斜体、下划线等文本格式，与数学公式完美结合，适合编写学术文档",
    color: "bg-blue-500",
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
  console.log('插入公式:', latex)
  // 这里可以添加处理插入公式的逻辑，比如显示通知等
}

function handleFocus() {
  console.log('编辑器获得焦点')
}

function handleBlur() {
  console.log('编辑器失去焦点')
}

function loadExample(latex: string, index: number) {
  activeExample.value = index
  console.log('加载示例:', latex)
  // 可以在这里添加将公式加载到编辑器的逻辑
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

// 返回顶部功能
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 滚动事件处理
function handleScroll() {
  scrollY.value = window.scrollY
  showBackToTop.value = window.scrollY > 300
}

// 主题切换功能 - 在亮色和暗色主题之间切换
function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  updateTheme()
}

function updateTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark', 'theme-dark')
    document.documentElement.classList.remove('theme-light')
  } else {
    document.documentElement.classList.remove('dark', 'theme-dark')
    document.documentElement.classList.add('theme-light')
  }
}

// 初始化主题
function initTheme() {
  // 检查本地存储的主题设置
  const savedTheme = localStorage.getItem('theme')
  
  if (savedTheme === 'light') {
    isDark.value = false
  } else if (savedTheme === 'dark') {
    isDark.value = true
  } else {
    // 没有保存的主题，使用系统默认
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  
  updateTheme()
}

// 移动端菜单功能
function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value
}

function closeMobileMenu() {
  showMobileMenu.value = false
}



// 注意：快捷符号渲染已移至 VueMathjaxBeautiful 组件内部

// 生命周期
onMounted(async () => {
  console.log('示例页面初始化，开始加载MathJax...')
  
  // 初始化主题
  initTheme()
  
  // 添加滚动事件监听器
  window.addEventListener('scroll', handleScroll)
  
  try {
    // 初始化MathJax
    await initMathJax()
    console.log('MathJax初始化完成')
    
    // 等待一段时间确保MathJax完全加载
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 检查MathJax是否真正可用
    if (window.MathJax?.tex2svgPromise) {
      console.log('MathJax tex2svgPromise 可用，开始渲染...')
      
      // 渲染示例公式
      await renderExamples()
      
      console.log('示例页面初始化完成')
    } else {
      console.error('MathJax初始化失败：tex2svgPromise不可用')
      // 设置错误状态
      examples.value.forEach(example => {
        example.rendered = `<span class="text-sm font-mono text-red-500">加载失败</span>`
      })
    }
  } catch (error) {
    console.error('示例页面初始化失败:', error)
    // 设置错误状态
    examples.value.forEach(example => {
      example.rendered = `<span class="text-sm font-mono text-red-500">初始化失败</span>`
    })
  }
})

// 清理事件监听器
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
  
  /* 移动端卡片头部优化 */
  .card-header-mobile {
    padding: 1rem;
  }
  
  .card-header-mobile h3 {
    font-size: 1rem;
    line-height: 1.4;
  }
  
  .card-header-mobile p {
    font-size: 0.75rem;
    line-height: 1.3;
    margin-top: 0.25rem;
  }
  
  /* 移动端按钮优化 */
  .mobile-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    min-width: auto;
  }
  
  /* 移动端标签优化 */
  .mobile-badge {
    padding: 0.25rem 0.5rem;
    font-size: 0.625rem;
  }
  
  /* 移动端卡片间距优化 */
  .demo-card {
    margin-bottom: 2rem;
  }
  
  /* 移动端文字换行优化 */
  .text-wrap-mobile {
    word-break: break-word;
    hyphens: auto;
  }
  
  /* 移动端编辑器高度调整 */
  .editor-mobile {
    min-height: 250px !important;
  }
  
  /* 移动端Footer优化 */
  footer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  footer .container {
    padding-left: 0;
    padding-right: 0;
  }
  
  /* 移动端链接点击区域优化 */
  footer a {
    min-height: 44px;
    display: flex;
    align-items: center;
  }
  
  /* 移动端标题间距优化 */
  footer h4 {
    margin-bottom: 0.75rem;
  }
  
  /* 移动端版权信息优化 */
  footer .border-t {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
  }
  
  /* 移动端触摸优化 */
  .touch-target {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* 移动端资源链接优化 */
  .resource-link {
    padding: 0.75rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }
  
  .resource-link:active {
    transform: scale(0.98);
    background-color: rgba(59, 130, 246, 0.1);
  }
  
  /* 移动端网格间距优化 */
  @media (max-width: 640px) {
    .docs-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .footer-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .resource-grid {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
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

/* 暗黑模式滚动条 */
@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-track {
    background: #1f2937;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #4b5563;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
}

/* 手动暗黑模式滚动条 */
.dark ::-webkit-scrollbar-track {
  background: #1f2937;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* 代码块样式优化 */
.prose code {
  background-color: #f1f5f9;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

/* 暗黑模式代码块 */
.dark .prose code {
  background-color: #374151;
  color: #e5e7eb;
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

/* 返回顶部按钮动画 */
.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.back-to-top-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

/* 返回顶部按钮悬停效果 */
.back-to-top-button {
  backdrop-filter: blur(8px);
}

.back-to-top-button:hover {
  backdrop-filter: blur(12px);
}

/* 进度环动画 */
.back-to-top-button circle:last-child {
  transition: stroke-dasharray 0.2s ease-out;
}

/* 移动端菜单动画 */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>