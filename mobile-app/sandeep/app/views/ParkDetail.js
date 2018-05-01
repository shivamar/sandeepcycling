import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class ParkDetail extends Component {
  render() {
    return (
      <View>
        <Text>ParkDetail View</Text>
        <Text>{this.props.test}</Text>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    test: state.test
  }
}

export default connect(mapStateToProps)(ParkDetail)
