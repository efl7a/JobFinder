import { Permission, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const URL = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  let previousToken = await AsyncStorage.getItem('pushToken');

  if (previousToken) {
    return;
  } else {
    let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)

    if (status !== "granted") {
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();

    axios.post(URL, { token: { token } });
    AsyncStorage.setItem('pushtoken', token);
  }
}
