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

import FancyHeader from '../components/FancyHeader'

const { width, height } = Dimensions.get('window')

class MainList extends Component {
  state = { filterOpen: false }
  toggleFilter = () => {
    console.log('test')
    this.setState({
      filterOpen: !this.state.filterOpen
    })
  }
  render() {
    return (
      <Animated.View
        style={[
          styles.modal,
          this.state.filterOpen ? { bottom: -height + 380 } : null
        ]}
      >
        <FancyHeader toggleFilter={this.toggleFilter} />
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
    bottom: -height + 48,
    width: width,
    height: height,
    zIndex: 10
  }
})

export default MainList
