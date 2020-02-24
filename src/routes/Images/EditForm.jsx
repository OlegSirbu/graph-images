import React from 'react'
import { Formik } from 'formik'
import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  Image as ImageQuery,
  UpdateImage as UpdateImageMutation
} from 'queries/images.graphql'
import {
  Navbar,
} from 'ui-kit'
import {
  Alignment,
  Button,
  Divider,
  Navbar as BlueprintNavbar,
} from "@blueprintjs/core"
import { Link } from "react-router-dom"
import appClasses from 'styles/app.scss'
import classes from './Images.scss'
import withBaseForm from '../../hocs/withBaseForm';

const EditForm = (props) => {
  const { loading, error, data } = useQuery(ImageQuery, { variables: { id: props.imageId } })
  const image = data ? data.image : {}

  const [updateImage] = useMutation(UpdateImageMutation, {
    onCompleted: ({ updateImage }) => {
      props.history.push(`/images/${updateImage.id}`)
    }
  })

  const { renderForm } = props;

  if (loading) return <p>Loading...</p>
  if (error) throw new Error(error);

  const handlerSubmit = (id, values) => updateImage({ variables: { id, data: values } })

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
            icon="eye-open"
            onClick={() => props.history.push(`/images/${props.imageId}`)}
          />
          <Divider className={"bp3-transparent"} />
          <Link to="/" className={appClasses.noUnderline}>
            <Button large icon="cross" />
          </Link>
        </BlueprintNavbar.Group>
      </Navbar>

      <div className={classes.imageBackground} style={{ 'backgroundImage': `url(${image.url.raw})` }} />

      {renderForm({
        name: 'Edit', 
        data: image, 
        onSubmit: handlerSubmit.bind(this, image.id)
      })}
      
    </>
  )
}

export default withBaseForm(EditForm);
