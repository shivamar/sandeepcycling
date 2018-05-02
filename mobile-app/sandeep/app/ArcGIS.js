import {
  arcgisToGeoJSON,
  geojsonToArcGIS
} from "@esri/arcgis-to-geojson-utils";

const ArcGIS = {


  test: () => {
    fetch(
      "https://firstmap.gis.delaware.gov/arcgis/rest/services/Applications/DE_ParkFinder/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=1&f=json"
    )
      .then(response => {
        return response.json();
      })
      .then(respJson => {
        //console.warn(arcgisToGeoJSON(respJson));
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
  }
};

/*MapServer/4/query?f=json&returnGeometry=true&spatialRel=esriSpatialRelIntersects&maxAllowableOffset=76&geometry=%7B%22xmin%22%3A-8492459.590611503%2C%22ymin%22%3A4774562.53482556%2C%22xmax%22%3A-8453323.832129546%2C%22ymax%22%3A4813698.293307517%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%2C%22latestWkid%22%3A3857%7D%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=OBJECTID%2CPARK%2CCLOSURE%2CSTATUS%2CCOMMENTS&outSR=102100*/

export default ArcGIS;
