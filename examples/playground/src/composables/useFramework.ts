import { computed, ref } from 'vue';

export type PlaygroundFramework = 'vue' | 'react';

const storageKey = 'playground-framework';

const frameworkOptions = [
  { value: 'vue' as const, label: 'Vue', shortLabel: 'V' },
  { value: 'react' as const, label: 'React', shortLabel: 'R' },
];

function isFramework(value: string | null): value is PlaygroundFramework {
  return value === 'vue' || value === 'react';
}

function getInitialFramework(): PlaygroundFramework {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (isFramework(saved)) return saved;
    }
  } catch {
    // Ignore storage access failures and fall back to Vue.
  }

  return 'vue';
}

const activeFramework = ref<PlaygroundFramework>(getInitialFramework());

export function useFramework() {
  const setFramework = (framework: PlaygroundFramework) => {
    activeFramework.value = framework;

    try {
      localStorage.setItem(storageKey, framework);
      document.documentElement.dataset.framework = framework;
    } catch {
      // The UI state still updates even when persistence is unavailable.
    }
  };

  return {
    activeFramework,
    frameworkOptions,
    isVueFramework: computed(() => activeFramework.value === 'vue'),
    isReactFramework: computed(() => activeFramework.value === 'react'),
    setFramework,
  };
}
