import React, { Component } from 'react'
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Animated,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { showLocation } from 'react-native-map-link'

import EventCarousel from '../components/EventCarousel'

const HEADER_MAX_HEIGHT = 400
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 72 : 82
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

class ParkDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
      refreshing: false
    }
  }
  render() {
    const titleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE - 60],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })
    const smallTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE - 60, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp'
    })
    const buttonTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolateRight: 'clamp'
    })
    const imageScale = this.state.scrollY.interpolate({
      inputRange: [-HEADER_MAX_HEIGHT, 0, HEADER_MAX_HEIGHT],
      outputRange: [3, 1, 1]
    })
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <StatusBar barStyle="light-content" />
        <Animated.Image
          style={[
            styles.imageHeader,
            {
              transform: [{ translateY: imageTranslate }, { scale: imageScale }]
            }
          ]}
          source={{
            uri:
              'https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/-122.337798,37.810550,9.67,0.00,0.00/1000x600@2x?access_token=pk.eyJ1IjoiYXdvb2RhbGwiLCJhIjoiY2pnZnJyYjB6MDRqdTMzbzVzbXUzNnowdCJ9.Iv9Ya7fRrQShET_iMEwWMw'
          }}
        />
        <Animated.Image
          style={[
            styles.imageHeader,
            {
              transform: [{ translateY: imageTranslate }, { scale: imageScale }]
            }
          ]}
          source={require('../images/gradient.png')}
        />
        <Animated.View
          style={[
            styles.navigateButton,
            {
              transform: [{ translateY: buttonTranslate }]
            }
          ]}
        >
          <TouchableHighlight
            underlayColor={'#007FD0'}
            onPress={() => {
              showLocation({
                latitude: 38.8976763,
                longitude: -77.0387185
              })
            }}
            style={styles.button}
          >
            <Icon name="directions-bike" size={24} color="#ffffff" />
          </TouchableHighlight>
        </Animated.View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" size={32} color="#ffffff" />
          </TouchableOpacity>
          <Animated.View style={{ opacity: smallTitleOpacity }}>
            <Text style={styles.smallTitle}>First State Heritage Park</Text>
          </Animated.View>
        </View>
        <Animated.ScrollView
          scrollEventThrottle={6}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          <View style={styles.titleContainer}>
            <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
              First State Heritage Park
            </Animated.Text>
          </View>
          <View style={styles.wordCloud}>
            <Text style={styles.tag}>Playground</Text>
            <Text style={styles.tag}>Accessible</Text>
            <Text style={styles.tag}>Restrooms</Text>
            <Text style={styles.tag}>Camping</Text>
            <Text style={styles.tag}>Canoe Launch</Text>
            <Text style={styles.tag}>Playground</Text>
            <Text style={styles.tag}>Accessible</Text>
            <Text style={styles.tag}>Restrooms</Text>
            <Text style={styles.tag}>Camping</Text>
            <Text style={styles.tag}>Canoe Launch</Text>
          </View>
          <View>
            <EventCarousel />
          </View>
        </Animated.ScrollView>
      </View>
    )
  }
}

const styles = {
  wordCloud: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 16,
    paddingRight: 80
  },
  tag: {
    fontSize: 10,
    color: '#9B9B9B',
    paddingRight: 8,
    paddingBottom: 6
  },
  imageHeader: {
    width: '100%',
    height: 400,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  titleContainer: {
    height: 328,
    justifyContent: 'flex-end',
    padding: 16,
    paddingBottom: 32,
    paddingRight: '15%'
  },
  title: {
    fontSize: 34,
    lineHeight: 36,
    color: '#ffffff',
    fontWeight: '800'
  },
  smallTitle: {
    fontSize: 16,
    lineHeight: 18,
    color: '#ffffff',
    fontWeight: '800',
    paddingLeft: 24
  },
  header: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 24
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0197F6',
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: '#000000',
    zIndex: 1000,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
    elevation: 4
  },
  navigateButton: {
    position: 'absolute',
    right: 16,
    top: 370,
    zIndex: 1000
  }
}

const mapStateToProps = state => {
  return {
    test: state.test
  }
}

export default connect(mapStateToProps)(ParkDetail)
