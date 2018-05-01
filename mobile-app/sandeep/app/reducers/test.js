import { INIT } from '../actions/types'

export default (state = 'hey dawnbot', action) => {
  switch (action.type) {
    case INIT:
      return action.payload
    default:
      return state
  }
}
