/*
 * Search bar for the map, currently queries for parks by partial name match but would
 * ideally be hooked up to a geocoder and SOLR for live search and better matches.
 */
import React, { Component } from "react";
import { Animated, View, Text, StyleSheet, Platform, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import {isFunction } from "../Utils"

class FloatingSearchBar extends Component {
  state = { searchTerm: "" };
  constructor(props) {
    super(props);
    this._onSubmitted = this._onSubmitted.bind(this);
  }
  clearSearchTerm = () => {
    this.setState({
      searchTerm: ""
    });
  };

  //event for parent components to control via onSubmitted callback property
  _onSubmitted() {
    if (isFunction(this.props.onSubmitted)) {
      this.props.onSubmitted(this.state.searchTerm);
    }
  }
  
  render() {
    return (
      <Animated.View style={styles.bar}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View style={{ padding: 12 }}>
            <Icon name="search" size={24} color="#9B9B9B" />
          </View>
          <TextInput
            returnKeyType="search"
            underlineColorAndroid={"rgba(0,0,0,0)"}
            onEditingEnd= {(e)=>{console.log("TEST3")}}
            onSubmitEditing={event => {
              this._onSubmitted();
            }}
            style={{
              height: 48,
              flex: 1,
              color: "#4A4A4A",
              fontWeight: "700"
            }}
            onChangeText={searchTerm => this.setState({ searchTerm })}
            value={this.state.searchTerm}
            placeholder={"Search for a Location"}
          />
        </View>
        <TouchableOpacity onPress={this.clearSearchTerm} style={styles.button}>
          <Icon name="close" size={18} color="#4A4A4A" />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default connect()(FloatingSearchBar);

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: Platform.OS === "ios" ? 32 : 24,
    left: 16,
    right: 16,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 0.25
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48
  }
});
