import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import ArcGIS from "../ArcGIS";
MapboxGL.setAccessToken("pk.eyJ1IjoiYXdvb2RhbGwiLCJhIjoiY2pnZnJyYjB6MDRqdTMzbzVzbXUzNnowdCJ9.Iv9Ya7fRrQShET_iMEwWMw");

// Import action creators
import { init, callArcGIS } from "../actions/apiRequests";

const layerStyles = MapboxGL.StyleSheet.create({
  lineStyle: {
    lineColor: "blue",
    lineWidth: 3,
    lineOpacity: 0.84
  }
});

class Main extends Component {
  state = {
    arcGIS: null
  };

  componentDidMount() {
    this.props.init();
    // call action creator
    this.props.callArcGIS("https://firstmap.gis.delaware.gov/arcgis/rest/services/Applications/DE_ParkFinder/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=100&f=json");
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.arcGIS !== null) {
      this.setState({
        arcGIS: nextProps.arcGIS
      });
    }
  }
  navigate = () => {
    this.props.navigation.navigate("ParkDetail");
  };

  renderLines() {
    if (!this.state.arcGIS) {
      return null;
    }

    return (
      <MapboxGL.ShapeSource id="routeSource" shape={this.state.arcGIS}>
        <MapboxGL.LineLayer id="line" style={layerStyles.lineStyle} />
      </MapboxGL.ShapeSource>
    );
  }

  onRegionChanged = async () => {
    console.log(":()");
    const visBounds = await this._map.getVisibleBounds();
    console.log(visBounds);
    this.setState({
      visBounds
    });
  };
  onPress = () => {
    console.log("TEST");
  };
  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <MapboxGL.MapView
          ref={c => (this._map = c)}
          animated={true}
          zoomLevel={12}
          pitchEnabled={false}
          showUserLocation={true}
          centerCoordinate={[-75.552104, 39.756706]}
          onPress={this.onPress}
          styleURL={MapboxGL.StyleURL.Street}
          style={{
            flex: 1
          }}
        >
          {this.renderLines()}
        </MapboxGL.MapView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  // return properties from global state
  return {
    test: state.test,
    arcGIS: state.arcGIS
  };
};

// connect new action creators to Component
export default connect(mapStateToProps, {
  init,
  callArcGIS
})(Main);
