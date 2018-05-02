import { ARC_GIS } from '../actions/types'

export default (state = null, action) => {
  switch (action.type) {
    case ARC_GIS:
      console.log(action.payload)
      return action.payload
    default:
      return state
  }
}
