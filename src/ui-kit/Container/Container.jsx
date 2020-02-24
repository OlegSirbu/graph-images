import React from 'react'
import PT from 'prop-types'
import classes from './Container.scss'

const Container = (props) => {
  return (
    <div className={classes.container}>
      {props.children}
    </div>
  )
}

Container.propTypes = {
  children: PT.node,
}

export default Container
