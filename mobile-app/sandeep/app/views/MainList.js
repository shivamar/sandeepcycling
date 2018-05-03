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
  constructor(props) {
    super(props)
    this.filterPos = new Animated.Value(-height + 48)
  }
  toggleFilter = () => {
    this.setState(
      {
        filterOpen: !this.state.filterOpen
      },
      () => {
        console.log('test')
        Animated.spring(this.filterPos, {
          toValue: !this.state.filterOpen ? -height + 48 : -height + 280,
          bounciness: 0.75,
          speed: 16
        }).start()
      }
    )
  }
  render() {
    return (
      <Animated.View style={[styles.modal, { bottom: this.filterPos }]}>
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
    bottom: -height + 48,
    width: width,
    height: height,
    zIndex: 10
  }
})

export default MainList
