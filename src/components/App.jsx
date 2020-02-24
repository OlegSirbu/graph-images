import React, { Component } from "react"
import PT from 'prop-types'
import { Footer } from 'ui-kit'
import '../styles/vendor/vendor.scss'
import '../styles/app.scss';

class App extends Component {
  static propTypes = {
    children: PT.element.isRequired,
  }

  render() {
    return (
      <>
        {this.props.children}
        <Footer />
      </>
    )
  }
}

export default App
