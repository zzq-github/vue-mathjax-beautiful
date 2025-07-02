// 统一导出所有数据
export { type Symbol, basicSymbols, greekSymbols, advancedSymbols } from './symbols';
export { formulaExamples } from './formulas';
export { 
  type Locale, 
  type LocalizedText, 
  getLocalizedText, 
  getSymbolDescription, 
  getCategoryName 
} from './utils';

// 分类定义
export interface Category {
  key: string;
  name: {
    'zh-CN': string;
    'en-US': string;
  };
  icon: string;
}

export const categories: Category[] = [
  { key: 'basic', name: { 'zh-CN': '基础', 'en-US': 'Basic' }, icon: '📋' },
  { key: 'greek', name: { 'zh-CN': '希腊字母', 'en-US': 'Greek Letters' }, icon: 'Ω' },
  { key: 'advanced', name: { 'zh-CN': '高级', 'en-US': 'Advanced' }, icon: '🎓' },
];
