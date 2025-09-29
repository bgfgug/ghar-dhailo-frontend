import { analytics } from './analytics';

interface ErrorReport {
  id: string;
  message: string;
  stack?: string;
  url: string;
  lineNumber?: number;
  columnNumber?: number;
  timestamp: number;
  userAgent: string;
  userId?: string;
  sessionId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, any>;
}

class ErrorMonitoring {
  private sessionId: string;
  private userId: string | null = null;
  private errorQueue: ErrorReport[] = [];
  private isEnabled: boolean = true;

  constructor() {
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    this.initialize();
  }

  private initialize(): void {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.captureError({
        message: event.message,
        stack: event.error?.stack,
        url: event.filename,
        lineNumber: event.lineno,
        columnNumber: event.colno,
        severity: 'high',
        context: {
          type: 'javascript_error',
          error_type: event.error?.name,
        }
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        severity: 'high',
        context: {
          type: 'promise_rejection',
          reason: event.reason,
        }
      });
    });

    // React error boundary integration
    this.setupReactErrorHandler();

    // Network error monitoring
    this.setupNetworkMonitoring();

    // Performance monitoring
    this.setupPerformanceMonitoring();

    // Send queued errors periodically
    setInterval(() => {
      this.flush();
    }, 30000);

    // Send errors on page unload
    window.addEventListener('beforeunload', () => {
      this.flush();
    });
  }

  private setupReactErrorHandler(): void {
    // This will be used by ErrorBoundary components
    (window as any).__errorMonitoring = this;
  }

  private setupNetworkMonitoring(): void {
    // Monitor fetch requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        
        if (!response.ok) {
          this.captureError({
            message: `Network Error: ${response.status} ${response.statusText}`,
            url: args[0] as string,
            severity: response.status >= 500 ? 'high' : 'medium',
            context: {
              type: 'network_error',
              status: response.status,
              statusText: response.statusText,
              method: (args[1] as any)?.method || 'GET',
            }
          });
        }
        
        return response;
      } catch (error) {
        this.captureError({
          message: `Network Request Failed: ${error}`,
          stack: (error as Error).stack,
          url: args[0] as string,
          severity: 'high',
          context: {
            type: 'network_failure',
            method: (args[1] as any)?.method || 'GET',
          }
        });
        throw error;
      }
    };
  }

  private setupPerformanceMonitoring(): void {
    // Monitor slow page loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as any;
        const loadTime = navigation?.loadEventEnd - navigation?.navigationStart;
        
        if (loadTime > 5000) { // Slow load (>5s)
          this.captureError({
            message: `Slow page load detected: ${loadTime}ms`,
            url: window.location.href,
            severity: 'medium',
            context: {
              type: 'performance_issue',
              load_time: loadTime,
              dom_content_loaded: navigation?.domContentLoadedEventEnd - navigation?.navigationStart,
            }
          });
        }
      }, 1000);
    });

    // Monitor memory usage (if available)
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        const usedPercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        
        if (usedPercent > 90) {
          this.captureError({
            message: `High memory usage detected: ${usedPercent.toFixed(1)}%`,
            url: window.location.href,
            severity: 'medium',
            context: {
              type: 'memory_warning',
              used_heap_size: memory.usedJSHeapSize,
              total_heap_size: memory.totalJSHeapSize,
              heap_size_limit: memory.jsHeapSizeLimit,
            }
          });
        }
      }, 60000); // Check every minute
    }
  }

  public captureError(error: Partial<ErrorReport>): void {
    if (!this.isEnabled) return;

    const errorReport: ErrorReport = {
      id: this.generateErrorId(),
      message: error.message || 'Unknown error',
      stack: error.stack,
      url: error.url || window.location.href,
      lineNumber: error.lineNumber,
      columnNumber: error.columnNumber,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      userId: this.userId,
      sessionId: this.sessionId,
      severity: error.severity || 'medium',
      context: {
        ...error.context,
        page_title: document.title,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        scroll_position: `${window.scrollX},${window.scrollY}`,
      }
    };

    this.errorQueue.push(errorReport);

    // Send to analytics
    analytics.error(new Error(errorReport.message), {
      error_id: errorReport.id,
      severity: errorReport.severity,
      ...errorReport.context,
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 Error Captured:', errorReport);
    }

    // Send immediately for critical errors
    if (errorReport.severity === 'critical') {
      this.flush();
    }
  }

  public captureException(error: Error, context?: Record<string, any>): void {
    this.captureError({
      message: error.message,
      stack: error.stack,
      severity: 'high',
      context: {
        ...context,
        error_name: error.name,
      }
    });
  }

  public setUser(userId: string): void {
    this.userId = userId;
  }

  public addBreadcrumb(message: string, category: string = 'default', data?: Record<string, any>): void {
    // Store breadcrumbs for context in error reports
    const breadcrumbs = JSON.parse(localStorage.getItem('error_breadcrumbs') || '[]');
    breadcrumbs.push({
      message,
      category,
      data,
      timestamp: Date.now(),
    });
    
    // Keep only last 50 breadcrumbs
    if (breadcrumbs.length > 50) {
      breadcrumbs.shift();
    }
    
    localStorage.setItem('error_breadcrumbs', JSON.stringify(breadcrumbs));
  }

  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }

  private async flush(): Promise<void> {
    if (this.errorQueue.length === 0) return;

    const errorsToSend = [...this.errorQueue];
    this.errorQueue = [];

    try {
      // In a real app, send to your error monitoring service (Sentry, LogRocket, etc.)
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ errors: errorsToSend }),
      // });

      // For now, store in localStorage for demonstration
      const existingErrors = JSON.parse(localStorage.getItem('error_reports') || '[]');
      const updatedErrors = [...existingErrors, ...errorsToSend].slice(-100); // Keep last 100 errors
      localStorage.setItem('error_reports', JSON.stringify(updatedErrors));

      console.log(`🚨 Sent ${errorsToSend.length} error reports`);
    } catch (error) {
      console.error('Failed to send error reports:', error);
      // Re-queue errors on failure
      this.errorQueue.unshift(...errorsToSend);
    }
  }

  public disable(): void {
    this.isEnabled = false;
  }

  public enable(): void {
    this.isEnabled = true;
  }

  // Get error statistics
  public getErrorStats(): {
    totalErrors: number;
    errorsByseverity: Record<string, number>;
    recentErrors: ErrorReport[];
  } {
    const allErrors = JSON.parse(localStorage.getItem('error_reports') || '[]');
    const last24Hours = Date.now() - 24 * 60 * 60 * 1000;
    const recentErrors = allErrors.filter((error: ErrorReport) => error.timestamp > last24Hours);

    const errorsByseverity = recentErrors.reduce((acc: Record<string, number>, error: ErrorReport) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1;
      return acc;
    }, {});

    return {
      totalErrors: recentErrors.length,
      errorsByseverity,
      recentErrors: recentErrors.slice(-10), // Last 10 errors
    };
  }
}

// Create singleton instance
export const errorMonitoring = new ErrorMonitoring();

// React error boundary helper
export const reportComponentError = (error: Error, errorInfo: any) => {
  errorMonitoring.captureError({
    message: `React Component Error: ${error.message}`,
    stack: error.stack,
    severity: 'high',
    context: {
      type: 'react_error',
      component_stack: errorInfo.componentStack,
      error_boundary: true,
    }
  });
};

export default errorMonitoring;
