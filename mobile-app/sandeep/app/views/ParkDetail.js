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
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

class ParkDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
      ),
      refreshing: false
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          style={styles.imageHeader}
          source={{
            uri:
              'https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/-122.337798,37.810550,9.67,0.00,0.00/1000x600@2x?access_token=pk.eyJ1IjoiYXdvb2RhbGwiLCJhIjoiY2pnZnJyYjB6MDRqdTMzbzVzbXUzNnowdCJ9.Iv9Ya7fRrQShET_iMEwWMw'
          }}
        >
          <ImageBackground
            style={{
              width: '100%',
              height: 400,
              justifyContent: 'space-between'
            }}
            source={require('../images/gradient.png')}
          >
            <View style={styles.header}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" size={32} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ImageBackground>
        <Animated.ScrollView
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>First State Heritage Park</Text>
          </View>
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
    height: 400,
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
  header: {
    height: 72,
    justifyContent: 'center',
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
