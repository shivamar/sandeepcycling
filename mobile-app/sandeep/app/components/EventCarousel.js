import React, { Component } from 'react'
import { View, FlatList, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

class EventCarousel extends Component {
  render() {
    return (
      <View style={{ width: '100%', padding: 16 }}>
        <Text style={styles.title}>Upcoming Events</Text>
      </View>
    )
  }
}

const styles = {
  title: {
    fontWeight: '800',
    fontSize: 22,
    lineHeight: 26
  }
}

export default EventCarousel
