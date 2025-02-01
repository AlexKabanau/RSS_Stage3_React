import { Component } from 'react';

// type ErrorButtonPropsType = { disabled: boolean };
type ErrorButtonStateType = { error: boolean };

export default class ErrorButton extends Component {
  state: ErrorButtonStateType = {
    error: false,
  };
  handleError() {
    console.log('error');
    this.setState({ error: true });
  }

  componentDidUpdate(): void {
    if (this.state.error) {
      throw new Error('Error');
    }
  }
  render() {
    return <button onClick={() => this.handleError()}>ErrorButton</button>;
  }
}
