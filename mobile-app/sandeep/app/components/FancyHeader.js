import React, { Component } from "react";
import { Animated, View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import Tab from "./Tab";
import Pill from "./Pill";
import { getFilterCategories } from "../actions/apiRequests";

const { width, height } = Dimensions.get("window");

class FancyHeader extends Component {
  state = {
    searchTerm: "",
    filters: {
      "RESTROOM":0,
      "CAMPGROUND":0,
      "TRAILHEAD":0,
      "BASKETBALL_COURT":0,
      "PLAYGROUND":0,
      "DOG_PARK":0,
      "CANOE_LAUNCH":0,
      "FISHING_PIER":0,
      "PARKING",
      "ROCK_CLIMBING_WALL":0
    }
  };
  constructor(props) {
    super(props);
    this.opacity = new Animated.Value(1);
    this.filterOpacity = new Animated.Value(0);
  }

  componentDidMount() {
    this.props.getFilterCategories();
  }
  clearSearchTerm = () => {
    this.setState({
      searchTerm: ""
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.categories) {
      //this.setState({ filters: nextProps.categories });
    }
    if (!nextProps.expanded) {
      Animated.parallel([
        Animated.spring(this.opacity, {
          toValue: 0,
          bounciness: 0.75,
          speed: 16,
          useNativeDriver: true
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(this.opacity, {
          toValue: 1,
          bounciness: 0.75,
          speed: 16,
          useNativeDriver: true
        })
      ]).start();
    }
  }
  updateFilters = key => {
    let newFilters = this.state.filters;

    if (newFilters[key] === 0) {
      newFilters[key] = 1;
    } else {
      newFilters[key] = 0;
    }
    this.setState({
      filters: newFilters
    });
  };
  render() {
    return (
      <Animated.View style={[styles.header]}>
        <View style={styles.controls}>
          <Animated.View style={{ opacity: this.opacity }}>
            {/* <TouchableOpacity>
              <Text style={styles.button}>LIST VIEW</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity>
              <Text>BACK ICON</Text>
            </TouchableOpacity> */}
          </Animated.View>
          <View>
            <TouchableOpacity onPress={this.props.toggleFilter}>
              <Text style={styles.button}>{!this.props.expanded ? "DONE" : "FILTERS"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.sublabel}>FEATURES / AMMENITIES</Text>
        <ScrollView horizontal style={{ flex: 1 }}>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.slide}>
              {Object.keys(this.state.filters).map((filter, i) => {
                return (
                  <Tab
                    active={this.state.filters[filter]}
                    key={filter}
                    onPress={id => {
                      this.updateFilters(id);
                    }}
                    id={filter}
                    label={filter.replace(new RegExp("_", "g"), " ").toUpperCase()}
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    );
  }
}
const mapStateToProps = state => {
  // return properties from global state
  return {
    categories: state.categories
  };
};

// connect new action creators to Component
export default connect(mapStateToProps, {
  getFilterCategories
})(FancyHeader);

const styles = StyleSheet.create({
  sublabel: {
    fontSize: 13,
    color: "#ffffff",
    fontWeight: "800",
    paddingHorizontal: 16
  },
  slide: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 16,
    width: width * 2,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16
  },
  header: {
    backgroundColor: "#4A4A4A",
    height: 280
  },
  button: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "800",
    padding: 16
  },
  controls: {
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
