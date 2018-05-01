import { INIT } from './types'

export const init = () => {
  return dispatch => {
    // api calls n shizzles
    dispatch({
      type: INIT,
      payload: 'we are ready to go'
    })
  }
}
