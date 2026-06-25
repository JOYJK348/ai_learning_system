'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught rendering error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div 
          style={{ 
            display: 'grid', 
            placeItems: 'center', 
            minHeight: '60vh', 
            padding: '2rem',
            fontFamily: 'system-ui, sans-serif'
          }}
        >
          <div 
            style={{
              maxWidth: '28rem',
              width: '100%',
              background: '#ffffff',
              border: '1px solid rgba(15, 23, 42, 0.08)',
              borderRadius: '1.25rem',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
            }}
          >
            <div 
              style={{ 
                width: '3.5rem', 
                height: '3.5rem', 
                background: '#fef2f2', 
                color: '#ef4444', 
                borderRadius: '50%', 
                display: 'grid', 
                placeItems: 'center',
                margin: '0 auto 1.25rem',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}
            >
              ⚠️
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 850, margin: '0 0 0.5rem', color: '#0f172a' }}>
              Oops! Something broke
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1.5rem', lineHeight: '1.5', fontWeight: 550 }}>
              We encountered an unexpected rendering error on this page. You can try reloading or reporting it to the administrator.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={this.handleReload}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '99px',
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  background: '#12312f',
                  color: '#ffffff',
                  fontWeight: 750,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(18, 49, 47, 0.15)'
                }}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
