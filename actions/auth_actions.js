import { AsyncStorage } from 'react-native';
import * as Expo from 'expo';
import { EXPO_KEY } from 'react-native-dotenv';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types'

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
      dispatch ({
      type: FACEBOOK_LOGIN_SUCCESS,
      payload: token
    });
  } else {
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  try {
    let { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(EXPO_KEY, {
        permissions: ['public_profile']
      });
    if (type === 'cancel') {
      return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }
    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
} catch {
  console.log('error in call')
}
};
