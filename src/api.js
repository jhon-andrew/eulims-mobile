import { Toast } from 'native-base'
import axios from 'axios'

let toJSONLocal = date => {
  let local = new Date(date)
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return local.toJSON().slice(0, 10)
}

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
    let controllers = {
      'Analyst': 'restapi',
      'Customer': 'restcustomer',
      'Top Management': 'restapi'
    }
    let config = {
      baseURL: `${this.protocol}//${this.server}/api/${controllers[this.role]}`,
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
    console.log('[GET]:', endpoint)
    console.log('[PAYLOAD]:', params)
    return this.axios.get(endpoint, { params })
    .then(({ data }) => {
      if (!data) console.log('[ERROR]:', data)
      else console.log('[RESP]:', data)
      return data
    })
    .catch(err => undefined)
  }

  post (endpoint, data) {
    console.log('[POST]:', endpoint)
    console.log('[PAYLOAD]:', data)
    return this.axios.post(endpoint, data)
    .then(({ data }) => {
      if (!data) console.log('[ERROR]:', data)
      else console.log('[RESP]:', data)
      return data
    })
    .catch(err => undefined)
  }

  // Check Server
  checkServer (server) {
    return this.axios.get('/server')
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

  // Start Analysis
  startAnalysis = (id, date) => this.get('/startanalysis', { id, date: toJSONLocal(date) })

  // Complete Analysis
  completedAnalysis = (id, date) => this.get('/completedanalysis', { id, date: toJSONLocal(date) })

  // Get Products
  getProducts = () => this.get('/getproducts')

  // Get Specific Product
  getProduct = productcode => this.get('/getproduct', { productcode })

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
  withdraw = (entries) => this.post('/withdraw', entries.map(entry => ({
    id: entry.inventory_transactions_id,
    quantity: entry.quantity
  })))

  // Save Schedule
  saveSchedule ({ servicetype_id /* 1: calibration, 2: maintenance, 3: usage */, startdate /* format: YYYY-MM-DD */, enddate /* format: YYYY-MM-DD */, product_id }) {
    startdate = toJSONLocal(startdate)
    enddate = toJSONLocal(enddate)

    return this.post('/setschedule', { servicetype_id, startdate, enddate, product_id })
  }

   // Get RSTLs
  getRstl = () => this.get('/getrstl')

  //post booking
  setBooking = ({lab ,date, qty, desc, userid}) => this.post('/setbooking',{lab ,date, qty, desc, userid})

  // Product Image Upload
  uploadProductImage = (product, { type, uri }, progress) => {
    if (type === 'image') {
      const filetype = uri.split('.').pop()
      const formData = new FormData()

      formData.append('product_id', product.product_id)
      formData.append('image', {
        uri,
        name: `${product.product_code}.${filetype}`,
        type: `image/${filetype}`
      })

      return this.axios.post('/updatethumbnail', formData, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'content-type': 'multipart/form-data'
        },
        onUploadProgress: progress
      })
    }

    return false
  }
}
