/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, SafeAreaView, Button } from 'react-native'

import { CameraManager, ReviewManager } from './src'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
})

enum ViewMode {
  CameraRoll = 'CameraRoll',
  Review = 'Review',
}

type Props = {}

interface State {
  mode: ViewMode
}

export default class App extends Component<Props, State> {
  state: State = {
    mode: ViewMode.Review
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcome}>Select Mode</Text>
        <View style={styles.action}>
          <Button title={ViewMode.CameraRoll} onPress={() => this.setState({ mode: ViewMode.CameraRoll })} disabled={this.state.mode === ViewMode.CameraRoll} />
          <Button title={ViewMode.Review} onPress={() => this.setState({ mode: ViewMode.Review })} disabled={this.state.mode === ViewMode.Review} />
        </View>
        <CameraManager disabled={this.state.mode === ViewMode.Review}/>
        <ReviewManager disabled={this.state.mode === ViewMode.CameraRoll}/>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    flex: 1,
    flexDirection: 'row',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
