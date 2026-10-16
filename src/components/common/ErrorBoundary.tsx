import React, { ReactNode } from 'react';
import { RotateCw, Home, AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          className="min-h-[70vh] flex items-center justify-center px-6 py-20 text-center"
          style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}
        >
          <div 
            className="max-w-md w-full p-8 md:p-10 rounded-3xl border space-y-6"
            style={{ 
              backgroundColor: 'var(--bg-surface)', 
              borderColor: 'var(--border-card)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' 
            }}
          >
            <div 
              className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center border"
              style={{ 
                backgroundColor: 'color-mix(in srgb, var(--accent-amber) 15%, transparent)',
                borderColor: 'color-mix(in srgb, var(--accent-amber) 30%, transparent)',
                color: 'var(--accent-amber)'
              }}
            >
              <AlertCircle size={28} />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--accent-amber)' }}>
                Application State Recovery
              </span>
              <h2 className="text-xl md:text-2xl font-bold font-display" style={{ color: 'var(--text-body)' }}>
                Something interrupted this view
              </h2>
              <p className="text-xs md:text-sm font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                A temporary network or script refresh interrupted the page. You can reload the view or return to the main dashboard.
              </p>
            </div>

            {this.state.error && (
              <div 
                className="p-3.5 rounded-xl border text-left font-mono text-xs overflow-auto max-h-40"
                style={{ 
                  backgroundColor: 'color-mix(in srgb, var(--danger) 10%, transparent)', 
                  borderColor: 'color-mix(in srgb, var(--danger) 30%, transparent)',
                  color: 'var(--danger)'
                }}
              >
                <div className="font-bold text-[11px] mb-1">{this.state.error.name}: {this.state.error.message}</div>
                {this.state.error.stack && (
                  <pre className="text-[9px] opacity-80 whitespace-pre-wrap leading-tight">{this.state.error.stack}</pre>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="btn-cta w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCw size={14} />
                Reload Page
              </button>
              <button
                onClick={this.handleGoHome}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                style={{ 
                  backgroundColor: 'var(--bg-surface-alt)', 
                  borderColor: 'var(--border-card)', 
                  color: 'var(--text-body)' 
                }}
              >
                <Home size={14} />
                Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
