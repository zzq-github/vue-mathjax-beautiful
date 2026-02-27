import { computed } from 'vue';
import { useI18n as useVueI18n } from 'vue-i18n';
import type { Ref, ComputedRef } from 'vue';
import { availableLocales } from '../locales';

interface UseI18nReturn {
  t: (key: string) => string;
  tm: (key: string) => unknown;
  locale: Ref<string>;
  currentLocale: ComputedRef<{ code: string; name: string; flag: string }>;
  availableLocales: typeof availableLocales;
  changeLocale: (newLocale: string) => void;
  toggleLocale: () => void;
  getNextLocale: () => { code: string; name: string; flag: string };
}

export function useI18n(): UseI18nReturn {
  const { locale, t, tm } = useVueI18n();

  // 当前语言信息
  const currentLocale = computed(() => {
    return availableLocales.find(l => l.code === locale.value) || availableLocales[0];
  });

  // 切换语言
  const changeLocale = (newLocale: string) => {
    if (availableLocales.some(l => l.code === newLocale)) {
      locale.value = newLocale;
      localStorage.setItem('locale', newLocale);
      
      // 更新HTML lang属性
      document.documentElement.lang = newLocale;
      
      // 触发自定义事件（如果需要）
      window.dispatchEvent(new CustomEvent('localeChanged', { detail: newLocale }));
    }
  };

  // 获取下一个语言（循环切换）
  const getNextLocale = () => {
    const currentIndex = availableLocales.findIndex(l => l.code === locale.value);
    const nextIndex = (currentIndex + 1) % availableLocales.length;
    return availableLocales[nextIndex];
  };

  // 循环切换语言
  const toggleLocale = () => {
    const nextLocale = getNextLocale();
    changeLocale(nextLocale.code);
  };

  return {
    t,
    tm,
    locale,
    currentLocale,
    availableLocales,
    changeLocale,
    toggleLocale,
    getNextLocale,
  };
} 