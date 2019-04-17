import { AsyncStorage } from 'react-native'

const effects = store => {
  // Store to AsyncStorage
  ['prefServer', 'token', 'user'].forEach(key => {
    store.on(key).subscribe(async (val) => {
      await AsyncStorage.setItem(key, ((typeof val) === 'object') ? JSON.stringify(val) : val)
    })
  })

  return store
}

export default effects
