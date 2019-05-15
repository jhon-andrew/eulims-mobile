import { Toast } from 'native-base'
import axios from 'axios'

// API Toolkit
export default class API {
  constructor (store) {
    this.store = store
    this.protocol = 'http:'
  }

  get server () {
    return this.store.get('prefServer')
  }

  get token () {
    return this.store.get('token')
  }

  get axios () {
    let config = {
      baseURL: `${this.protocol}//${this.server}`,
      responseType: 'json'
    }

    if (this.store.get('token')) {
      config.headers = {
        Authorization: `Bearer ${this.store.get('token')}`
      }
    }

    return axios.create(config)
  }

  get (endpoint, params = {}) {
    console.log('', this.server, endpoint)
    return this.axios.get(endpoint, { params })
    .then(({ data }) => {
      if (!data) console.log('ERROR:', data)
      return data
    })
    .catch(err => undefined)
  }

  post (endpoint, data) {
    console.log('', this.server, endpoint)
    return this.axios.post(endpoint, data)
    .then(({ data }) => {
      if (!data) console.log('ERROR:', data)
      return data
    })
    .catch(err => undefined)
  }

  // Check Server
  checkServer (server) {
    return axios.get(server)
    .then(({ data }) => {
      if (!data) console.log('Check Server ERROR:', data)
    })
    .catch(err => undefined)
  }

  // Check User
  checkUser = () => this.get('/user')

  // Login
  login = (email, password) => this.post('/login', { email, password })

  // Get Sample Code
  getSampleCode = (query) => this.get('/samplecode', { q: query })

  // Get Analysis
  getAnalysis = (id) => this.get({ id })
}
