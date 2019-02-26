import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
 } from 'react-navigation';
import { Icon } from 'react-native-elements'
import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import ReduxThunk from 'redux-thunk';

import { AuthScreen, WelcomeScreen, MapScreen, DeckScreen, ReviewScreen, SettingScreen } from './screens';
import reducers from './reducers';
import store from './store'
// import WelcomeScreen from './screens/WelcomeScreen'

export default class App extends React.Component {
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

    // const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
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
