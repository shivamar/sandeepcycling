import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

class NavigateCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ParkDetail')
          }}
        >
          <View>
            <Text style={styles.title}>Washington High State Park</Text>
            <Text style={styles.sub}>2.45 Miles Away</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="directions-bike" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  title: {
    color: '#000000',
    fontSize: 17,
    lineHeight: 22
  },
  sub: {
    color: '#8C8C8C',
    fontSize: 13,
    marginTop: 2
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0197F6',
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
    elevation: 4
  },
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    left: 0,
    right: 0,
    bottom: 0,
    height: 92,
    zIndex: 100,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 0.25
  }
}

export default NavigateCard
