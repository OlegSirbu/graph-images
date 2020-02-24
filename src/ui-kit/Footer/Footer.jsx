import React from 'react'
import classes from './Footer.scss'

const Footer = () => (
  <div className={classes.footer}>
    <span className='bp3-text-small bp3-text-muted'>© {new Date().getFullYear()} MedSpoke — All rights reserved.</span>
  </div>
)

export default Footer
