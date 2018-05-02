import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import Mapbox from '@mapbox/react-native-mapbox-gl'

Mapbox.setAccessToken(
  'pk.eyJ1IjoiYXdvb2RhbGwiLCJhIjoiY2pnZnJyYjB6MDRqdTMzbzVzbXUzNnowdCJ9.Iv9Ya7fRrQShET_iMEwWMw'
)

import { init } from '../actions/apiRequests'

class Main extends Component {
  state = { centered: false }
  componentDidMount() {
    console.log('test')
    this.props.init()
  }
  navigate = () => {
    this.props.navigation.navigate('ParkDetail')
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Mapbox.MapView
          animated={true}
          userTrackingMode={Mapbox.UserTrackingModes.Follow}
          showUserLocation={true}
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={20}
          style={{ flex: 1 }}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    test: state.test
  }
}

export default connect(mapStateToProps, { init })(Main)
