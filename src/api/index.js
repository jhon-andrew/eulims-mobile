import { AsyncStorage } from 'react-native'
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
    console.log('GET', endpoint, params)
    return this.axios.get(endpoint, { params })
      .then(resp => resp.data)
      .catch(err => undefined)
  }

  post (endpoint, data) {
    console.log('POST', endpoint, data)
    return this.axios.post(endpoint, data)
      .then(resp => resp.data)
      .catch(err => undefined)
  }
}

// Check Server Status
export function CheckServer (server) {
  let api = new API(server)
  return api.get('/server-status')
}
// Check User
// Login Function
