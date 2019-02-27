import React, { Component } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Review Liked Jobs",
      headerRight: (
        <Button
          title="Settings"
          onPress={() => navigation.navigate('setting')}
          type="clear"
        />
      ),

    };
  };

  renderCards() {
    return this.props.likedJobs.map( job => {
      const { id, title, longitude, latitude, company, url } = job;
      return (
        <Card
          key={id}
          title={title}
        >
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1}}
              scrollEnabled={false}
              cacheEnabled={true}
              initialRegion={{
                longitude: longitude,
                latitude: latitude,
                longitudeDelta: 0.02,
                latitudeDelta: 0.045
              }}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>
                {company}
              </Text>
              <Button
                title='Apply'
                onPress={() => Linking.openURL(url).catch((err) => console.log('An Error Occurred, err'))}
              />
            </View>
          </View>

        </Card>


      );
    })
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {this.renderCards()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10
  },
  italics: {
    fontStyle: 'italic',
    fontSize: 20
  }
};

mapStateToProps = ({ likedJobs }) => {
  return { likedJobs: likedJobs };
}

const connectedReviewScreen = connect(mapStateToProps)(ReviewScreen)

export { connectedReviewScreen as ReviewScreen };
