import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Mapbox from "@mapbox/react-native-mapbox-gl";
import ArcGIS from "../ArcGIS";
Mapbox.setAccessToken(
  "pk.eyJ1IjoiYXdvb2RhbGwiLCJhIjoiY2pnZnJyYjB6MDRqdTMzbzVzbXUzNnowdCJ9.Iv9Ya7fRrQShET_iMEwWMw"
);

import { init } from "../actions/apiRequests";

class Main extends Component {
  componentDidMount() {
    console.log("test");
    this.props.init();
  }
  navigate = () => {
    this.props.navigation.navigate("ParkDetail");
  };
  render() {
    ArcGIS.test();
    return (
      <View style={{ flex: 1 }}>
        <Text>Main View</Text>
        <TouchableOpacity onPress={this.navigate}>
          <Text>{this.props.test}</Text>
        </TouchableOpacity>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={12}
          centerCoordinate={[-75.552104,39.756706]}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    test: state.test
  };
};

export default connect(mapStateToProps, { init })(Main);
