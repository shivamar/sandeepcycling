import React, { Component } from 'react'
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import Tab from './Tab'

const { width, height } = Dimensions.get('window')

class FancyHeader extends Component {
  state = { searchTerm: '' }
  constructor(props) {
    super(props)
    this.opacity = new Animated.Value(1)
    this.filterOpacity = new Animated.Value(0)
  }

  clearSearchTerm = () => {
    this.setState({
      searchTerm: ''
    })
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.expanded) {
      Animated.parallel([
        Animated.spring(this.opacity, {
          toValue: 0,
          bounciness: 0.75,
          speed: 16
        })
      ]).start()
    } else {
      Animated.parallel([
        Animated.spring(this.opacity, {
          toValue: 1,
          bounciness: 0.75,
          speed: 16
        })
      ]).start()
    }
  }
  render() {
    return (
      <Animated.View style={[styles.header]}>
        <View style={styles.controls}>
          <Animated.View style={{ opacity: this.opacity }}>
            <TouchableOpacity>
              <Text style={styles.button}>LIST VIEW</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <Text>BACK ICON</Text>
            </TouchableOpacity> */}
          </Animated.View>
          <View>
            <TouchableOpacity onPress={this.props.toggleFilter}>
              <Text style={styles.button}>
                {!this.props.expanded ? 'DONE' : 'FILTERS'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          horizontal
          snapToInterval={width}
          snapToAlignment="center"
          decelerationRate="fast"
          style={{ flex: 1 }}
        >
          <View style={styles.slide}>
            <Text style={styles.sublabel}>FEATURES / AMMENTITIES</Text>
            <View style={styles.tabs}>
              <Tab
                onPress={key => {
                  console.log(key)
                }}
                id="id"
                label="Label Name"
              />
              <Tab
                onPress={id => {
                  console.log(id)
                }}
                id="id"
                label="Label Name"
                active={true}
              />
              <Tab
                onPress={id => {
                  console.log(id)
                }}
                id="id"
                label="Label Name"
              />
              <Tab
                onPress={id => {
                  console.log(id)
                }}
                id="id"
                label="Label Name"
                active={true}
              />
            </View>
          </View>
          <View style={styles.slide}>
            <Text style={styles.sublabel}>TRAIL DIFFICULTY</Text>
            <View style={styles.tabs}>
              <Tab
                onPress={id => {
                  console.log(id)
                }}
                id="id"
                label="Label Name"
              />
              <Tab
                onPress={id => {
                  console.log(id)
                }}
                id="id"
                label="Label Name"
                active={true}
              />
              <Tab
                onPress={id => {
                  console.log(id)
                }}
                id="id"
                label="Label Name"
              />
              <Tab
                onPress={id => {
                  console.log(id)
                }}
                id="key"
                label="Label Name"
              />
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    )
  }
}

export default connect()(FancyHeader)

const styles = StyleSheet.create({
  sublabel: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '700'
  },
  tabs: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 16
  },
  slide: {
    width,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16
  },
  header: {
    backgroundColor: '#4A4A4A',
    height: 280
  },
  button: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '800',
    padding: 16
  },
  controls: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
