import { arcgisToGeoJSON, geojsonToArcGIS } from "@esri/arcgis-to-geojson-utils";
import { Dimensions } from "react-native";

//layer id map for code readability
const layers = {
  facilities: 0,
  trails: 1,
  areas: 2,
  restrictedAreas: 3,
  seasonalRestrictedAreas: 4,
  parkAmmenitiesPivot: 5
};

//spatial reference integer to send in queries
const spatialReference = 4326;

//this is stored separately because in esri, wkid and latestwkid can be different:
const esriSpatialRefObj = { wkid: 4326, latestWkid: 4326 };

//temporary hard coding of firstmap parkfinder endpoint
// needs to be eventually replaced with pull from web api to decouple from that particular mapserver
const queryEndpoint = "https://firstmap.gis.delaware.gov/arcgis/rest/services/Applications/DE_ParkFinder/MapServer/";

const ArcGIS = {
  /*
   * Fires off a query for features within a certain bounding box, returns a promise
   * that eventually resolves to a json object.
   *
   *  @param bounds - 2d array containing 4 values as such:
   *    [
   *       [minimumLongitude,minimumlatitude]
   *       [maximumLongitude,maximumLatitude]
   *    ]
   */
  getFeaturesInBounds: bounds => {
    var query = {
      f: "json",
      returnGeometry: true,
      spatialRel: "esriSpatialRelIntersects",
      maxAllowableOffset: ArcGIS.getMaxAllowableOffsetByScreenSize(bounds),
      geometry: {
        xmin: bounds[0][0],
        ymin: bounds[0][1],
        xmax: bounds[1][0],
        ymax: bounds[1][1],
        spatialReference: esriSpatialRefObj
      },
      geometryType: "esriGeometryEnvelope",
      inSR: spatialReference,
      outFields: "*",
      outSR: spatialReference
    };

    var url = queryEndpoint + layers["areas"] + "/query?" + ArcGIS.urlEncodeJson(query);

    return ArcGIS.getFeatures(url)
      .then(resp => {
        console.log("getFeaturesInBounds resp");
        console.log(resp);
        return resp;
      })
      .catch(err => {
        console.log("getFeaturesInBounds err");
        console.log(err);
        return err;
      });
  },
  /*
   * Used to generate a "maxAllowableOffset" to use in
   *   ArcGIS queries to simplify geometry. Returns a float.
   *
   *  @param bounds - 2d array containing 4 values as such:
   *    [
   *       [minimumLongitude,minimumlatitude]
   *       [maximumLongitude,maximumLatitude]
   *    ]
   */
  getMaxAllowableOffsetByScreenSize: bounds => {
    var { height, width } = Dimensions.get("screen");
    var boundsWidth = Math.abs(bounds[1][0] - bounds[0][0]);
    return boundsWidth / width / 2;
  },
  urlEncodeJson: obj => {
    return Object.keys(obj)
      .map(key => {
        var val = obj[key];
        if (val instanceof Array || val instanceof Object) {
          val = JSON.stringify(val);
        }
        return encodeURIComponent(key) + "=" + encodeURIComponent(val);
      })
      .join("&");
  },
  getParkAmmenities: () => {
    var url = queryEndpoint + layers["parkAmmenitiesPivot"] + "/query?where=1%3D1&outfields=*&f=pjson";
    return ArcGIS.getFeatures(url)
      .then(resp => {
        return resp;
      })
      .catch(err => {
        return err;
      });
  },
  getFeatures: url => {
    return ArcGIS.getJson(url)
      .then(resp => {
        console.log("getFeatures");
        console.log(resp);
        return arcgisToGeoJSON(resp);
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  },
  getJson: url => {
    return fetch(url)
      .then(resp => {
        console.log("getJson");
        console.log(resp);
        return resp.json();
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  },
  test: () => {
    fetch("https://firstmap.gis.delaware.gov/arcgis/rest/services/Applications/DE_ParkFinder/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=1&f=json")
      .then(resp => {
        return resp.json();
      })
      .then(resp => {
        console.warn(arcgisToGeoJSON(resp));
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
