import React, { Component } from 'react'
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Animated,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'

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
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp'
    })
    const imageScale = this.state.scrollY.interpolate({
      inputRange: [-HEADER_MAX_HEIGHT, 0, HEADER_MAX_HEIGHT],
      outputRange: [3, 1, 1]
    })
    return (
      <View style={{ flex: 1 }}>
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
        <View style={styles.header}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="arrow-back" size={32} color="#ffffff" />
          </TouchableOpacity>
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
          <View style={{ height: 1000 }} />
        </Animated.ScrollView>
      </View>
    )
  }
}

const styles = {
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
    fontWeight: '800'
  },
  header: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 24
  }
}

const mapStateToProps = state => {
  return {
    test: state.test
  }
}

export default connect(mapStateToProps)(ParkDetail)
