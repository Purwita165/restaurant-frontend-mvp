// src/components/ErrorBoundary.tsx
import { Component } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center text-red-500 bg-gray-50 min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Terjadi kesalahan</h2>
          <p>{this.state.error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded"
          >
            Muat Ulang
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}