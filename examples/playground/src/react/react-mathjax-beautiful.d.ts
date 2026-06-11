declare module 'react-mathjax-beautiful' {
  import type { ComponentType } from 'react';

  export type MathjaxBeautifulTheme = 'light' | 'dark';
  export type MathjaxBeautifulLocale = 'zh-CN' | 'en-US';

  export interface MathjaxBeautifulProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    value?: string;
    defaultValue?: string;
    existingLatex?: string;
    inline?: boolean;
    theme?: MathjaxBeautifulTheme;
    locale?: MathjaxBeautifulLocale;
    readonly?: boolean;
    showSymbols?: boolean;
    showPreview?: boolean;
    showThemeToggle?: boolean;
    showClearButton?: boolean;
    showLanguageToggle?: boolean;
    showFormulaExamples?: boolean;
    autoFocus?: boolean;
    placeholder?: string;
    maxLength?: number;
    rows?: number;
    enabledCategories?: string[];
    defaultCategory?: string;
    title?: string;
    subtitle?: string;
    insertButtonText?: string;
    cancelButtonText?: string;
    clearButtonText?: string;
    wrapFormula?: boolean;
    className?: string;
    dialogClassName?: string;
    onInsert?: (latex: string) => void;
    onChange?: (latex: string) => void;
    onClear?: () => void;
    onClose?: () => void;
    onThemeChange?: (theme: MathjaxBeautifulTheme) => void;
    onLocaleChange?: (locale: MathjaxBeautifulLocale) => void;
  }

  export const MathjaxBeautiful: ComponentType<MathjaxBeautifulProps>;
  export function sanitizeHtml(html: string): string;
}
