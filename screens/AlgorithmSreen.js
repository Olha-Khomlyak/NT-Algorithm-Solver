import React from 'react';
import { View, Button, Platform, Modal, TouchableOpacity, Text } from 'react-native';

import { Algorithms } from './AlgorithmList';
import { Icon } from 'react-native-elements';
import Calculator from '../calculator/Calculator';
import { SafeAreaView } from 'react-navigation'


export class AlgorithmScreen extends React.Component {
  static navigationOptions = { header: null };

  state = {
    modalVisible: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal visible={this.state.modalVisible} >
          <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity onPress={()=> this.setState({ modalVisible:false })}>
            <View style={{ flexDirection: "row", justifyContent: 'flex-end', borderBottomWidth:0.5, alignItems:'center',marginVertical:15 }}>
            <Icon
                type='font-awesome'
                name='arrow-circle-left'
                color='#099a97'
                size={25}
                containerStyle={{ marginRight: 7 }}
              />
            <Text style={{fontSize:20, fontWeight:'normal', fontFamily:'verdana', marginRight:7}}>Back to Algorithms</Text>
            </View> 
            </TouchableOpacity>
          <Calculator />
          </SafeAreaView>
        </Modal>
      <View>
        <View style={styles.headerStyle}>
          <Text style={{ marginLeft: 7, fontSize:25, fontWeight:'normal', fontFamily:'verdana' }}>Algorithm Lists</Text>
          <Icon
            type='font-awesome'
            name='calculator'
            onPress={() => this.setState({ modalVisible: true })}
            color='#099a97'
            size={25}
            containerStyle={{ marginRight: 7 }}
          />
        </View>
        <Algorithms navigation={this.props.navigation} />
      </View>
        
      </View >
    );
  }
}


const styles = {
  container: {
    flex: 1,
    
    //marginTop: Platform.OS == 'ios' ? 50: 0,
  },
  headerStyle: {
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:15,
  }
}