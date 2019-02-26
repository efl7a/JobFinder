import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

import * as actions from '../actions';

class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => {
      return (
        <Icon
          name="my-location"
          size={30}
          color={tintColor}
        />
      )
    }
  }

  state = {
    maploaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  }

  componentDidMount() {
    this.setState({ maploaded: true })
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region })
  }

  searchForJobs = () => {
    this.props.fetchJobs(this.state.region, () =>{
      this.props.navigation.navigate('deck');
    });
  }

  render() {
    if (!this.state.maploaded) {
      return (
        <View>
          <ActivityIndicator size="large" color='#03A9F4' />
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View>
          <Button
            large
            style={styles.buttonContainer}
            title='Search Here'
            icon={{ name: 'search', color: 'white' }}
            backgroundColor="#009688"
            onPress={this.searchForJobs}
          />
        </View>

      </View>

    );
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
}

const connectedMapScreen = connect(null, actions)(MapScreen);

export {connectedMapScreen as MapScreen};
