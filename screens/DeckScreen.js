import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';

import Deck from '../components/Deck';
import * as actions from '../actions';

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Jobs',
    tabBarIcon: ({tintColor}) => {
      return <Icon
        name="description"
        size={30}
        color={tintColor}
      />
    }
  }

  renderCard(item) {
    return (
      <Card
        key={item.id}
        title={item.title}
      >
        <View style={{ height: 300 }}>
          <MapView
            style={{ flex: 1}}
            scrollEnabled={false}
            cacheEnabled={true}
            initialRegion={{
              longitude: item.longitude,
              latitude: item.latitude,
              longitudeDelta: 0.02,
              latitudeDelta: 0.045
            }}
          />
        </View>

        <View style={styles.detailWrapper}>
          <Text>
            {item.company}
          </Text>
          <Text>
            {item.type}
          </Text>
        </View>
        <Text style={{ height: 50}}>
          {item.description.replace("<p>", "").match(/.*?(?=<\/p>)/)}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
      return (
        <Card title="No More Jobs">
          <Button
            backgroundColor="#03A9F4"
            title="Search Again"
            icon={{
              name: 'my-location',
              color: "white"
             }}
            onPress={() => this.props.navigation.navigate('map')}
          />
        </Card>
      );
    }

  onSwipeRight = (job) => {
    this.props.likeJob(job);
  }

  render() {
    return (
      <View style={styles.deckContainerStyle}
      >
        <Deck
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={this.onSwipeRight}
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  deckContainerStyle: {
    flex: 1,
    marginTop: 10
  }
};

const mapStateToProps = ({ jobs }) => {
  return { jobs };
};

const connectedDeckScreen = connect(mapStateToProps, actions)(DeckScreen);

export {connectedDeckScreen as DeckScreen};
