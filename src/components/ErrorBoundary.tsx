import React, { Component } from 'react';

type ErrorBoundaryPropsType = {
  children: React.ReactNode;
};
type ErrorStateType = {
  isError: boolean;
  message: string;
};
export default class ErrorBoundary extends Component<ErrorBoundaryPropsType> {
  state: ErrorStateType = {
    isError: false,
    message: '',
  };

  static getDerivedStateFromError(error: Error): ErrorStateType {
    return { isError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.isError) {
      return (
        <div className="error-content">
          <h3>Some error occurred. Please open console and try again.</h3>
          <p>{this.state.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
