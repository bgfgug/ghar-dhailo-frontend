interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  user_id?: string;
  timestamp?: number;
}

interface UserProperties {
  user_id: string;
  email?: string;
  name?: string;
  role?: string;
  location?: string;
}

class Analytics {
  private isEnabled: boolean = true;
  private userId: string | null = null;
  private sessionId: string;
  private events: AnalyticsEvent[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    this.loadUserId();
    
    // Send queued events on page unload
    window.addEventListener('beforeunload', () => {
      this.flush();
    });

    // Send events periodically
    setInterval(() => {
      this.flush();
    }, 30000); // Every 30 seconds
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }

  private loadUserId(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.userId = user.id;
      } catch (e) {
        console.warn('Failed to parse user from localStorage');
      }
    }
  }

  public identify(properties: UserProperties): void {
    this.userId = properties.user_id;
    this.track('user_identified', properties);
  }

  public track(event: string, properties?: Record<string, any>): void {
    if (!this.isEnabled) return;

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        session_id: this.sessionId,
        url: window.location.href,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        timestamp: Date.now(),
      },
      user_id: this.userId || undefined,
      timestamp: Date.now(),
    };

    this.events.push(analyticsEvent);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', analyticsEvent);
    }

    // Send immediately for critical events
    const criticalEvents = ['order_placed', 'payment_completed', 'error_occurred'];
    if (criticalEvents.includes(event)) {
      this.flush();
    }
  }

  public page(name: string, properties?: Record<string, any>): void {
    this.track('page_view', {
      page_name: name,
      page_title: document.title,
      ...properties,
    });
  }

  public error(error: Error, context?: Record<string, any>): void {
    this.track('error_occurred', {
      error_message: error.message,
      error_stack: error.stack,
      error_name: error.name,
      ...context,
    });
  }

  private async flush(): Promise<void> {
    if (this.events.length === 0) return;

    const eventsToSend = [...this.events];
    this.events = [];

    try {
      // In a real app, send to your analytics service
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ events: eventsToSend }),
      // });

      // For now, store in localStorage for demonstration
      const existingEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      const updatedEvents = [...existingEvents, ...eventsToSend].slice(-1000); // Keep last 1000 events
      localStorage.setItem('analytics_events', JSON.stringify(updatedEvents));

      console.log(`📊 Sent ${eventsToSend.length} analytics events`);
    } catch (error) {
      console.error('Failed to send analytics events:', error);
      // Re-queue events on failure
      this.events.unshift(...eventsToSend);
    }
  }

  public disable(): void {
    this.isEnabled = false;
  }

  public enable(): void {
    this.isEnabled = true;
  }

  // Common tracking methods
  public trackSearch(query: string, results: number): void {
    this.track('search_performed', {
      search_query: query,
      results_count: results,
    });
  }

  public trackCartAction(action: 'add' | 'remove' | 'update', itemId: string, quantity?: number): void {
    this.track('cart_action', {
      action,
      item_id: itemId,
      quantity,
    });
  }

  public trackOrderAction(action: 'started' | 'completed' | 'cancelled', orderId?: string, total?: number): void {
    this.track('order_action', {
      action,
      order_id: orderId,
      total_amount: total,
    });
  }

  public trackNavigation(from: string, to: string): void {
    this.track('navigation', {
      from_page: from,
      to_page: to,
    });
  }

  public trackPerformance(metric: string, value: number, unit: string = 'ms'): void {
    this.track('performance_metric', {
      metric_name: metric,
      metric_value: value,
      metric_unit: unit,
    });
  }
}

// Create singleton instance
export const analytics = new Analytics();

// Performance monitoring utilities
export const measurePerformance = (name: string) => {
  const start = performance.now();
  
  return {
    end: () => {
      const duration = performance.now() - start;
      analytics.trackPerformance(name, duration);
      return duration;
    }
  };
};

// HOC for tracking page views
export const withPageTracking = (Component: React.ComponentType<any>, pageName: string) => {
  return (props: any) => {
    const React = require('react');
    
    React.useEffect(() => {
      analytics.page(pageName);
    }, []);

    return React.createElement(Component, props);
  };
};

// Error boundary integration
export const reportError = (error: Error, errorInfo?: any) => {
  analytics.error(error, {
    component_stack: errorInfo?.componentStack,
    error_boundary: true,
  });
};

export default analytics;