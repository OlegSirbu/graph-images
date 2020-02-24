import React from 'react'
import PT from 'prop-types'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { Navbar } from 'ui-kit'
import {
  Alignment,
  Button,
  Icon,
  Divider,
  Navbar as BlueprintNavbar,
} from "@blueprintjs/core"
import { Image as ImageQuery } from 'queries/images.graphql'
import { selectPrevImageId, selectNextImageId } from 'modules/image/image'
import cx from 'classnames'
import { Link } from "react-router-dom"
import appClasses from 'styles/app.scss'
import classes from './Images.scss'

const mapStateToProps = (state, ownProps) => ({
  prevImageId: selectPrevImageId(state, ownProps.imageId),
  nextImageId: selectNextImageId(state, ownProps.imageId)
})

const View = ({ imageId, prevImageId, nextImageId, history }) => {
  const handleControlsClick = (imageId) => {
    history.push(`${imageId}`)
  }
  const renderPrevImageButton = () => {
    if (!prevImageId) return <div className={cx(classes.pane, classes.left, classes.disabled)} />
    return (
      <div className={cx(classes.pane, classes.left)} onClick={() => handleControlsClick(prevImageId)}>
        <Icon
          icon="chevron-left"
          className={cx(classes.arrow, classes.prev)}
          iconSize={20}
        />
      </div>
    )
  }

  const renderNextImageButton = () => {
    if (!nextImageId) return <div className={cx(classes.pane, classes.left, classes.disabled)} />
    return (
      <div className={cx(classes.pane, classes.right)} onClick={() => handleControlsClick(nextImageId)}>
        <Icon
          icon="chevron-right"
          className={cx(classes.arrow, classes.next)}
          iconSize={20}
        />
      </div>
    )
  }

  const { loading, error, data } = useQuery(ImageQuery, { variables: { id: imageId } })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const image = data.image

  return (
    <>
      <Navbar className={classes.navbar}>
        <BlueprintNavbar.Group align={Alignment.LEFT} />
        <BlueprintNavbar.Group align={Alignment.CENTER}>
          <span className='bp3-ui-text bp3-running-text'>
            {image.description || 'Untitled image'} — {' '}
            <span className="bp3-text-disabled">by {image.author ? `@${image.author.username}` : 'unknown'}</span>
          </span>
        </BlueprintNavbar.Group>
        <BlueprintNavbar.Group align={Alignment.RIGHT}>
          <Button
            large
            minimal
            icon="edit"
            onClick={() => history.push(`/images/${imageId}/edit`)}
          />
          <Divider className={"bp3-transparent"} />
          <Link to="/" className={appClasses.noUnderline}>
            <Button large icon="cross" />
          </Link>
        </BlueprintNavbar.Group>
      </Navbar>

      <div className={classes.imageBackground} style={{ 'backgroundImage': `url(${image.url.raw})` }} />

      <div className={classes.galleryControls}>
        {renderPrevImageButton()}
        {renderNextImageButton()}
      </div>
    </>
  )
}


View.propTypes = {
  imageId: PT.string.isRequired,
  prevImageId: PT.string,
  nextImageId: PT.string
}

View.defaultProps = {
  prevImageId: null,
  nextImageId: null,
}


export default connect(mapStateToProps)(View)
