import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
 } from 'react-navigation';
import { Icon } from 'react-native-elements'
import { Provider } from 'react-redux';
import { Notifications } from 'expo';

import { AuthScreen, WelcomeScreen, MapScreen, DeckScreen, ReviewScreen, SettingScreen } from './screens';
import reducers from './reducers';
import store from './store';
import registerForNotifications from './services/push_notification';

export default class App extends React.Component {
  componentDidMount() {
      registerForNotifications();

      Notifications.addListener((notification) => {
        const { data: { text }, origin } = notification

        if (origin === "received" && text) {
          Alert.alert(
            'New Push Notification',
            text,
            [{ text: 'OK'}]
          );
        }
      });
  }

  render() {
    const MainNavigator = createAppContainer(createBottomTabNavigator({
        welcome: {
          screen: WelcomeScreen,
          navigationOptions: {
            tabBarVisible: false
          }
        },
        auth: {
          screen: AuthScreen,
          navigationOptions: {
            tabBarVisible: false
          }
        },
        main: {
          screen: createBottomTabNavigator({
            map: MapScreen,
            deck: DeckScreen,
            review: {
              screen: createStackNavigator({
                review: ReviewScreen,
                setting: SettingScreen
              }),
              navigationOptions: {
                title: "Liked Jobs",
                tabBarIcon: ({ tintColor }) => {
                  return <Icon name="favorite" size={30} color={tintColor} />
                }
              }
            }
          }, {
            tabBarOptions: {
              labelStyle: { fontSize: 15 }
            }
          }),
          navigationOptions: {
            tabBarVisible: false
          }
        }
    }));

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
