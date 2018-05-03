import React, { Component } from 'react'
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

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
        <Animated.View style={{ opacity: this.opacity }}>
          <Text>test</Text>
        </Animated.View>
      </Animated.View>
    )
  }
}

export default connect()(FancyHeader)

const styles = StyleSheet.create({
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
