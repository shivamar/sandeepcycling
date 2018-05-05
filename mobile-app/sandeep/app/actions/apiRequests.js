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


/**
 * Action creator for retrieving features visible within the current bounds of the MapView
 * @param {Array} bounds - a 2 dimensional array containing the current mapview bounds, obtained by MapView.getVisibleBounds()
 */
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

/**
 * Action creator for retrieving a list of all possibly park facilities for the purpose of filtering parks
 */
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

/**
 * Action creator for retrieving features visible within the current bounds of the MapView
 * @param {string} query - a SQL WHERE clause for arcgis MapServer
 * @param {int} layerId - the integer ID of the arcgis layer to query
 */
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

/**
 * Action creator to update the app state with new map bounds
 * @param {Array} bounds - a 2 dimensional array containing the current mapview bounds, obtained by MapView.getVisibleBounds()
 */
export const updateMapBounds = bounds => {
  return dispatch => {
    dispatch({
      type: MAP_UPDATE,
      payload: bounds
    });
  };
};
