import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const accessToken = await useAsyncStorage.getItem(
        `${this.namespace}:token`
    );

    return accessToken ? JSON.parse(accessToken) : "";
  }

  async setAccessToken(accessToken) {

    await AsyncStorage.setItem(
        `${this.namespace}:token`,
        JSON.stringify(accessToken),
    )
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}


export default AuthStorage;