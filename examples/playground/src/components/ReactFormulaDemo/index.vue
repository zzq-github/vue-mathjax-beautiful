<template>
  <div ref="containerRef" />
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted, ref } from 'vue';
import { createRoot, type Root } from 'react-dom/client';
import React from 'react';
import ReactFormulaPlayground from '../../react/ReactFormulaPlayground';

const props = defineProps<{
  isDark?: boolean;
}>();

const containerRef = ref<HTMLElement | null>(null);
let root: Root | null = null;

function renderReactDemo() {
  if (!root) return;
  root.render(React.createElement(ReactFormulaPlayground, { isDark: props.isDark }));
}

onMounted(() => {
  if (!containerRef.value) return;
  root = createRoot(containerRef.value);
  renderReactDemo();
});

watch(() => props.isDark, renderReactDemo);

onUnmounted(() => {
  root?.unmount();
  root = null;
});
</script>
