import React from 'react'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import * as firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyBAd0lUKDWa6o9fqntzbs9-wjy8jZWZB5I',
  authDomain: 'explore-delaware.firebaseapp.com',
  databaseURL: 'https://explore-delaware.firebaseio.com',
  projectId: 'explore-delaware',
  storageBucket: 'explore-delaware.appspot.com',
  messagingSenderId: '213971547504'
}
firebase.initializeApp(config)

import Root from './app/Root.js'

export default class App extends React.Component {
  render() {
    return <Root />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
