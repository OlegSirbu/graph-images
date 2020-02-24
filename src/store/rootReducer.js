import { combineReducers } from 'redux'
import imageReducer, { IMAGE_KEY } from 'modules/image/image'

const makeRootReducer = () => combineReducers({
  [IMAGE_KEY]: imageReducer
})

export default makeRootReducer
