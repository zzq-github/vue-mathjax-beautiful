import { ref, computed, onMounted, onUnmounted } from 'vue';

// 断点定义（与 Tailwind 一致）
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export type Breakpoint = keyof typeof breakpoints;

/**
 * 移动端检测组合式函数
 */
export function useMobile() {
  const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const windowHeight = ref(typeof window !== 'undefined' ? window.innerHeight : 768);
  const isTouch = ref(false);
  const isLandscape = ref(false);

  // 是否是移动端
  const isMobile = computed(() => windowWidth.value < breakpoints.md);
  
  // 是否是平板
  const isTablet = computed(() => {
    const width = windowWidth.value;
    return width >= breakpoints.md && width < breakpoints.lg;
  });
  
  // 是否是桌面
  const isDesktop = computed(() => windowWidth.value >= breakpoints.lg);

  // 当前断点
  const currentBreakpoint = computed<Breakpoint>(() => {
    const width = windowWidth.value;
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    return 'sm';
  });

  // 屏幕尺寸分类
  const screenSize = computed(() => {
    if (isMobile.value) return 'mobile';
    if (isTablet.value) return 'tablet';
    return 'desktop';
  });

  // 更新窗口尺寸
  const updateWindowSize = () => {
    if (typeof window === 'undefined') return;
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
    isLandscape.value = window.innerWidth > window.innerHeight;
  };

  // 检测触摸设备
  const detectTouch = () => {
    if (typeof window === 'undefined') return;
    isTouch.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  // 防抖处理
  let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
  const handleResize = () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateWindowSize, 100);
  };

  onMounted(() => {
    if (typeof window === 'undefined') return;
    
    updateWindowSize();
    detectTouch();
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', updateWindowSize);
  });

  onUnmounted(() => {
    if (typeof window === 'undefined') return;
    
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('orientationchange', updateWindowSize);
    
    if (resizeTimeout) clearTimeout(resizeTimeout);
  });

  return {
    windowWidth,
    windowHeight,
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    isLandscape,
    currentBreakpoint,
    screenSize,
  };
}

/**
 * 移动端优化配置
 */
export interface MobileOptimizationConfig {
  // 虚拟键盘处理
  virtualKeyboard: {
    adjustHeight: boolean;
    minVisibleHeight: number;
  };
  // 触摸优化
  touch: {
    tapDelay: number;
    swipeEnabled: boolean;
    longPressDelay: number;
  };
  // 性能优化
  performance: {
    reduceAnimations: boolean;
    lazyRender: boolean;
    maxSymbolsPerRow: number;
  };
  // UI 适配
  ui: {
    compactMode: boolean;
    bottomSheet: boolean;
    fullScreenDialog: boolean;
  };
}

// 默认移动端配置
export const defaultMobileConfig: MobileOptimizationConfig = {
  virtualKeyboard: {
    adjustHeight: true,
    minVisibleHeight: 300,
  },
  touch: {
    tapDelay: 0,
    swipeEnabled: true,
    longPressDelay: 500,
  },
  performance: {
    reduceAnimations: true,
    lazyRender: true,
    maxSymbolsPerRow: 4,
  },
  ui: {
    compactMode: true,
    bottomSheet: true,
    fullScreenDialog: true,
  },
};

/**
 * 移动端优化组合式函数
 */
export function useMobileOptimization(
  customConfig: Partial<MobileOptimizationConfig> = {}
) {
  const config = ref<MobileOptimizationConfig>({
    ...defaultMobileConfig,
    ...customConfig,
  });

  const mobile = useMobile();

  // 是否启用移动端优化
  const isOptimizationEnabled = computed(() => mobile.isMobile.value || mobile.isTablet.value);

  // 虚拟键盘高度（估算）
  const virtualKeyboardHeight = ref(0);

  // 可见区域高度
  const visibleHeight = computed(() => {
    return mobile.windowHeight.value - virtualKeyboardHeight.value;
  });

  // 检测虚拟键盘
  const detectVirtualKeyboard = () => {
    if (typeof window === 'undefined' || !mobile.isMobile.value) return;

    const viewportHeight = window.visualViewport?.height || window.innerHeight;
    const windowHeight = window.innerHeight;
    
    if (viewportHeight < windowHeight) {
      virtualKeyboardHeight.value = windowHeight - viewportHeight;
    } else {
      virtualKeyboardHeight.value = 0;
    }
  };

  // 触摸事件处理
  const touchHandlers = {
    // 防止双击缩放
    preventDoubleTap: (e: TouchEvent) => {
      if (!mobile.isTouch.value) return;
      
      const now = Date.now();
      const lastTouch = (touchHandlers as unknown as { lastTouchTime: number }).lastTouchTime || 0;
      
      if (now - lastTouch < 300) {
        e.preventDefault();
      }
      (touchHandlers as unknown as { lastTouchTime: number }).lastTouchTime = now;
    },

    // 长按检测
    longPress: {
      timer: null as ReturnType<typeof setTimeout> | null,
      start: (callback: () => void) => {
        if (!mobile.isTouch.value) return;
        touchHandlers.longPress.timer = setTimeout(callback, config.value.touch.longPressDelay);
      },
      end: () => {
        if (touchHandlers.longPress.timer) {
          clearTimeout(touchHandlers.longPress.timer);
          touchHandlers.longPress.timer = null;
        }
      },
    },
  };

  onMounted(() => {
    if (typeof window === 'undefined') return;
    
    window.visualViewport?.addEventListener('resize', detectVirtualKeyboard);
    document.addEventListener('touchstart', touchHandlers.preventDoubleTap, { passive: false });
  });

  onUnmounted(() => {
    if (typeof window === 'undefined') return;
    
    window.visualViewport?.removeEventListener('resize', detectVirtualKeyboard);
    document.removeEventListener('touchstart', touchHandlers.preventDoubleTap);
    touchHandlers.longPress.end();
  });

  // 响应式样式
  const responsiveStyles = computed(() => {
    if (!isOptimizationEnabled.value) return {};

    const styles: Record<string, string> = {};

    if (config.value.ui.compactMode) {
      styles['--math-editor-padding'] = '12px';
      styles['--math-editor-gap'] = '8px';
      styles['--math-editor-font-size'] = '14px';
    }

    if (config.value.performance.reduceAnimations) {
      styles['--math-editor-transition'] = 'none';
    }

    return styles;
  });

  return {
    ...mobile,
    config,
    isOptimizationEnabled,
    virtualKeyboardHeight,
    visibleHeight,
    touchHandlers,
    responsiveStyles,
  };
}

/**
 * 安全区域适配（刘海屏等）
 */
export function useSafeArea() {
  const safeAreaInsets = ref({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const updateSafeArea = () => {
    if (typeof window === 'undefined') return;

    const styles = getComputedStyle(document.documentElement);
    safeAreaInsets.value = {
      top: parseInt(styles.getPropertyValue('--sat') || '0', 10),
      right: parseInt(styles.getPropertyValue('--sar') || '0', 10),
      bottom: parseInt(styles.getPropertyValue('--sab') || '0', 10),
      left: parseInt(styles.getPropertyValue('--sal') || '0', 10),
    };
  };

  onMounted(() => {
    updateSafeArea();
  });

  return {
    safeAreaInsets,
    cssSafeArea: computed(() => ({
      paddingTop: `${safeAreaInsets.value.top}px`,
      paddingRight: `${safeAreaInsets.value.right}px`,
      paddingBottom: `${safeAreaInsets.value.bottom}px`,
      paddingLeft: `${safeAreaInsets.value.left}px`,
    })),
  };
}
