import { INIT, ARC_GIS } from "./types";
import ArcGIS from '../ArcGIS'

export const init = () => {
  return dispatch => {
    // api calls n shizzles
    dispatch({
      type: INIT,
      payload: "we are ready to go"
    });
  };
};
// Redux Thunk
export const callArcGIS = url => dispatch => {

  ArcGIS.getParkAmmenities();
  ArcGIS.getFeatures(url)
    .then((respjson) => {
      return dispatch({
        type: ARC_GIS,
        payload: respjson
      });
    })
    .catch((err) => {
      return dispatch({
        type: ARC_GIS,
        payload: null
      });
    });
};
