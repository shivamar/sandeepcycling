import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Mapbox from '@mapbox/react-native-mapbox-gl'
import ArcGIS from '../ArcGIS'
Mapbox.setAccessToken(
  'pk.eyJ1IjoiYXdvb2RhbGwiLCJhIjoiY2pnZnJyYjB6MDRqdTMzbzVzbXUzNnowdCJ9.Iv9Ya7fRrQShET_iMEwWMw'
)

// Import action creators
import { init, arcGIS } from '../actions/apiRequests'

class Main extends Component {
  state = { arcGIS: null }

  componentDidMount() {
    console.log('test')
    this.props.init()
    // call action creator
    this.props.arcGIS()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.arcGIS !== null) {
      this.setState({ arcGIS: nextProps.arcGIS })
    }
  }
  navigate = () => {
    this.props.navigation.navigate('ParkDetail')
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Mapbox.MapView
          animated={true}          
          zoomLevel={12}
          centerCoordinate={[-75.552104,39.756706]}
          styleURL={Mapbox.StyleURL.Street}
          style={{ flex: 1 }}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  // return properties from global state
  return {
    test: state.test,
    arcGIS: state.arcGIS
  }
}

// connect new action creators to Component
export default connect(mapStateToProps, { init, arcGIS })(Main)
