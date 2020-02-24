import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { CreateImage as CreateImageMutation } from 'queries/images.graphql'
import {
  Navbar,
} from 'ui-kit'
import {
  Alignment,
  Button,
  Navbar as BlueprintNavbar,
} from "@blueprintjs/core"
import { Link } from "react-router-dom"
import appClasses from 'styles/app.scss'
import classes from './Images.scss'
import withBaseForm from '../../hocs/withBaseForm';

const CreateForm = (props) => {
  const [createImage] = useMutation(CreateImageMutation, {
    onCompleted: ({ createImage }) => {
      props.history.push(`/images/${createImage.id}`)
    }
  })

  const { renderForm } = props;

  const handlerSubmit = (values) => createImage({ variables: { data: values } });

  return (
    <>
      <Navbar className={classes.navbar}>
        <BlueprintNavbar.Group align={Alignment.LEFT} />
        <BlueprintNavbar.Group align={Alignment.CENTER}>
          <span className='bp3-ui-text bp3-running-text'>
            Enter image details
          </span>
        </BlueprintNavbar.Group>
        <BlueprintNavbar.Group align={Alignment.RIGHT}>
          <Link to="/" className={appClasses.noUnderline}>
            <Button large icon="cross" />
          </Link>
        </BlueprintNavbar.Group>
      </Navbar>

      {renderForm({
        name: 'New', 
        data: {}, 
        onSubmit: handlerSubmit
      })}

    </>
  )
}

export default withBaseForm(CreateForm);
