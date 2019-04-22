import { AsyncStorage } from 'react-native'
import { Toast } from 'native-base'
import axios from 'axios'


export default class API {
  constructor (server) {
    this.protocol = 'http:'
    this.server = server
    this.axios = null
    this.getPrefServer()
  }

  async getPrefServer () {
    this.server = this.server || await AsyncStorage.getItem('prefServer')
    this.axios = axios.create({
      baseURL: `${this.protocol}//${this.server}`,
      responseType: 'json'
    })

    return this.server
  }

  get (endpoint, params = {}) {
    console.log('GET', this.server, endpoint, params)
    return this.axios.get(endpoint, { params })
      .then(resp => resp.data)
      .catch(err => undefined)
  }

  post (endpoint, data) {
    console.log('POST', this.server, endpoint, data)
    return this.axios.post(endpoint, data)
      .then(resp => resp.data)
      .catch(err => undefined)
  }
}

// Check Server Status
export function CheckServer (server) {
  return new API(server).get('/server-status')
}

// Single API instance for every request.
let api = new API()

// Check User
export function CheckUser () {
  return api.get('/user')
}

// Login Function
export function Login (email, password) {
  return api.post('/login', { email, password })
    .then(resp => {
      if (!resp) Toast.show({ text: 'Connection error.' })
      return resp
    })
} 
