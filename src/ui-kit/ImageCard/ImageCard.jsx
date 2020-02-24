import React, { PureComponent } from 'react'

import PT from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
  Button,
  Card,
  Elevation,
  Icon,
  Menu,
  MenuItem,
  Popover,
  Intent,
  Position,
} from "@blueprintjs/core";
import cx from 'classnames';
import missingImage from 'images/missing-image.png';
import classes from './ImageCard.scss'

class ImageCard extends PureComponent {
  static propTypes = {
    imageURL: PT.string.isRequired,
    title: PT.string.isRequired,
    subtitle: PT.string,
    className: PT.string,
    handleClick: PT.func.isRequired,
    imageId: PT.string.isRequired
  }

  static defaultProps = {
    subtitle: null,
    className: null,
  }

  renderCardMenu = () => (
    <Menu>
      <MenuItem
        icon="edit"
        text="Edit image"
        onClick={() => this.props.history.push(`/images/${this.props.imageId}/edit`)}
      />
    </Menu>
  )

  render = () => {
    const { imageURL, title, subtitle, className, handleClick, imageId, likes, handlerLikeImage } = this.props; 
    const cardClasses = cx(classes.imageCard, 'bp3-borderless', className)

    return (
      <Card className={cardClasses} elevation={Elevation.TWO}>
        <div className={classes.header}>
          <div className={classes.content} onClick={handleClick}>
            <p className='bp3-text-large bp3-running-text'>{title}</p>
            <p className='bp3-text-disabled bp3-running-text'>{subtitle || "---"}</p>
          </div>
          <div className={classes.actions}>
            <Popover content={this.renderCardMenu()} position={Position.BOTTOM}>
              <Button className="bp3-minimal" icon="more" minimal />
            </Popover>
          </div>
        </div>
        <div
          className={classes.image}
          style={{ backgroundImage: `url(${imageURL}), url(${missingImage})` }}
          onClick={handleClick}
        >
          <div className={classes.highlight}>
            <div className={classes.icon}>
              <Icon icon={'maximize'} iconSize={16} />
            </div>
          </div>
        </div>
        <div className={classes.footer}>
          <Icon
            className={classes.like}
            intent={likes > 0 ? Intent.DANGER : Intent.PRIMARY}
            icon={'thumbs-up'}
            iconSize={30}
            onClick={handlerLikeImage.bind(this, {variables:{ id: imageId }, likes})}
          />
          {likes === 1 ? '1 person likes it' : likes > 0 ? `${likes} people like it` : 'will be the first who like it' }
        </div>
      </Card>
    )
  }
}

export default withRouter(ImageCard)
