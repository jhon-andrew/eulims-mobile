import { createConnectedStore } from 'undux'
import effects from './effects'

const initialState = {
  prefServer: undefined,
  token: undefined,
  user: undefined,
  servers: undefined,
  cart: []
}

export default createConnectedStore(initialState, effects)
