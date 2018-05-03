import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default props => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.id)}
      style={styles.container}
    >
      <Text style={styles.text}>{props.label}</Text>
    </TouchableOpacity>
  )
}

const styles = {
  container: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    width: 'auto',
    marginRight: 8,
    marginBottom: 8
  },
  text: {
    color: '#4A4A4A',
    fontSize: 10,
    lineHeight: 20,
    fontWeight: '800'
  }
}
