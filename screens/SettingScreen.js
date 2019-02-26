import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';

import * as actions from '../actions';

class SettingScreen extends Component {
  onButtonPress = () => {
    this.props.resetJobs();
    this.props.navigation.navigate('map');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>
          Would you like to clear all liked jobs?
        </Text>
        <Button
          title='Clear Jobs'
          large
          backgroundColor="#FF0000"
          icon={{ name: 'delete-forever', color: 'white' }}
          onPress={this.onButtonPress}
        />
      </View>
    );
  }
}

const connectedSettingScreen = connect(null, actions)(SettingScreen);

export { connectedSettingScreen as SettingScreen };
