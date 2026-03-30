/**
 * LRU 缓存实现
 * 用于缓存 MathJax 渲染结果
 */

export interface CacheEntry<T> {
  value: T;
  timestamp: number;
  accessCount: number;
}

export interface LRUCacheOptions {
  maxSize?: number;
  ttl?: number; // 过期时间（毫秒）
}

/**
 * LRU 缓存类
 */
export class LRUCache<K, V> {
  private cache: Map<K, CacheEntry<V>>;
  private maxSize: number;
  private ttl: number;

  constructor(options: LRUCacheOptions = {}) {
    this.cache = new Map();
    this.maxSize = options.maxSize || 100;
    this.ttl = options.ttl || 0; // 0 表示不过期
  }

  /**
   * 获取缓存值
   */
  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return undefined;
    }

    // 检查是否过期
    if (this.ttl > 0 && Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return undefined;
    }

    // 更新访问信息（移到末尾表示最近使用）
    this.cache.delete(key);
    this.cache.set(key, {
      ...entry,
      accessCount: entry.accessCount + 1,
    });

    return entry.value;
  }

  /**
   * 设置缓存值
   */
  set(key: K, value: V): void {
    // 如果已存在，先删除
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // 如果超过最大大小，删除最久未使用的（第一个）
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }

    // 添加新条目
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      accessCount: 1,
    });
  }

  /**
   * 检查是否存在
   */
  has(key: K): boolean {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return false;
    }

    // 检查是否过期
    if (this.ttl > 0 && Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * 删除缓存
   */
  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  /**
   * 清空缓存
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * 获取缓存大小
   */
  get size(): number {
    return this.cache.size;
  }

  /**
   * 获取所有键
   */
  keys(): IterableIterator<K> {
    return this.cache.keys();
  }

  /**
   * 获取缓存统计信息
   */
  getStats(): {
    size: number;
    maxSize: number;
    hitRate: number;
    entries: Array<{ key: K; accessCount: number; age: number }>;
  } {
    const now = Date.now();
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      accessCount: entry.accessCount,
      age: now - entry.timestamp,
    }));

    const totalAccess = entries.reduce((sum, e) => sum + e.accessCount, 0);
    const hitRate = totalAccess > 0 
      ? (totalAccess - entries.length) / totalAccess 
      : 0;

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate,
      entries,
    };
  }

  /**
   * 清理过期条目
   */
  cleanup(): number {
    if (this.ttl <= 0) return 0;

    const now = Date.now();
    let cleaned = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.ttl) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    return cleaned;
  }
}

/**
 * 公式渲染缓存
 * 专门用于缓存 MathJax 渲染结果
 */
export class FormulaCache extends LRUCache<string, string> {
  constructor(options: LRUCacheOptions = {}) {
    super({
      maxSize: options.maxSize || 200,
      ttl: options.ttl || 1000 * 60 * 30, // 默认 30 分钟
    });
  }

  /**
   * 生成缓存键
   */
  static generateKey(latex: string, options?: Record<string, unknown>): string {
    const optionsStr = options ? JSON.stringify(options) : '';
    return `${latex}:${optionsStr}`;
  }

  /**
   * 获取渲染结果
   */
  getRenderResult(latex: string, options?: Record<string, unknown>): string | undefined {
    const key = FormulaCache.generateKey(latex, options);
    return this.get(key);
  }

  /**
   * 设置渲染结果
   */
  setRenderResult(latex: string, svg: string, options?: Record<string, unknown>): void {
    const key = FormulaCache.generateKey(latex, options);
    this.set(key, svg);
  }
}

// 全局公式缓存实例
export const globalFormulaCache = new FormulaCache();

/**
 * 内存缓存（用于非持久化数据）
 */
export class MemoryCache<T> {
  private data: Map<string, T>;

  constructor() {
    this.data = new Map();
  }

  get(key: string): T | undefined {
    return this.data.get(key);
  }

  set(key: string, value: T): void {
    this.data.set(key, value);
  }

  delete(key: string): boolean {
    return this.data.delete(key);
  }

  clear(): void {
    this.data.clear();
  }

  has(key: string): boolean {
    return this.data.has(key);
  }
}
