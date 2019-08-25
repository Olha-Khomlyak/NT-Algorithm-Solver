import React from 'react';
import { Text, View, Button, Platform } from 'react-native';


export class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>i am calculator</Text>
      </View>

    );
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 50 : 0,
  }
}