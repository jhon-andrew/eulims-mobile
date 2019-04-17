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
      baseURL: `${this.protocol}//${this.server}`
    })
  }

  get (endpoint, params = {}) {
    return this.axios.get(endpoint, { params })
      .then(resp => resp)
      .catch(err => null)
  }

  post (endpoint, data) {
    return this.axios.post(endpoint, data)
      .then(resp => resp)
      .catch(err => null)
  }
}

// Check Server Status
// Check User
// Login Function
