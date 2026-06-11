export type MathjaxBeautifulLocale = 'zh-CN' | 'en-US';

export interface MathjaxBeautifulMessages {
  title: string;
  subtitle: string;
  inputSection: string;
  previewSection: string;
  rendering: string;
  noFormula: string;
  inputPlaceholder: string;
  insertButton: string;
  cancelButton: string;
  clearButton: string;
  closeLabel: string;
  themeToggle: {
    light: string;
    dark: string;
  };
  categories: {
    basic: string;
    greek: string;
    advanced: string;
    formulas: string;
  };
}

export const messages: Record<MathjaxBeautifulLocale, MathjaxBeautifulMessages> = {
  'zh-CN': {
    title: '\u6570\u5b66\u516c\u5f0f\u7f16\u8f91\u5668',
    subtitle:
      '\u4f7f\u7528\u4e0b\u65b9\u6309\u94ae\u6216\u76f4\u63a5\u8f93\u5165 LaTeX \u4ee3\u7801',
    inputSection: 'LaTeX \u8f93\u5165',
    previewSection: '\u5b9e\u65f6\u9884\u89c8',
    rendering: '\u6e32\u67d3\u4e2d',
    noFormula: '\u65e0\u516c\u5f0f',
    inputPlaceholder: '\u8f93\u5165 LaTeX \u516c\u5f0f\u6216\u70b9\u51fb\u7b26\u53f7...',
    insertButton: '\u63d2\u5165\u516c\u5f0f',
    cancelButton: '\u53d6\u6d88',
    clearButton: '\u6e05\u7a7a',
    closeLabel: '\u5173\u95ed',
    themeToggle: {
      light: '\u5207\u6362\u5230\u4eae\u8272\u4e3b\u9898',
      dark: '\u5207\u6362\u5230\u6697\u8272\u4e3b\u9898',
    },
    categories: {
      basic: '\u57fa\u7840\u7b26\u53f7',
      greek: '\u5e0c\u814a\u5b57\u6bcd',
      advanced: '\u9ad8\u7ea7\u7b26\u53f7',
      formulas: '\u5e38\u7528\u516c\u5f0f',
    },
  },
  'en-US': {
    title: 'Math Formula Editor',
    subtitle: 'Use buttons below or directly input LaTeX code',
    inputSection: 'LaTeX Input',
    previewSection: 'Live Preview',
    rendering: 'Rendering',
    noFormula: 'No Formula',
    inputPlaceholder: 'Input LaTeX formula or click symbols...',
    insertButton: 'Insert Formula',
    cancelButton: 'Cancel',
    clearButton: 'Clear',
    closeLabel: 'Close',
    themeToggle: {
      light: 'Switch to Light Theme',
      dark: 'Switch to Dark Theme',
    },
    categories: {
      basic: 'Basic Symbols',
      greek: 'Greek Letters',
      advanced: 'Advanced Symbols',
      formulas: 'Common Formulas',
    },
  },
};
