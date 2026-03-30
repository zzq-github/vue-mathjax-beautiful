/**
 * MathJax 懒加载模块
 * 实现按需加载和代码分割
 */

import { logger } from './logger';

// MathJax 加载状态
let mathJaxLoadPromise: Promise<void> | null = null;
let isMathJaxLoaded = false;

/**
 * 检查 MathJax 是否已加载
 */
export function isMathJaxReady(): boolean {
  return isMathJaxLoaded && !!window.MathJax?.tex2svgPromise;
}

/**
 * 懒加载 MathJax
 * 使用动态导入和单例模式避免重复加载
 */
export async function lazyLoadMathJax(): Promise<void> {
  // 如果已经加载，直接返回
  if (isMathJaxReady()) {
    return;
  }

  // 如果正在加载，返回现有的 Promise
  if (mathJaxLoadPromise) {
    return mathJaxLoadPromise;
  }

  // 创建新的加载 Promise
  mathJaxLoadPromise = loadMathJaxInternal();
  
  try {
    await mathJaxLoadPromise;
    isMathJaxLoaded = true;
    logger.info('MathJax 懒加载成功');
  } catch (error) {
    mathJaxLoadPromise = null;
    logger.error('MathJax 懒加载失败', error);
    throw error;
  }
}

/**
 * 内部加载逻辑
 */
async function loadMathJaxInternal(): Promise<void> {
  if (typeof window === 'undefined') {
    throw new Error('MathJax can only be loaded in browser environment');
  }

  // 检查是否已存在
  if (window.MathJax?.tex2svgPromise) {
    return;
  }

  // 配置 MathJax
  if (!window.MathJax) {
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
      },
      svg: {
        fontCache: 'global',
        displayAlign: 'left',
        scale: 1.0,
        mtextInheritFont: true,
        merrorInheritFont: true,
        mathmlSpacing: false,
        displayIndent: '0',
      },
      chtml: {
        scale: 1.0,
        mtextInheritFont: true,
        merrorInheritFont: true,
      },
    };
  }

  // 加载脚本
  await loadMathJaxScript();

  // 等待初始化完成
  await waitForMathJaxReady();
}

/**
 * 加载 MathJax 脚本
 */
async function loadMathJaxScript(): Promise<void> {
  const urls = [
    '/mathjax/tex-svg.js',
    '/mathjax/es5/tex-svg.js',
    'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js',
    'https://unpkg.com/mathjax@3/es5/tex-svg.js',
  ];

  for (const url of urls) {
    try {
      await loadScript(url);
      logger.info(`MathJax 脚本加载成功: ${url}`);
      return;
    } catch (error) {
      logger.warn(`MathJax 脚本加载失败: ${url}`, error);
      continue;
    }
  }

  throw new Error('所有 MathJax CDN 加载失败');
}

/**
 * 加载单个脚本
 */
function loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // 检查脚本是否已存在
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.id = `mathjax-${Date.now()}`;

    const timeout = setTimeout(() => {
      reject(new Error(`加载超时: ${url}`));
    }, 10000);

    script.onload = () => {
      clearTimeout(timeout);
      resolve();
    };

    script.onerror = () => {
      clearTimeout(timeout);
      reject(new Error(`加载失败: ${url}`));
    };

    document.head.appendChild(script);
  });
}

/**
 * 等待 MathJax 就绪
 */
async function waitForMathJaxReady(): Promise<void> {
  const maxRetries = 100;
  let retries = 0;

  while (!window.MathJax?.tex2svgPromise && retries < maxRetries) {
    await new Promise(resolve => setTimeout(resolve, 100));
    retries++;
  }

  if (!window.MathJax?.tex2svgPromise) {
    throw new Error('MathJax 初始化超时');
  }
}

/**
 * 预加载 MathJax（在空闲时）
 */
export function preloadMathJax(): void {
  if (typeof window === 'undefined') return;
  
  // 使用 requestIdleCallback 或 setTimeout 在空闲时加载
  const schedule = (window as unknown as { requestIdleCallback?: typeof setTimeout }).requestIdleCallback || setTimeout;
  
  schedule(() => {
    if (!isMathJaxReady()) {
      lazyLoadMathJax().catch(() => {
        // 预加载失败不抛出错误
      });
    }
  });
}

/**
 * 重置加载状态（用于测试）
 */
export function resetMathJaxLoadState(): void {
  mathJaxLoadPromise = null;
  isMathJaxLoaded = false;
}
