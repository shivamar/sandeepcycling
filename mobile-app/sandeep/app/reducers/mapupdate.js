import { MAP_UPDATE } from '../actions/types'

export default (state = null, action) => {
  switch (action.type) {

    case MAP_UPDATE:
      return action.payload
    default:
      return state
  }
}
