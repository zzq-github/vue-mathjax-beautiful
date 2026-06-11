<template>
  <div ref="containerRef" />
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted, ref } from 'vue';
import { createRoot, type Root } from 'react-dom/client';
import React from 'react';
import ReactConfigPlayground from '../../react/ReactConfigPlayground';
import type { ReactFormulaConfig } from '../../react/ReactConfigPlayground';

const props = defineProps<{
  config: ReactFormulaConfig;
}>();

const emit = defineEmits<{
  event: [payload: { type: string; data: string }];
}>();

const containerRef = ref<HTMLElement | null>(null);
let root: Root | null = null;

function renderReactDemo() {
  if (!root) return;
  root.render(
    React.createElement(ReactConfigPlayground, {
      config: { ...props.config },
      onEvent: (type: string, data: string) => emit('event', { type, data }),
    })
  );
}

onMounted(() => {
  if (!containerRef.value) return;
  root = createRoot(containerRef.value);
  renderReactDemo();
});

watch(() => props.config, renderReactDemo, { deep: true });

onUnmounted(() => {
  root?.unmount();
  root = null;
});
</script>
