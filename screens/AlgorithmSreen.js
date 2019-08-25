import React from 'react';
import { View, Button, Platform } from 'react-native';

import { Algorithms } from './AlgorithmList';
import { Icon, Text } from 'react-native-elements';


export class AlgorithmScreen extends React.Component {
  static navigationOptions = { header: null };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <Text h3 style={{ textAlign: 'center' }}>Algorithm Lists</Text>
          <Icon
            type='font-awesome'
            name='calculator'
            onPress={()=> console.log('open calculator')}
            color='red'
            containerStyle={{ borderWidth:1 }}
          />
        </View>
        <Algorithms navigation={this.props.navigation} />
      </View>
    );
  }
}


const styles = {
  container: {
    flex: 1,
    //marginTop: Platform.OS == 'ios' ? 50: 0,
  },
  headerStyle: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}