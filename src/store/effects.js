import { AsyncStorage } from 'react-native'

// AsyncStorage.clear() // FOR DEBUGGING PURPOSES ONLY

export default async function (store) {
  // Restore persisted app states
  const persistedStates = await AsyncStorage.getAllKeys()

  if (persistedStates.length > 0) {
    const states = await AsyncStorage.multiGet(persistedStates)
    states.forEach(async (pair) => {
      store.set(pair[0])(JSON.parse(pair[1]))
    })
  }

  // Persist app state to AsyncStorage
  store.onAll().subscribe(async ({ key, previousValue, value }) => {
    console.log(`Persisting ${key} state.`)
    await AsyncStorage.setItem(key, JSON.stringify(value))
  })

  return store
}
