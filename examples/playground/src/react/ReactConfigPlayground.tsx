import { useState } from 'react';
import { MathjaxBeautiful } from 'react-mathjax-beautiful';
import type { MathjaxBeautifulLocale, MathjaxBeautifulTheme } from 'react-mathjax-beautiful';

export interface ReactFormulaConfig {
  inline: boolean;
  theme: MathjaxBeautifulTheme;
  locale: MathjaxBeautifulLocale;
  showSymbols: boolean;
  showPreview: boolean;
  showThemeToggle: boolean;
  showClearButton: boolean;
  showLanguageToggle: boolean;
  showFormulaExamples: boolean;
  wrapFormula: boolean;
  maxLength: number;
  rows: number;
}

interface ReactConfigPlaygroundProps {
  config: ReactFormulaConfig;
  onEvent?: (type: string, data: string) => void;
}

export default function ReactConfigPlayground({ config, onEvent }: ReactConfigPlaygroundProps) {
  const [open, setOpen] = useState(false);
  const [latex, setLatex] = useState('x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}');

  const commonProps = {
    theme: config.theme,
    locale: config.locale,
    showSymbols: config.showSymbols,
    showPreview: config.showPreview,
    showThemeToggle: config.showThemeToggle,
    showClearButton: config.showClearButton,
    showLanguageToggle: config.showLanguageToggle,
    showFormulaExamples: config.showFormulaExamples,
    wrapFormula: config.wrapFormula,
    maxLength: config.maxLength,
    rows: config.rows,
    value: latex,
    onChange: (nextLatex: string) => {
      setLatex(nextLatex);
      onEvent?.('change', nextLatex);
    },
    onInsert: (nextLatex: string) => {
      onEvent?.('insert', nextLatex);
    },
    onClear: () => {
      setLatex('');
      onEvent?.('clear', 'clear input');
    },
    onThemeChange: (theme: MathjaxBeautifulTheme) => {
      onEvent?.('themeChange', theme);
    },
    onLocaleChange: (locale: MathjaxBeautifulLocale) => {
      onEvent?.('localeChange', locale);
    },
  };

  if (config.inline) {
    return (
      <div className="rounded-2xl border border-emerald-200/60 bg-white/90 p-4 shadow-sm dark:border-emerald-800/60 dark:bg-gray-900/80">
        <MathjaxBeautiful inline {...commonProps} />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-emerald-200/60 bg-white/90 p-5 shadow-sm dark:border-emerald-800/60 dark:bg-gray-900/80">
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Existing LaTeX
        </label>
        <textarea
          value={latex}
          onChange={(event) => {
            setLatex(event.target.value);
            onEvent?.('change', event.target.value);
          }}
          className="min-h-[112px] w-full resize-y rounded-lg border border-gray-300 bg-white p-3 font-mono text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-100"
        />
      </div>

      <button
        type="button"
        className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        onClick={() => {
          setOpen(true);
          onEvent?.('open', 'dialog opened');
        }}
      >
        Open React Formula Dialog
      </button>

      <MathjaxBeautiful
        {...commonProps}
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          onEvent?.('openChange', String(nextOpen));
        }}
      />
    </div>
  );
}
