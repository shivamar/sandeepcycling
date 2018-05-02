import { INIT, ARC_GIS } from "./types";
import {
  arcgisToGeoJSON,
  geojsonToArcGIS
} from "@esri/arcgis-to-geojson-utils";

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
export const arcGIS = () => dispatch => {
  fetch(
    "https://firstmap.gis.delaware.gov/arcgis/rest/services/Applications/DE_ParkFinder/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=100&f=json"
  )
    .then(response => {
      return response.json();
    })
    .then(respJson => {
      return dispatch({
        type: ARC_GIS,
        payload: arcgisToGeoJSON(respJson)
      });
    });

  var requestParams = {
    where: "1=1",
    geometryType: "esriGeometryEnvelope",
    spatialRel: "esriSpatialRelIntersects",
    outFields: "*",
    returnGeometry: "true",
    returnTrueCurves: "true",
    outSR: "4326",
    returnIdsOnly: "false",
    returnCountOnly: "false",
    returnZ: "false",
    returnM: "false",
    returnDistinctValues: "false",
    f: "json"
  };
};
