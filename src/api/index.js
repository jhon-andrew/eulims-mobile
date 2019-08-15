import { Toast } from 'native-base'
import axios from 'axios'

// API Toolkit
export default class API {
  constructor (store) {
    this.store = store
    this.protocol = `${store.get('prefProtocol')}:`
    this.server = store.get('prefServer')
    this.token = store.get('token')
    this.role = store.get('role')
  }

  get axios () {
    let config = {
      baseURL: `${this.protocol}//${this.server}/api`,
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
    let controller = this.role === 'Analyst' ? 'restapi' : 'restcustomer'
    console.log('[GET]:', `${this.protocol}//${this.server}/api/${controller}${endpoint}`)
    return this.axios.get(controller + endpoint, { params })
    .then(({ data }) => {
      if (!data) console.log('[ERROR]:', data)
      else console.log('[RESP]:', data)
      return data
    })
    .catch(err => undefined)
  }

  post (endpoint, data) {
    let controller = this.role === 'Analyst' ? 'restapi' : 'restcustomer'
    console.log('[POST]:', `${this.protocol}//${this.server}/api/${controller}${endpoint}`)
    return this.axios.post(controller + endpoint, data)
    .then(({ data }) => {
      if (!data) console.log('[ERROR]:', data)
      else console.log('[RESP]:', data)
      return data
    })
    .catch(err => undefined)
  }

  // Check Server
  checkServer (server) {
    let controller = this.role === 'Analyst' ? 'restapi' : 'restcustomer'
    return axios.get(`${this.protocol}//${server}/api/${controller}/server`)
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
  getSampleCode = samplecode => this.get('/samplecode', { samplecode })

  // Get Analysis
  getAnalysis = (id) => this.get('/analysis', { id })

  // Get Products
  getProducts = () => this.get('/getproducts')

  // Get Customer ongoing Request
  getOnRequests = () => this.get('/getcustonreq')

  // Get Customer completed Request
  getComRequests = () => this.get('/getcustcomreq')

  // Get Customer wallet
  getWalletTransactions = () => this.get('/getcustomerwallet')

  // Get Customer wallet transactions
  getDetailedTransactions = (id) => this.get('/getwallettransaction', { id })

  // Get Customer bookings
  getBookings = () => this.get('/getbookings')

  // Get samples
  getSamples = (id) => this.get('/getsamples', { id })

  // Get Entries
  getEntries = (product_id) => this.get('/getentries', { product_id })

  // Withdraw Cart
  withdraw = (entries) => this.post('/withdraw', { entries: entries.map(entry => ({
    id: entry.id,
    price: entry.price,
    quantity: entry.quantity
  })) })

  // Save Schedule
  saveSchedule = ({ servicetype_id /* 1: calibration, 2: maintenance, 3: usage */, startdate /* format: YYYY-MM-DD */, enddate /* format: YYYY-MM-DD */, requested_by /* === user.id */ }) => this.post('/schedule', { servicetype_id, startdate, enddate, requested_by })

   // Get RSTLs
  getRstl = () => this.get('/getrstl')

  //post booking
  setBooking = ({lab ,date, qty, desc, userid}) => this.post('/setbooking',{lab ,date, qty, desc, userid})
}
