import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default props => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.key)}
      style={[styles.container, props.active ? styles.filled : null]}
    >
      <Text style={[styles.text, props.active ? styles.textfill : null]}>
        {props.label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = {
  container: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ffffff',
    padding: 8,
    width: 'auto',
    marginRight: 8,
    marginBottom: 8
  },
  text: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800'
  },
  textfill: {
    color: '#4A4A4A'
  },
  filled: {
    backgroundColor: '#ffffff'
  }
}
