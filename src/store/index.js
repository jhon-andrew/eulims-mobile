import { createConnectedStore } from 'undux'
import effects from './effects'

const initialState = {
  prefServer: null,
  token: null,
  user: null
}

export default createConnectedStore(initialState, effects)
