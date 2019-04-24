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

  alertConnErr () {
    Toast.show({
      text: 'Connection error.',
      buttonText: 'Okay',
      duration: 3000
    })
  }

  async get (endpoint, params = {}) {
    if (!this.server) await this.getPrefServer()
    console.log('GET', this.server, endpoint, params)
    return this.axios.get(endpoint, { params })
      .then(({ data }) => {
        if (!data) this.alertConnErr()
        return data
      })
      .catch(err => undefined)
  }

  async post (endpoint, data) {
    if (!this.server) await this.getPrefServer()
    console.log('POST', this.server, endpoint, data)
    return this.axios.post(endpoint, data)
      .then(({ data }) => {
        if (!data) this.alertConnErr()
        return data
      })
      .catch(err => undefined)
  }
}

// Check Server Status
export function CheckServer (server) {
  return new API(server).get('/server-status')
}

// Check User
export function CheckUser (token) {
  let api = new API()
  return api.get('/user', { token })
}

// Login Function
export function Login (email, password) {
  let api = new API()
  return api.post('/login', { email, password })
    .then(resp => {
      return resp
    })
}

// Get Analysis
export function GetAnalysis(id) {
  let api = new API()
  return api.get('/analysis', { id, token })
}
