import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Mapbox from '@mapbox/react-native-mapbox-gl'

Mapbox.setAccessToken(
  'pk.eyJ1IjoiYXdvb2RhbGwiLCJhIjoiY2pnZnJyYjB6MDRqdTMzbzVzbXUzNnowdCJ9.Iv9Ya7fRrQShET_iMEwWMw'
)

import { init } from '../actions/apiRequests'

class Main extends Component {
  componentDidMount() {
    console.log('test')
    this.props.init()
  }
  navigate = () => {
    this.props.navigation.navigate('ParkDetail')
  }
  render() {
    return (
      <View>
        <Text>Main View</Text>
        <TouchableOpacity onPress={this.navigate}>
          <Text>{this.props.test}</Text>
        </TouchableOpacity>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={15}
          centerCoordinate={[11.256, 43.77]}
          style={{ width: '100%', height: 300 }}
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