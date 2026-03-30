/**
 * 日志工具
 * 根据环境控制日志输出
 */

// 检测开发环境（兼容浏览器和 Node）
 
const isDev = (() => {
  try {
    // 浏览器环境通过 import.meta.env 检测 (Vite)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const meta = (globalThis as any).import?.meta;
    if (meta?.env) {
      return meta.env.DEV === true || meta.env.MODE === 'development';
    }
  } catch {
    // 忽略错误
  }
  
  try {
    // Node 环境通过 process.env 检测
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const proc = (globalThis as any).process;
    if (proc?.env) {
      return proc.env.NODE_ENV === 'development';
    }
  } catch {
    // 忽略错误
  }
  
  // 默认生产环境
  return false;
})();

/**
 * 错误级别
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * 日志配置
 */
interface LoggerConfig {
  level: LogLevel;
  prefix?: string;
  enableConsole?: boolean;
}

const levelPriority: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  private config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level: isDev ? 'debug' : 'warn',
      prefix: '[VueMathjax]',
      enableConsole: true,
      ...config,
    };
  }

  private shouldLog(level: LogLevel): boolean {
    return levelPriority[level] >= levelPriority[this.config.level];
  }

  private formatMessage(message: string): string {
    return this.config.prefix ? `${this.config.prefix} ${message}` : message;
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.shouldLog('debug') && this.config.enableConsole) {
      console.debug(this.formatMessage(message), ...args);
    }
  }

  info(message: string, ...args: unknown[]): void {
    if (this.shouldLog('info') && this.config.enableConsole) {
      console.info(this.formatMessage(message), ...args);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.shouldLog('warn') && this.config.enableConsole) {
      console.warn(this.formatMessage(message), ...args);
    }
  }

  error(message: string, ...args: unknown[]): void {
    if (this.shouldLog('error') && this.config.enableConsole) {
      console.error(this.formatMessage(message), ...args);
    }
  }

  /**
   * 设置日志级别
   */
  setLevel(level: LogLevel): void {
    this.config.level = level;
  }

  /**
   * 禁用控制台输出
   */
  disableConsole(): void {
    this.config.enableConsole = false;
  }

  /**
   * 启用控制台输出
   */
  enableConsole(): void {
    this.config.enableConsole = true;
  }
}

// 默认导出单例
export const logger = new Logger();

// 命名导出类
export { Logger };
