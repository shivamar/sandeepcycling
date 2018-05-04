import React, { Component } from 'react'
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import FancyHeader from '../components/FancyHeader'

const { width, height } = Dimensions.get('window')
const offset = Platform.OS === 'ios' ? -48 : -48 - getStatusBarHeight()
class MainList extends Component {
  state = { filterOpen: false }
  constructor(props) {
    super(props)
    this.filterPos = new Animated.Value(offset)
  }
  toggleFilter = () => {
    this.setState(
      {
        filterOpen: !this.state.filterOpen
      },
      () => {
        console.log('test')
        Animated.spring(this.filterPos, {
          toValue: !this.state.filterOpen ? offset : -280,
          bounciness: 0.75,
          speed: 16,
          useNativeDriver: true
        }).start()
      }
    )
  }
  render() {
    return (
      <Animated.View
        style={[styles.modal, { transform: [{ translateY: this.filterPos }] }]}
      >
        <FancyHeader
          expanded={!this.state.filterOpen}
          toggleFilter={this.toggleFilter}
        />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    left: 0,
    right: 0,
    top: height,
    width: width,
    height: height,
    zIndex: 10
  }
})

export default MainList
