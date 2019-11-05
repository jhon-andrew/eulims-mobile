import { createConnectedStore } from 'undux'
import { AsyncStorage } from 'react-native'

// AsyncStorage.clear() // FOR DEBUGGING PURPOSES ONLY

// Initial State
const initialState = {
  prefProtocol: 'http',
  prefServer: undefined,
  token: undefined,
  user: undefined,
  servers: undefined,
  cart: [],
  role: undefined,
  recentScans: []
}

// Store Effects
const effects = async (store) => {
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

export default createConnectedStore(initialState, effects)
