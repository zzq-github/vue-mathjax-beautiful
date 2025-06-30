// 统一导出所有数据
export { type Symbol, basicSymbols, greekSymbols, advancedSymbols } from './symbols';
export { formulaExamples } from './formulas';

// 分类定义
export interface Category {
  key: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { key: 'basic', name: '基础', icon: '📋' },
  { key: 'greek', name: '希腊字母', icon: 'Ω' },
  { key: 'advanced', name: '高级', icon: '🎓' },
];
