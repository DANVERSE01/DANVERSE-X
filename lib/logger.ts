/**
 * Centralized logging utility
 * Prevents console pollution in production while maintaining dev visibility
 */

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  error(message: string, error?: unknown): void {
    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, error || '');
    }
    // Future: Add error tracking service integration (Sentry, etc.)
  }

  warn(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, data || '');
    }
  }

  info(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, data || '');
    }
  }

  debug(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  }
}

export const logger = new Logger();
