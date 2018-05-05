import { INIT, ARC_GIS, MAP_UPDATE, GET_CATEGORIES } from "./types";
import { ArcGIS } from "../ArcGIS";

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
export const getFeaturesInBounds = bounds => dispatch => {
  ArcGIS.getFeaturesInBounds(bounds)
    .then(respjson => {
      return dispatch({
        type: ARC_GIS,
        payload: respjson
      });
    })
    .catch(err => {
      return dispatch({
        type: ARC_GIS,
        payload: null
      });
    });
};

export const getFilterCategories = () => dispatch => {
  ArcGIS.getLayerInfo(ArcGIS.layers["parkAmmenitiesPivot"])
    .then(respjson => {
      console.log(respjson);
      return dispatch({
        type: GET_CATEGORIES,
        payload: respjson
      });
    })
    .catch(err => {
      return dispatch({
        type: GET_CATEGORIES,
        payload: null
      });
    });
};

export const getFeaturesWhere = (query,layerId) => dispatch => {
  ArcGIS.queryFeaturesWhere(query,layerId)
    .then(respjson => {
      return dispatch({
        type: ARC_GIS,
        payload: respjson
      });
    })
    .catch(err => {
      return dispatch({
        type: ARC_GIS,
        payload: null
      });
    });
};


export const updateMapBounds = bounds => {
  return dispatch => {
    dispatch({
      type: MAP_UPDATE,
      payload: bounds
    });
  };
};
