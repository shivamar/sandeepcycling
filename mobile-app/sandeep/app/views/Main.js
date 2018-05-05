import React, { Component } from 'react'
import centroid from '@turf/centroid'
import { helpers } from '@turf/helpers'
import combine from '@turf/combine'
import * as turf from '@turf/turf'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import { ArcGIS } from '../ArcGIS'
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYXdvb2RhbGwiLCJhIjoiY2pnZnJyYjB6MDRqdTMzbzVzbXUzNnowdCJ9.Iv9Ya7fRrQShET_iMEwWMw'
)

// Import action creators
import {
  init,
  getFeaturesInBounds,
  getFeaturesWhere,
  updateMapBounds
} from '../actions/apiRequests'

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
  },
  fillStyle: {
    fillColor: 'green',
    fillOpacity: 0.4
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
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.arcGIS !== null) {
      this.setState({
        arcGIS: nextProps.arcGIS
      })
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
        <MapboxGL.LineLayer id="fill" style={layerStyles.lineStyle} />
      </MapboxGL.ShapeSource>
    )
  }

  onSearch = searchTerm => {
    //retrieve park shapes for parks with a name similar to what is being searched
    this.props.getFeaturesWhere(
      "lower(name) LIKE '%" + searchTerm.toLowerCase() + "%'",
      ArcGIS.layers['areas']
    )
  }

  onRegionChanged = async () => {
    const visBounds = await this._map.getVisibleBounds()
    //this.props.getFeaturesInBounds(visBounds);
    this.props.updateMapBounds(visBounds)
  }

  renderParks() {
    if (!this.state.arcGIS) {
      return null
    }
    // console.log(this.state.arcGIS.features)
    var parks = {};

    for (var i = 0; i < this.state.arcGIS.features.length; i++){
      if (!(this.state.arcGIS.features[i].properties['NAME'] in parks)) {
        parks[this.state.arcGIS.features[i].properties['NAME']] = [this.state.arcGIS.features[i]];
      }
      else {
        parks[this.state.arcGIS.features[i].properties['NAME']].push(this.state.arcGIS.features[i]);
      }
    }
    parksArray = [];
    for (park in parks) {
      if (parks[park].length > 1) {
        var collection = turf.featureCollection(parks[park]);
        var combined = turf.combine(collection).features[0]
        parksArray.push(combined);
      }
      else {
        parksArray.push(parks[park][0])
      }
    }

    console.log('parksArray', parksArray);
    return parksArray.map((feature, i) => {
      let data
      //console.log('parks', parks)
      if (feature.geometry.type === 'MultiPolygon') {
        var featureCentroid = turf.centroid(feature)
        data = featureCentroid.geometry.coordinates

      }
      else {
        var featureCentroid = turf.centroid(feature)
        data = featureCentroid.geometry.coordinates
      }
      const coords = this.coordinate(data)

      return (
        <MapboxGL.PointAnnotation
          id={`${feature.id}`}
          key={feature.id}
          title={feature.properties.NAME}
          coordinate={[coords.latitude, coords.longitude]}
          onSelected={() => {
            this.setState({ selectedAnnotation: feature }, () => {
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

    // return (
    //   <MapboxGL.ShapeSource id="routeSource" shape={this.state.arcGIS}>
    //     <MapboxGL.FillLayer id="fill" style={layerStyles.fillStyle} />
    //   </MapboxGL.ShapeSource>
    // )
  }

  coordinate = coordinates => {
    // let x = coordinates.map(c => c[0])
    // let y = coordinates.map(c => c[1])
    //
    // let minX = Math.min.apply(null, x)
    // let maxX = Math.max.apply(null, x)
    //
    // let minY = Math.min.apply(null, y)
    // let maxY = Math.max.apply(null, y)

    return {
      latitude: coordinates[0],
      longitude: coordinates[1]
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <StatusBar barStyle="dark-content" />
        <MapboxGL.MapView
          logoEnabled={false}
          onRegionWillChange={() => {
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
          rotateEnabled={false}
          showUserLocation={true}
          centerCoordinate={[-75.552104, 39.756706]}
          onRegionDidChange={this.onRegionChanged}
          styleURL={MapboxGL.StyleURL.Street}
          style={{
            flex: 1
          }}
        >
          {this.renderParks()}
        </MapboxGL.MapView>
        <FloatingSearchBar onSubmitted={this.onSearch} />
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
    arcGIS: state.arcGIS,
    mapViewBounds: state.mapViewBounds
  }
}

// connect new action creators to Component
export default connect(mapStateToProps, {
  init,
  getFeaturesInBounds,
  getFeaturesWhere,
  updateMapBounds
})(Main)
