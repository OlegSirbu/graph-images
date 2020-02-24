import React from 'react';
import has from 'lodash/has';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1 style={{color: 'white'}}>Oops, smt is broken, our team fixing it!</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
