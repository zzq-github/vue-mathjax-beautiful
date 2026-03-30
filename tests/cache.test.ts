import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LRUCache, FormulaCache, MemoryCache } from '../packages/core/src/utils/cache';

describe('缓存模块测试', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  describe('LRUCache', () => {
    let cache: LRUCache<string, number>;

    beforeEach(() => {
      cache = new LRUCache({ maxSize: 3 });
    });

    it('应该正确设置和获取值', () => {
      cache.set('a', 1);
      expect(cache.get('a')).toBe(1);
    });

    it('应该返回 undefined 对于不存在的键', () => {
      expect(cache.get('nonexistent')).toBeUndefined();
    });

    it('应该在超过最大大小时淘汰最久未使用的项', () => {
      cache.set('a', 1);
      cache.set('b', 2);
      cache.set('c', 3);
      cache.set('d', 4); // 应该淘汰 'a'

      expect(cache.get('a')).toBeUndefined();
      expect(cache.get('b')).toBe(2);
      expect(cache.get('c')).toBe(3);
      expect(cache.get('d')).toBe(4);
    });

    it('应该在使用后更新项的位置', () => {
      cache.set('a', 1);
      cache.set('b', 2);
      cache.set('c', 3);
      
      // 访问 'a'，使其变为最近使用
      cache.get('a');
      
      // 添加新项，应该淘汰 'b'
      cache.set('d', 4);

      expect(cache.get('a')).toBe(1);
      expect(cache.get('b')).toBeUndefined();
      expect(cache.get('c')).toBe(3);
      expect(cache.get('d')).toBe(4);
    });

    it('应该支持过期时间', () => {
      const shortCache = new LRUCache<string, number>({ 
        maxSize: 3, 
        ttl: 100 // 100ms 过期
      });
      
      shortCache.set('a', 1);
      expect(shortCache.get('a')).toBe(1);
      
      // 等待过期
      vi.advanceTimersByTime(150);
      expect(shortCache.get('a')).toBeUndefined();
    });

    it('应该正确检查键是否存在', () => {
      cache.set('a', 1);
      expect(cache.has('a')).toBe(true);
      expect(cache.has('b')).toBe(false);
    });

    it('应该正确删除项', () => {
      cache.set('a', 1);
      expect(cache.delete('a')).toBe(true);
      expect(cache.get('a')).toBeUndefined();
      expect(cache.delete('a')).toBe(false);
    });

    it('应该正确清空缓存', () => {
      cache.set('a', 1);
      cache.set('b', 2);
      cache.clear();
      expect(cache.get('a')).toBeUndefined();
      expect(cache.get('b')).toBeUndefined();
      expect(cache.size).toBe(0);
    });

    it('应该返回正确的缓存大小', () => {
      expect(cache.size).toBe(0);
      cache.set('a', 1);
      expect(cache.size).toBe(1);
      cache.set('b', 2);
      expect(cache.size).toBe(2);
    });

    it('应该返回缓存统计信息', () => {
      cache.set('a', 1);
      cache.set('b', 2);
      cache.get('a');
      cache.get('a');
      
      const stats = cache.getStats();
      expect(stats.size).toBe(2);
      expect(stats.maxSize).toBe(3);
      expect(stats.entries).toHaveLength(2);
    });

    it('应该清理过期条目', () => {
      const shortCache = new LRUCache<string, number>({ 
        maxSize: 3, 
        ttl: 100 
      });
      
      shortCache.set('a', 1);
      shortCache.set('b', 2);
      
      vi.advanceTimersByTime(150);
      
      const cleaned = shortCache.cleanup();
      expect(cleaned).toBe(2);
      expect(shortCache.size).toBe(0);
    });
  });

  describe('FormulaCache', () => {
    let cache: FormulaCache;

    beforeEach(() => {
      cache = new FormulaCache({ maxSize: 10 });
    });

    it('应该生成正确的缓存键', () => {
      const key = FormulaCache.generateKey('x^2', { scale: 1.5 });
      expect(key).toBe('x^2:{"scale":1.5}');
    });

    it('应该缓存和获取渲染结果', () => {
      const latex = '\\frac{1}{2}';
      const svg = '<svg>...</svg>';
      
      cache.setRenderResult(latex, svg, { scale: 1.0 });
      const result = cache.getRenderResult(latex, { scale: 1.0 });
      
      expect(result).toBe(svg);
    });

    it('应该对不同选项生成不同缓存键', () => {
      const latex = 'x^2';
      const svg1 = '<svg scale="1">...</svg>';
      const svg2 = '<svg scale="2">...</svg>';
      
      cache.setRenderResult(latex, svg1, { scale: 1.0 });
      cache.setRenderResult(latex, svg2, { scale: 2.0 });
      
      expect(cache.getRenderResult(latex, { scale: 1.0 })).toBe(svg1);
      expect(cache.getRenderResult(latex, { scale: 2.0 })).toBe(svg2);
    });

    it('应该继承 LRU 缓存的过期功能', () => {
      const shortCache = new FormulaCache({ ttl: 100 });
      shortCache.setRenderResult('x^2', '<svg>...</svg>');
      
      expect(shortCache.getRenderResult('x^2')).toBe('<svg>...</svg>');
      
      vi.advanceTimersByTime(150);
      expect(shortCache.getRenderResult('x^2')).toBeUndefined();
    });
  });

  describe('MemoryCache', () => {
    let cache: MemoryCache<string>;

    beforeEach(() => {
      cache = new MemoryCache();
    });

    it('应该正确设置和获取值', () => {
      cache.set('key', 'value');
      expect(cache.get('key')).toBe('value');
    });

    it('应该正确检查键是否存在', () => {
      cache.set('key', 'value');
      expect(cache.has('key')).toBe(true);
      expect(cache.has('nonexistent')).toBe(false);
    });

    it('应该正确删除值', () => {
      cache.set('key', 'value');
      expect(cache.delete('key')).toBe(true);
      expect(cache.delete('key')).toBe(false);
    });

    it('应该正确清空缓存', () => {
      cache.set('a', '1');
      cache.set('b', '2');
      cache.clear();
      expect(cache.has('a')).toBe(false);
      expect(cache.has('b')).toBe(false);
    });
  });
});
