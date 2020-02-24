import React from "react"
import { Route, Switch } from "react-router-dom"
import List from './List'
import View from './View'
import CreateForm from './CreateForm'
import EditForm from './EditForm'

export const ImageRoutes = () => (
  <Switch>
    <Route path='/images' exact component={List} />
    <Route path='/images/new' exact component={CreateForm} />
    <Route exact
      path='/images/:imageId'
      render={(props) => <View {...props} imageId={props.match.params.imageId} />}
    />
    <Route
      path='/images/:imageId/edit'
      render={(props) => <EditForm {...props} imageId={props.match.params.imageId} />}
    />
  </Switch>
)

export default ImageRoutes
