import React from 'react'
import PT from 'prop-types'
import classes from './Spacer.scss'
import cx from 'classnames'

const Spacer = (props) => (
  <div className={
    cx(
      classes.spacer,
      {
        [classes.horizontal]: props.horizontal,
        [classes.vertical]: props.vertical,
      },
    )}
  />
)

Spacer.propTypes = {
  horizontal: PT.bool,
  vertical: PT.bool,
}

Spacer.defaultProps = {
  horizontal: false,
  vertical: false,
}

export default Spacer
