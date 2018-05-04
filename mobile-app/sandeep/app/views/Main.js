import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Animated
} from 'react-native'
import { connect } from 'react-redux'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import ArcGIS from '../ArcGIS'
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYXdvb2RhbGwiLCJhIjoiY2pnZnJyYjB6MDRqdTMzbzVzbXUzNnowdCJ9.Iv9Ya7fRrQShET_iMEwWMw'
)

// Import action creators
import { init, callArcGIS } from '../actions/apiRequests'

import FloatingSearchBar from '../components/FloatingSearchBar'
import MainList from './MainList'
import NavigateCard from '../components/MainNavigateCard'

const { width, height } = Dimensions.get('window')

const DATA = [
  {
    lat: -75.43373633,
    long: 39.31314013,
    title: 'Fake Title 1',
    id: 1
  },
  {
    lat: -75.69865016,
    long: 40.33122179,
    title: 'Fake Title 2',
    id: 2
  },
  {
    lat: -75.68203141,
    long: 39.51467963,
    title: 'Fake Title 3',
    id: 3
  },
  {
    lat: -75.520775799,
    long: 39.80070313081,
    title: 'Fake Title 4',
    id: 4
  }
]

const layerStyles = MapboxGL.StyleSheet.create({
  lineStyle: {
    lineColor: 'blue',
    lineWidth: 3,
    lineOpacity: 0.84
  }
})

class Main extends Component {
  state = { arcGIS: null, filtersOpen: false, selectedAnnotation: null }
  constructor(props) {
    super(props)
    this.selectedAnnotation = new Animated.Value(92)
  }
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

  renderAnnotations = () => {
    return DATA.map((d, i) => {
      return (
        <MapboxGL.PointAnnotation
          id={`${d.id}`}
          key={i}
          title={d.title}
          coordinate={[d.lat, d.long]}
          onSelected={an => {
            this.setState({ selectedAnnotation: d.id }, () => {

                Animated.spring(this.selectedAnnotation, {
                  toValue: 0.01,
                  bounciness: 0.75,
                  speed: 16,
                  useNativeDriver: true
                }).start()

            })
          }}
        />
      )
    })
  }

  onRegionChanged = async () => {
    const visBounds = await this._map.getVisibleBounds()
    Keyboard.dismiss();
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
          logoEnabled={false}
          onPress={() => {
            Keyboard.dismiss()
          }}
          onRegionWillChange={() => {
            Keyboard.dismiss()
            if (this.state.selectedAnnotation) {
              this.setState({ selectedAnnotation: null }, () => {
                Animated.spring(this.selectedAnnotation, {
                  toValue: 92,
                  bounciness: 0.75,
                  speed: 16,
                  useNativeDriver: true
                }).start()
              })
            }
          }}
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
          {this.renderAnnotations()}
        </MapboxGL.MapView>
        <FloatingSearchBar />
        <MainList filtersOpen={this.state.filtersOpen} />
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            elevation: 2,
            transform: [{ translateY: this.selectedAnnotation }]
          }}
        >
          <NavigateCard
            navigation={this.props.navigation}
            selectedAnnotation={this.state.selectedAnnotation}
          />
        </Animated.View>
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
