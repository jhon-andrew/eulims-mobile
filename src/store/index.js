import { createConnectedStore } from 'undux'
import effects from './effects'

const initialState = {
  prefProtocol: 'http',
  prefServer: undefined,
  token: undefined,
  user: undefined,
  servers: undefined,
  cart: []
}

const Store = createConnectedStore(initialState, effects)

export default Store
