export type Locale = 'zh-CN' | 'en-US';

export interface LocalizedText {
  'zh-CN': string;
  'en-US': string;
}

/**
 * 根据当前语言获取本地化文本
 * @param text 包含多语言的文本对象
 * @param locale 当前语言环境
 * @returns 对应语言的文本
 */
export function getLocalizedText(text: LocalizedText, locale: Locale = 'zh-CN'): string {
  return text[locale] || text['zh-CN'];
}

/**
 * 根据当前语言获取符号描述
 * @param symbol 符号对象
 * @param locale 当前语言环境
 * @returns 对应语言的描述
 */
export function getSymbolDescription(symbol: { description: LocalizedText }, locale: Locale = 'zh-CN'): string {
  return getLocalizedText(symbol.description, locale);
}

/**
 * 根据当前语言获取分类名称
 * @param category 分类对象
 * @param locale 当前语言环境
 * @returns 对应语言的分类名称
 */
export function getCategoryName(category: { name: LocalizedText }, locale: Locale = 'zh-CN'): string {
  return getLocalizedText(category.name, locale);
} 