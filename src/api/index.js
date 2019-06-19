import { Toast } from 'native-base'
import axios from 'axios'

// API Toolkit
export default class API {
  constructor (store) {
    this.store = store
    this.protocol = 'http:'
    this.server = store.get('prefServer')
    this.token = store.get('token')
  }

  get axios () {
    let config = {
      baseURL: `${this.protocol}//${this.server}/api/restapi`,
      responseType: 'json'
    }

    if (this.token) {
      config.headers = {
        Authorization: `Bearer ${this.token}`
      }
    }

    return axios.create(config)
  }

  get (endpoint, params = {}) {
    console.log('[GET]:', this.server, endpoint)
    return this.axios.get(endpoint, { params })
    .then(({ data }) => {
      if (!data) console.log('ERROR:', data)
      return data
    })
    .catch(err => undefined)
  }

  post (endpoint, data) {
    console.log('[POST]:', this.server, endpoint)
    return this.axios.post(endpoint, data)
    .then(({ data }) => {
      if (!data) console.log('ERROR:', data)
      return data
    })
    .catch(err => undefined)
  }

  // Check Server
  checkServer (server) {
    return axios.get(`${this.protocol}//${server}/api/restapi/server`)
    .then(({ data }) => {
      if (!data) console.log('Check Server ERROR:', data)
      return data
    })
    .catch(err => {
      console.log(err)
      return undefined
    })
  }

  // Check User
  checkUser = () => this.get('/user')

  // Login
  login = (email, password) => this.post('/login', { email, password })

  // Get Sample Code
  getSampleCode = (query) => this.get('/samplecode', { q: query })

  // Get Analysis
  getAnalysis = (id) => this.get('/analysis', { id })

  // Get Products
  getProducts = () => this.get('/products')

  // Get Customer ongoing Request
  getOnRequests = (id) => this.get('/getcustonreq', { id })

    // Get Customer completed Request
  getComRequests = (id) => this.get('/getcustcomreq', { id })

   // Get Customer wallet
  getWalletTransactions = (id) => this.get('/getcustomerwallet', { id })

  // Get Customer wallet transactions
  getDetailedTransactions = (id) => this.get('/getwallettransaction', { id })

    // Get Customer bookings
  getBookings = (id) => this.get('/getbookings', { id })

   // Get analyses
  getSamples = (id) => this.get('/getsamples', { id })
}
