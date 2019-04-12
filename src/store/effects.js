import { AsyncStorage } from 'react-native'

const effects = store => {
  store
    .on('prefServer')
    .subscribe(async (prefServer) => {
      await AsyncStorage.setItem('prefServer', prefServer)
    })

  return store
}

export default effects
