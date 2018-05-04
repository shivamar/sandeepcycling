import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions, Keyboard } from "react-native";
import { connect } from "react-redux";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import ArcGIS from "../ArcGIS";
MapboxGL.setAccessToken("pk.eyJ1IjoiYXdvb2RhbGwiLCJhIjoiY2pnZnJyYjB6MDRqdTMzbzVzbXUzNnowdCJ9.Iv9Ya7fRrQShET_iMEwWMw");

// Import action creators
import { init, getFeaturesInBounds, updateMapBounds } from "../actions/apiRequests";

import FloatingSearchBar from "../components/FloatingSearchBar";
import MainList from "./MainList";

const { width, height } = Dimensions.get("window");

const layerStyles = MapboxGL.StyleSheet.create({
  lineStyle: {
    lineColor: "blue",
    lineWidth: 3,
    lineOpacity: 0.84
  },
  fillStyle: {
    fillColor: "green",
    fillOpacity: 0.4
  }
});

class Main extends Component {
  state = { arcGIS: null, filtersOpen: false };

  componentDidMount() {
    this.props.init();
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
        <MapboxGL.LineLayer id="fill" style={layerStyles.lineStyle} />
      </MapboxGL.ShapeSource>
    );
  }

  renderParks() {
    if (!this.state.arcGIS) {
      return null;
    }

    return (
      <MapboxGL.ShapeSource id="routeSource" shape={this.state.arcGIS}>
        <MapboxGL.FillLayer id="fill" style={layerStyles.fillStyle} />
      </MapboxGL.ShapeSource>
    );
  }

  onRegionChanged = async () => {
    const visBounds = await this._map.getVisibleBounds();
    this.props.getFeaturesInBounds(visBounds);
    this.props.updateMapBounds(visBounds);
  };

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <MapboxGL.MapView
          logoEnabled={false}
          onPress={() => {
            Keyboard.dismiss;
          }}
          onRegionWillChange={() => {
            Keyboard.dismiss;
          }}
          ref={c => (this._map = c)}
          animated={true}
          zoomLevel={12}
          pitchEnabled={false}
          showUserLocation={true}
          centerCoordinate={[-75.552104, 39.756706]}
          onRegionDidChange={this.onRegionChanged}
          styleURL={MapboxGL.StyleURL.Street}
          style={{
            flex: 1
          }}
        >
          {this.renderParks()}
        </MapboxGL.MapView>
        <FloatingSearchBar />
        <MainList filtersOpen={this.state.filtersOpen} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  // return properties from global state
  return {
    test: state.test,
    arcGIS: state.arcGIS,
    mapViewBounds: state.mapViewBounds
  };
};

// connect new action creators to Component
export default connect(mapStateToProps, {
  init,
  getFeaturesInBounds,
  updateMapBounds
})(Main);
