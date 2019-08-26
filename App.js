import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import AppNavigator from "./navigator/AppNavigator";
import Calculator from './calculator/Calculator'
import { SafeAreaView } from 'react-navigation'

class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex:1}}>
        <Calculator />
        {/* <AppNavigator /> */}
      </SafeAreaView>
    )
  }

}


export default App;