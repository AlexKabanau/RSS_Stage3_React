import React, { Component } from 'react';

type ErrorBoundaryPropsType = {
  children: React.ReactNode;
};
type ErrorStateType = {
  hasError: boolean;
  message: string;
};
export default class ErrorBoundary extends Component<
  ErrorBoundaryPropsType,
  ErrorStateType
> {
  constructor(props: ErrorBoundaryPropsType) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(): ErrorStateType {
    return { hasError: true, message: 'Some error!' };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error in ErrorBoundary:', error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false });
  };
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-content">
          <h3>Some error occurred. Please open console and try again.</h3>
          <button onClick={this.reset}>Reset</button>
        </div>
      );
    }
    return this.props.children;
  }
}
