import React from "react"
import { Formik } from 'formik'
import { get } from 'lodash';

import {
  Button,
  Card,
  ControlGroup,
  Elevation,
  InputGroup,
  FormGroup,
  TextArea,
} from "@blueprintjs/core"

import {
  Container,
  Spacer,
} from 'ui-kit'

import classes from '../routes/Images/Images.scss';

export default function withBaseForm(WrappedComponent) {
  return class extends React.Component {
    constructor(props){
      super(props);
    }
    
    isSubmittable = (values) => !values.height ||
      !values.width ||
      !values.raw_url

    renderTextInput = (label, name, values, handleChange, type, placeholder = '') => {
      let content = <InputGroup
        type={type}
        name={name}
        onChange={handleChange}
        value={values[name]}
        placeholder={placeholder}
      />

      if (label) {
        content = <FormGroup label={label} labelFor={name}>{content}</FormGroup>
      }

      return content
    }

    renderForm = ({ name, data: image = {}, onSubmit }) => (
      <div className={classes.form}>
        <Container>
          <Card elevation={Elevation.TWO}>
            <h3 className="bp3-heading">{`${name} image`}</h3>
            <Spacer vertical />

            <Formik
              initialValues={{
                height: image.height || '',
                width: image.width || '',
                raw_url: get(image, 'url.raw', ''),
                small_url: get(image, 'url.small',''),
                thumb_url: get(image, 'url.thumb',''),
                description: image.description || '',
              }}
              onSubmit={onSubmit}
            >
              {({
                values,
                handleChange,
                handleReset,
                handleSubmit,
              }) => (
                  <form onSubmit={handleSubmit}>
                    <FormGroup label='Image size'>
                      <ControlGroup>
                        {this.renderTextInput(null, 'height', values, handleChange, 'number', 'Height')}
                        {this.renderTextInput(null, 'width', values, handleChange, 'number', 'Width')}
                      </ControlGroup>
                    </FormGroup>

                    <Spacer vertical />

                    <FormGroup
                      label='Description'
                      labelFor='description'
                    >
                      <TextArea
                        name='description'
                        growVertically
                        fill
                        onChange={handleChange}
                        value={values.description}
                      />
                    </FormGroup>

                    <Spacer vertical />

                    {this.renderTextInput('URL - Raw', 'raw_url', values, handleChange)}
                    {this.renderTextInput('URL - Small', 'small_url', values, handleChange)}
                    {this.renderTextInput('URL - Thumb', 'thumb_url', values, handleChange)}

                    <Spacer vertical />

                    <Button large text='Reset' type='reset' onClick={handleReset} />
                    <Spacer horizontal />
                    <Button large text={name == 'Edit' ? 'Save' : 'Create' } type='submit' disabled={this.isSubmittable(values)} onClick={handleSubmit} intent='success' />
                  </form>
                )}
            </Formik>
          </Card>
        </Container>
      </div>
    )

    render() {
      return <WrappedComponent 
        {...this.props}
        renderForm={this.renderForm}
      />;
    }
  };
}