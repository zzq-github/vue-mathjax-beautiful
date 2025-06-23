// plugins/mathjax.client.ts
export default defineNuxtPlugin(() => {
  if (import.meta.client && !window.MathJax || typeof window.MathJax !== 'object') {
    initMathJax();
     // 加载 MathJax
     const script = document.createElement('script');
     script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
     script.async = true;
     document.head.appendChild(script);
 
     script.onload = () => {
       // MathJax 加载完成后执行
       // console.log('MathJax loaded');
     };
  }

  function initMathJax() {
    if (import.meta.client) {
      window.MathJax = {
        startup: {
          pageReady: () => {
          return window.MathJax.startup.defaultPageReady();
        },
      },
      loader: { load: ['input/tex', 'output/svg'] }, // 加载tex和svg模块
      skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'a'], //避开某些标签
      tags: 'all', // 为方程式编号
      tagSide: 'left', // 方程式编号的位置
      tex: {
        inlineMath: [
          ['$', '$'],
          ['\\(', '\\)'],
        ],
        displayMath: [
          // start/end delimiter pairs for display math
          ['$$', '$$'],
          ['\\[', '\\]'],
        ],
      },
      'HTML-CSS': {
        availableFonts: ['STIX', 'TeX'], //可选字体
        showMathMenu: false, //关闭右击菜单显示
      },
      svg: {
        fontCache: 'global', // or 'global' or 'none',
        displayAlign: 'left',
        scale: 1.2, // 增加整体缩放
        minScale: 0.8, // 最小缩放
        mtextInheritFont: true, // 继承字体
        merrorInheritFont: true, // 错误信息继承字体
        mathmlSpacing: false, // 使用TeX间距
        displayIndent: '0', // 显示缩进
      },
      chtml: {
        scale: 1.2, // CHTML输出的缩放
        minScale: 0.8,
        mtextInheritFont: true,
        merrorInheritFont: true
      }
      };
    }
  }
});
