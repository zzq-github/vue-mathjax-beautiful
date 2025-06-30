import { createI18n } from 'vue-i18n';
import { messages } from './locales';

// 获取浏览器语言偏好
function getBrowserLocale(): string {
  const browserLang = navigator.language || navigator.languages?.[0] || 'zh-CN';
  
  // 支持的语言列表
  const supportedLocales = ['zh-CN', 'en-US'];
  
  // 如果浏览器语言在支持列表中，使用它
  if (supportedLocales.includes(browserLang)) {
    return browserLang;
  }
  
  // 尝试匹配语言代码（不考虑地区）
  const langCode = browserLang.split('-')[0];
  for (const locale of supportedLocales) {
    if (locale.startsWith(langCode)) {
      return locale;
    }
  }
  
  // 默认返回中文
  return 'zh-CN';
}

// 获取初始语言
function getInitialLocale(): string {
  // 先检查本地存储
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale && messages[savedLocale as keyof typeof messages]) {
    return savedLocale;
  }
  
  // 否则使用浏览器语言
  return getBrowserLocale();
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: getInitialLocale(),
  fallbackLocale: 'zh-CN',
  messages,
  globalInjection: true,
});

export default i18n; 