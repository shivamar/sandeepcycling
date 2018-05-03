import { MAP_UPDATE } from '../actions/types'

export default (state = null, action) => {
  switch (action.type) {

    case MAP_UPDATE:
    console.log("reducer action payload:");
    console.log(action.payload);
      return action.payload
    default:
      return state
  }
}
