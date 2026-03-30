import { ref, computed, watch } from 'vue';

export type Theme = 'light' | 'dark' | 'auto';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  border: string;
  background: string;
  backgroundSecondary: string;
  text: string;
  textMuted: string;
  shadow: string;
}

export interface ThemeConfig {
  light: ThemeColors;
  dark: ThemeColors;
}

// 默认主题配置
const defaultThemeConfig: ThemeConfig = {
  light: {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    secondary: '#6b7280',
    accent: '#10b981',
    border: '#e5e7eb',
    background: '#ffffff',
    backgroundSecondary: '#f9fafb',
    text: '#374151',
    textMuted: '#6b7280',
    shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  },
  dark: {
    primary: '#60a5fa',
    primaryHover: '#3b82f6',
    secondary: '#9ca3af',
    accent: '#34d399',
    border: '#374151',
    background: '#1f2937',
    backgroundSecondary: '#374151',
    text: '#f9fafb',
    textMuted: '#d1d5db',
    shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
  },
};

// 全局主题状态
const globalTheme = ref<Theme>('light');
const globalThemeConfig = ref<ThemeConfig>(defaultThemeConfig);

/**
 * 检测系统主题偏好
 */
function detectSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * 主题组合式函数
 */
export function useTheme(
  initialTheme: Theme = 'light',
  customConfig: Partial<ThemeConfig> = {}
) {
  const theme = ref<Theme>(initialTheme);
  const themeConfig = ref<ThemeConfig>({
    light: { ...defaultThemeConfig.light, ...customConfig.light },
    dark: { ...defaultThemeConfig.dark, ...customConfig.dark },
  });

  // 计算当前实际主题（处理 auto）
  const actualTheme = computed<'light' | 'dark'>(() => {
    if (theme.value === 'auto') {
      return detectSystemTheme();
    }
    return theme.value;
  });

  // 当前主题颜色
  const currentColors = computed<ThemeColors>(() => {
    return themeConfig.value[actualTheme.value];
  });

  // CSS 变量
  const cssVariables = computed<Record<string, string>>(() => {
    const colors = currentColors.value;
    return {
      '--math-editor-primary': colors.primary,
      '--math-editor-primary-hover': colors.primaryHover,
      '--math-editor-secondary': colors.secondary,
      '--math-editor-accent': colors.accent,
      '--math-editor-border': colors.border,
      '--math-editor-bg': colors.background,
      '--math-editor-bg-secondary': colors.backgroundSecondary,
      '--math-editor-text': colors.text,
      '--math-editor-text-muted': colors.textMuted,
      '--math-editor-shadow': colors.shadow,
      '--math-editor-toolbar-bg': colors.background,
      '--math-editor-toolbar-border': colors.border,
      '--math-editor-btn-bg': colors.background,
      '--math-editor-btn-border': colors.border,
      '--math-editor-btn-hover-bg': colors.primary,
      '--math-editor-button-bg': colors.primary,
      '--math-editor-button-hover-bg': colors.primaryHover,
      '--math-editor-button-text': '#ffffff',
      '--math-editor-dialog-bg': colors.background,
      '--math-editor-input-bg': colors.background,
      '--math-editor-input-border': colors.border,
    };
  });

  // 主题类名
  const themeClass = computed(() => `theme-${actualTheme.value}`);

  // 设置主题
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
  };

  // 切换主题
  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(theme.value);
    const nextIndex = (currentIndex + 1) % themes.length;
    theme.value = themes[nextIndex];
  };

  // 更新主题配置
  const updateThemeConfig = (config: Partial<ThemeConfig>) => {
    themeConfig.value = {
      light: { ...themeConfig.value.light, ...config.light },
      dark: { ...themeConfig.value.dark, ...config.dark },
    };
  };

  // 监听系统主题变化
  let mediaQueryListener: ((e: MediaQueryListEvent) => void) | null = null;

  const setupSystemThemeListener = () => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQueryListener = () => {
      if (theme.value === 'auto') {
        // 触发响应式更新
        theme.value = 'auto';
      }
    };
    mediaQuery.addEventListener('change', mediaQueryListener);
  };

  const cleanupSystemThemeListener = () => {
    if (mediaQueryListener && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.removeEventListener('change', mediaQueryListener);
      mediaQueryListener = null;
    }
  };

  // 同步到全局状态
  watch(theme, (newTheme) => {
    globalTheme.value = newTheme;
  });

  watch(themeConfig, (newConfig) => {
    globalThemeConfig.value = newConfig;
  }, { deep: true });

  return {
    theme,
    actualTheme,
    currentColors,
    cssVariables,
    themeClass,
    setTheme,
    toggleTheme,
    updateThemeConfig,
    setupSystemThemeListener,
    cleanupSystemThemeListener,
  };
}

/**
 * 获取全局主题状态
 */
export function useGlobalTheme() {
  return {
    theme: globalTheme,
    themeConfig: globalThemeConfig,
  };
}

/**
 * 创建自定义主题
 */
export function createTheme(
  name: string,
  lightColors: Partial<ThemeColors>,
  darkColors: Partial<ThemeColors>
): ThemeConfig {
  return {
    light: { ...defaultThemeConfig.light, ...lightColors },
    dark: { ...defaultThemeConfig.dark, ...darkColors },
  };
}

// 预设主题
export const presetThemes = {
  default: defaultThemeConfig,
  blue: createTheme('blue', 
    { primary: '#2563eb', primaryHover: '#1d4ed8' },
    { primary: '#3b82f6', primaryHover: '#2563eb' }
  ),
  purple: createTheme('purple',
    { primary: '#7c3aed', primaryHover: '#6d28d9', accent: '#8b5cf6' },
    { primary: '#8b5cf6', primaryHover: '#7c3aed', accent: '#a78bfa' }
  ),
  green: createTheme('green',
    { primary: '#059669', primaryHover: '#047857', accent: '#10b981' },
    { primary: '#10b981', primaryHover: '#059669', accent: '#34d399' }
  ),
};
