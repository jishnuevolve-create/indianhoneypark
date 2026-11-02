import { Component } from 'react';

/*
  Safety net: if any part of a page crashes, show a friendly message
  instead of a blank white screen. (React requires a class component for this.)
*/
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Something went wrong while showing this page:', error, errorInfo);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        role="alert"
        className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center"
      >
        <h1 className="">Something went wrong.</h1>
        <p className="max-w-md text-ink-soft">
          Please refresh the page. If the problem continues, contact us on WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="h-12 cursor-pointer rounded-full bg-primary px-7 text-[15px] font-semibold text-white hover:bg-primary-hover"
        >
          Refresh page
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
