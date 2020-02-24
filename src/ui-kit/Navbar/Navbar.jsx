import React from 'react'
import PT from 'prop-types'
import { Navbar as BlueprintNavbar } from "@blueprintjs/core"
import classes from './Navbar.scss'
import cx from 'classnames'

const Navbar = (props) => {
  return (
    <BlueprintNavbar className={cx(classes.navbar, props.className)}>
      {props.children}
    </BlueprintNavbar>
  )
}

Navbar.propTypes = {
  children: PT.oneOfType([PT.element, PT.array]),
  className: PT.string,
}

export default Navbar
