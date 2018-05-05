import { arcgisToGeoJSON, geojsonToArcGIS } from "@esri/arcgis-to-geojson-utils";
import { Dimensions } from "react-native";

//spatial reference integer to send in queries
const spatialReference = 4326;

//this is stored separately because in esri, wkid and latestwkid can be different:
const esriSpatialRefObj = { wkid: 4326, latestWkid: 4326 };

//temporary hard coding of firstmap parkfinder endpoint
// needs to be eventually replaced with pull from web api to decouple from that particular mapserver
const queryEndpoint = "https://firstmap.gis.delaware.gov/arcgis/rest/services/Applications/DE_ParkFinder/MapServer/";

export const ArcGIS = {
  //layer id map for code readability
  layers: {
    facilities: 0,
    trails: 1,
    areas: 2,
    restrictedAreas: 3,
    seasonalRestrictedAreas: 4,
    parkAmmenitiesPivot: 5
  },

  /**
   * Fires off a query for features within a certain bounding box, returns a promise
   * that eventually resolves to a json object.
   *
   *  @param {Array} bounds - 2d array containing 4 values as such:
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

    var url = queryEndpoint + ArcGIS.layers["areas"] + "/query?" + ArcGIS.urlEncodeJson(query);

    return ArcGIS.getGeoJson(url)
      .then(resp => {
        return resp;
      })
      .catch(err => {
        console.log("getFeaturesInBounds err");
        return err;
      });
  },
  /**
   * Used to retrieve the JSON object representing an ArcGIS MapServer layer
   * @param {int} layerId  the integer id of the layer in the rest services
   *
   */
  getLayerInfo: layerId => {
    var url = queryEndpoint + layerId + "?f=json";
    return ArcGIS.getJson(url)
      .then(resp => {
        return resp;
      })
      .catch(err => {
        console.log("getLayerInfo err");
        return err;
      });
  },

  /**
   * Used to generate a "maxAllowableOffset" to use in
   *   ArcGIS queries to simplify geometry. Returns a float.
   *  @param {Array} bounds - 2d array containing 4 values as such:
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
  /**
   * Method to query an ArcGIS endpoint for features with a where clause.
   * @param {int} layerId  to be retrieved from ArcGIS.layers, e.g. ArcGIS.layers["facilities"]
   * @param {string} whereClause  arcgis server where clause, using SQL syntax
   */
  queryFeaturesWhere: (whereClause, layerId) => {
    var query = {
      f: "json",
      returnGeometry: true,
      spatialRel: "esriSpatialRelIntersects",
      geometryType: "esriGeometryEnvelope",
      inSR: spatialReference,
      outFields: "*",
      outSR: spatialReference,
      where: whereClause
    };

    var url = queryEndpoint + layerId + "/query?" + ArcGIS.urlEncodeJson(query);
    console.warn(url);
    return ArcGIS.getGeoJson(url)
      .then(resp => {
        return resp;
      })
      .catch(err => {
        console.log("queryFeaturesWhere err");
        console.log(err);
        return err;
      });
  },
  getParkAmmenities: () => {
    var url = queryEndpoint + ArcGIS.layers["parkAmmenitiesPivot"] + "/query?where=1%3D1&outfields=*&f=pjson";
    return ArcGIS.getGeoJson(url)
      .then(resp => {
        return resp;
      })
      .catch(err => {
        return err;
      });
  },
  /**
   * Method to send a get request to an arcGIS REST endpoint and respond with a
   * geoJSON-formatted JSON Object
   * @param {string} url should be a valid arcgis server endpoint url
   */
  getGeoJson: url => {
    return ArcGIS.getJson(url)
      .then(resp => {
        return arcgisToGeoJSON(resp);
      })
      .catch(err => {
        console.log("getGeoJson err:");
        console.log(err);
        return err;
      });
  },
  /**
   * Method to send a get request and receive a json object
   * geoJSON-formatted JSON Object
   * @param {string} url should be a valid api url that returns a JSON string
   */
  getJson: url => {
    return fetch(url)
      .then(resp => {
        return resp.json();
      })
      .catch(err => {
        console.log("getJson err");
        console.log(err);
        return err;
      });
  },
  /**
   * Accepts a json query object and returns a URL-encoded string representation of it
   * @param {Object} obj
   */
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
  }
};
