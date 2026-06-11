/**
 * MathJax 渲染选项
 */
export interface MathJaxRenderOptions {
  display?: boolean;
  scale?: number;
  em?: number;
  ex?: number;
  containerWidth?: number;
}

/**
 * MathJax 配置选项
 */
export interface MathJaxConfig {
  tex?: {
    inlineMath?: string[][];
    displayMath?: string[][];
    processEscapes?: boolean;
    processEnvironments?: boolean;
    packages?: string[];
  };
  svg?: {
    fontCache?: 'global' | 'none';
    displayAlign?: 'left' | 'center' | 'right';
    scale?: number;
    minScale?: number;
    mtextInheritFont?: boolean;
    merrorInheritFont?: boolean;
    mathmlSpacing?: boolean;
    displayIndent?: string;
  };
  chtml?: {
    scale?: number;
    mtextInheritFont?: boolean;
    merrorInheritFont?: boolean;
  };
  options?: {
    ignoreHtmlClass?: string;
    processHtmlClass?: string;
  };
}

/**
 * MathJax 启动配置
 */
export interface MathJaxStartup {
  defaultPageReady?: () => Promise<void>;
  defaultReady?: () => void;
  ready?: () => void;
  promise?: Promise<void>;
}

/**
 * MathJax 实例类型
 */
export interface MathJaxInstance {
  tex2svgPromise: (latex: string, options?: MathJaxRenderOptions) => Promise<HTMLElement>;
  tex2svg: (latex: string, options?: MathJaxRenderOptions) => HTMLElement;
  typesetPromise?: (elements: HTMLElement[]) => Promise<void>;
  startup?: MathJaxStartup;
  tex?: MathJaxConfig['tex'];
  svg?: MathJaxConfig['svg'];
  chtml?: MathJaxConfig['chtml'];
  options?: MathJaxConfig['options'];
}

declare global {
  interface Window {
    MathJax?: Partial<MathJaxInstance>;
  }
}

export {};
