import { createConnectedStore } from 'undux'
import effects from './effects'

const initialState = {
  user: null,
  prefServer: null
}

export default createConnectedStore(initialState, effects)
