import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Logger, logger } from '../packages/core/src/utils/logger';

describe('日志模块测试', () => {
  beforeEach(() => {
    vi.spyOn(console, 'debug').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Logger 类', () => {
    it('应该正确输出 debug 日志', () => {
      const customLogger = new Logger({ level: 'debug' });
      customLogger.debug('debug message');
      expect(console.debug).toHaveBeenCalledWith('[VueMathjax] debug message');
    });

    it('应该正确输出 info 日志', () => {
      const customLogger = new Logger({ level: 'info' });
      customLogger.info('info message');
      expect(console.info).toHaveBeenCalledWith('[VueMathjax] info message');
    });

    it('应该正确输出 warn 日志', () => {
      const customLogger = new Logger({ level: 'warn' });
      customLogger.warn('warn message');
      expect(console.warn).toHaveBeenCalledWith('[VueMathjax] warn message');
    });

    it('应该正确输出 error 日志', () => {
      const customLogger = new Logger({ level: 'error' });
      customLogger.error('error message');
      expect(console.error).toHaveBeenCalledWith('[VueMathjax] error message');
    });

    it('应该支持自定义前缀', () => {
      const customLogger = new Logger({ prefix: '[Custom]', level: 'debug' });
      customLogger.info('test');
      expect(console.info).toHaveBeenCalledWith('[Custom] test');
    });

    it('应该根据日志级别过滤日志', () => {
      const customLogger = new Logger({ level: 'warn' });
      
      customLogger.debug('debug');
      customLogger.info('info');
      customLogger.warn('warn');
      customLogger.error('error');

      expect(console.debug).not.toHaveBeenCalled();
      expect(console.info).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalled();
    });

    it('应该支持动态设置日志级别', () => {
      const customLogger = new Logger({ level: 'error' });
      
      customLogger.warn('warn1');
      expect(console.warn).not.toHaveBeenCalled();
      
      customLogger.setLevel('warn');
      customLogger.warn('warn2');
      expect(console.warn).toHaveBeenCalledWith('[VueMathjax] warn2');
    });

    it('应该支持禁用控制台输出', () => {
      const customLogger = new Logger({ level: 'debug' });
      customLogger.disableConsole();
      
      customLogger.info('test');
      expect(console.info).not.toHaveBeenCalled();
    });

    it('应该支持启用控制台输出', () => {
      const customLogger = new Logger({ level: 'debug' });
      customLogger.disableConsole();
      customLogger.enableConsole();
      
      customLogger.info('test');
      expect(console.info).toHaveBeenCalled();
    });

    it('应该支持多个参数', () => {
      const customLogger = new Logger({ level: 'debug' });
      customLogger.info('message', { key: 'value' }, 123);
      expect(console.info).toHaveBeenCalledWith('[VueMathjax] message', { key: 'value' }, 123);
    });
  });

  describe('默认 logger 实例', () => {
    it('应该可用', () => {
      expect(logger).toBeDefined();
      expect(typeof logger.info).toBe('function');
      expect(typeof logger.warn).toBe('function');
      expect(typeof logger.error).toBe('function');
    });

    it('应该可以设置日志级别', () => {
      logger.setLevel('error');
      logger.info('should not log');
      expect(console.info).not.toHaveBeenCalled();
      
      // 恢复默认级别
      logger.setLevel('debug');
    });
  });
});
