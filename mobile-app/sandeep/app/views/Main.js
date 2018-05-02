import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import ArcGIS from '../ArcGIS'
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYXdvb2RhbGwiLCJhIjoiY2pnZnJyYjB6MDRqdTMzbzVzbXUzNnowdCJ9.Iv9Ya7fRrQShET_iMEwWMw'
)

// Import action creators
import { init, callArcGIS } from '../actions/apiRequests'

const layerStyles = MapboxGL.StyleSheet.create({
  lineStyle: {
    lineColor: 'blue',
    lineWidth: 3,
    lineOpacity: 0.84
  }
})

class Main extends Component {
  state = { arcGIS: null }

  componentDidMount() {
    this.props.init()
    // call action creator
    this.props.callArcGIS()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.arcGIS !== null) {
      this.setState({ arcGIS: nextProps.arcGIS })
    }
  }
  navigate = () => {
    this.props.navigation.navigate('ParkDetail')
  }

  renderLines() {
    if (!this.state.arcGIS) {
      return null
    }

    return (
      <MapboxGL.ShapeSource id="routeSource" shape={this.state.arcGIS}>
        <MapboxGL.LineLayer id="line" style={layerStyles.lineStyle} />
      </MapboxGL.ShapeSource>
    )
  }

  onRegionChanged = async () => {
    const visBounds = await this._map.getVisibleBounds()
    this.setState(
      {
        visBounds
      },
      () => {
        console.log(this.state.visBounds)
      }
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapboxGL.MapView
          ref={c => (this._map = c)}
          animated={true}
          zoomLevel={12}
          pitchEnabled={false}
          showUserLocation={true}
          centerCoordinate={[-75.552104, 39.756706]}
          onRegionDidChange={() => {
            this.onRegionChanged()
          }}
          styleURL={MapboxGL.StyleURL.Street}
          style={{ flex: 1 }}
        >
          {this.renderLines()}
        </MapboxGL.MapView>
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
export default connect(mapStateToProps, { init, callArcGIS })(Main)
