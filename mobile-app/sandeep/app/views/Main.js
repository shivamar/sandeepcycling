import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import ArcGIS from "../ArcGIS";
MapboxGL.setAccessToken(
  "pk.eyJ1IjoiYXdvb2RhbGwiLCJhIjoiY2pnZnJyYjB6MDRqdTMzbzVzbXUzNnowdCJ9.Iv9Ya7fRrQShET_iMEwWMw"
);

// Import action creators
import { init, arcGIS } from "../actions/apiRequests";

class Main extends Component {
  state = { arcGIS: null };

  componentDidMount() {
    console.log("test");
    this.props.init();
    // call action creator
    this.props.arcGIS();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.arcGIS !== null) {
      this.setState({ arcGIS: nextProps.arcGIS });
    }
    
  }
  navigate = () => {
    this.props.navigation.navigate("ParkDetail");
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapboxGL.MapView
          animated={true}
          zoomLevel={12}
          pitchEnabled={false}
          showUserLocation={true}
          centerCoordinate={[-75.552104, 39.756706]}
          styleURL={MapboxGL.StyleURL.Street}
          style={{ flex: 1 }}
        />
        <MapboxGL.ShapeSource id="routeSource" shape={this.state.arcGIS}>
          <MapboxGL.LineLayer
            id="line"
            style={{
              lineColor: "blue",
              lineWidth: 3,
              lineOpacity: 0.84
            }}
            belowLayerID="originInnerCircle"
          />
        </MapboxGL.ShapeSource>
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
export default connect(mapStateToProps, { init, arcGIS })(Main);
