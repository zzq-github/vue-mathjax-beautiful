import { ref, computed, onUnmounted, type Ref } from 'vue';

export interface VirtualListOptions {
  itemHeight: number;
  overscan?: number;
  containerHeight?: number;
}

export interface VirtualGridOptions extends VirtualListOptions {
  columnCount: number;
  gap?: number;
}

export interface VirtualListItem<T> {
  data: T;
  index: number;
}

export interface VirtualGridItem<T> extends VirtualListItem<T> {
  row: number;
  col: number;
}

/**
 * 虚拟列表组合式函数
 * 用于优化大量数据的渲染性能
 */
export function useVirtualList<T>(
  list: Ref<T[]>,
  options: VirtualListOptions
) {
  const { itemHeight, overscan = 5, containerHeight = 300 } = options;
  
  const containerRef = ref<HTMLElement | null>(null);
  const scrollTop = ref(0);
  
  // 计算可见范围
  const visibleRange = computed(() => {
    const totalHeight = list.value.length * itemHeight;
    const start = Math.floor(scrollTop.value / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    
    // 添加 overscan 缓冲
    const startIndex = Math.max(0, start - overscan);
    const endIndex = Math.min(list.value.length, start + visibleCount + overscan);
    
    return {
      start: startIndex,
      end: endIndex,
      totalHeight,
      offsetY: startIndex * itemHeight,
    };
  });
  
  // 可见列表项
  const visibleItems = computed<VirtualListItem<T>[]>(() => {
    const { start, end } = visibleRange.value;
    return list.value.slice(start, end).map((data, index) => ({
      data,
      index: start + index,
    }));
  });
  
  // 处理滚动事件（使用 requestAnimationFrame 节流）
  let rafId: number | null = null;
  const handleScroll = (e: Event) => {
    if (rafId !== null) return;
    
    rafId = requestAnimationFrame(() => {
      const target = e.target as HTMLElement;
      scrollTop.value = target.scrollTop;
      rafId = null;
    });
  };
  
  // 滚动到指定索引
  const scrollToIndex = (index: number) => {
    if (containerRef.value) {
      containerRef.value.scrollTop = index * itemHeight;
    }
  };
  
  // 清理
  onUnmounted(() => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
  });
  
  return {
    containerRef,
    visibleItems,
    visibleRange,
    handleScroll,
    scrollToIndex,
  };
}

/**
 * 虚拟网格列表组合式函数
 * 用于优化网格布局的大量数据渲染
 */
export function useVirtualGrid<T>(
  list: Ref<T[]>,
  options: VirtualGridOptions
) {
  const { itemHeight, columnCount, gap = 8, overscan = 2, containerHeight = 300 } = options;
  
  const containerRef = ref<HTMLElement | null>(null);
  const scrollTop = ref(0);
  const containerWidth = ref(0);
  
  // 计算行数
  const rowCount = computed(() => Math.ceil(list.value.length / columnCount));
  
  // 计算可见范围
  const visibleRange = computed(() => {
    const rowHeight = itemHeight + gap;
    const totalHeight = rowCount.value * rowHeight;
    const startRow = Math.floor(scrollTop.value / rowHeight);
    const visibleRowCount = Math.ceil(containerHeight / rowHeight);
    
    // 添加 overscan 缓冲
    const startRowIndex = Math.max(0, startRow - overscan);
    const endRowIndex = Math.min(rowCount.value, startRow + visibleRowCount + overscan);
    
    // 计算可见的 item 索引范围
    const startIndex = startRowIndex * columnCount;
    const endIndex = Math.min(list.value.length, endRowIndex * columnCount);
    
    return {
      start: startIndex,
      end: endIndex,
      startRow: startRowIndex,
      endRow: endRowIndex,
      totalHeight,
      offsetY: startRowIndex * rowHeight,
    };
  });
  
  // 可见列表项（包含行列位置信息）
  const visibleItems = computed<VirtualGridItem<T>[]>(() => {
    const { start, end } = visibleRange.value;
    return list.value.slice(start, end).map((data, index) => {
      const actualIndex = start + index;
      return {
        data,
        index: actualIndex,
        row: Math.floor(actualIndex / columnCount),
        col: actualIndex % columnCount,
      };
    });
  });
  
  // 计算每个 item 的位置样式
  const getItemStyle = (item: VirtualGridItem<T>) => {
    const rowHeight = itemHeight + gap;
    // 每个格子的宽度百分比
    const cellWidthPercent = 100 / columnCount;
    // 实际内容宽度（减去间隙）
    const itemWidthCalc = `calc(${cellWidthPercent}% - ${gap}px)`;
    
    return {
      position: 'absolute' as const,
      top: `${item.row * rowHeight}px`,
      left: `calc(${item.col * cellWidthPercent}% + ${gap / 2}px)`,
      width: itemWidthCalc,
      height: `${itemHeight}px`,
    };
  };
  
  // 处理滚动事件
  let rafId: number | null = null;
  const handleScroll = (e: Event) => {
    if (rafId !== null) return;
    
    rafId = requestAnimationFrame(() => {
      const target = e.target as HTMLElement;
      scrollTop.value = target.scrollTop;
      rafId = null;
    });
  };
  
  // 更新容器宽度
  const updateContainerWidth = () => {
    if (containerRef.value) {
      containerWidth.value = containerRef.value.clientWidth;
    }
  };
  
  // 滚动到指定索引
  const scrollToIndex = (index: number) => {
    if (containerRef.value) {
      const rowHeight = itemHeight + gap;
      const row = Math.floor(index / columnCount);
      containerRef.value.scrollTop = row * rowHeight;
    }
  };
  
  // 清理
  onUnmounted(() => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
  });
  
  return {
    containerRef,
    visibleItems,
    visibleRange,
    getItemStyle,
    handleScroll,
    scrollToIndex,
    updateContainerWidth,
  };
}

/**
 * 批量渲染控制器
 * 用于控制大量异步渲染任务的执行
 */
export function useBatchRender<T>(
  items: Ref<T[]>,
  renderFn: (item: T) => Promise<void>,
  options: {
    batchSize?: number;
    delay?: number;
    priority?: 'visible-first' | 'sequential';
  } = {}
) {
  const { batchSize = 10, delay = 0, priority = 'sequential' } = options;
  
  const isRendering = ref(false);
  const progress = ref(0);
  const abortController = ref<AbortController | null>(null);
  
  // 渲染队列
  const renderQueue = async (visibleIndices?: Set<number>) => {
    if (isRendering.value) return;
    isRendering.value = true;
    progress.value = 0;
    
    abortController.value = new AbortController();
    const { signal } = abortController.value;
    
    try {
      const total = items.value.length;
      
      // 根据优先级排序
      let indices: number[];
      if (priority === 'visible-first' && visibleIndices) {
        const visible = Array.from(visibleIndices).sort((a, b) => a - b);
        const hidden = items.value
          .map((_, i) => i)
          .filter(i => !visibleIndices.has(i));
        indices = [...visible, ...hidden];
      } else {
        indices = items.value.map((_, i) => i);
      }
      
      // 批量渲染
      for (let i = 0; i < indices.length; i += batchSize) {
        if (signal.aborted) break;
        
        const batch = indices.slice(i, i + batchSize);
        await Promise.all(
          batch.map(async (index) => {
            if (!signal.aborted) {
              await renderFn(items.value[index]);
            }
          })
        );
        
        progress.value = Math.min(100, Math.round((i + batch.length) / total * 100));
        
        if (delay > 0 && i + batchSize < indices.length) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    } finally {
      isRendering.value = false;
    }
  };
  
  // 中止渲染
  const abort = () => {
    abortController.value?.abort();
    isRendering.value = false;
  };
  
  // 清理
  onUnmounted(() => {
    abort();
  });
  
  return {
    isRendering,
    progress,
    renderQueue,
    abort,
  };
}
