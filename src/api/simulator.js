const express = require('express')
const bodyParser = require('body-parser')
const os = require('os')
const { random, commerce, image } = require('faker')

const app = express()
const ip = os.networkInterfaces()['Wi-Fi'][1].address
const port = 3000

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Utilities
let rand = (from, to) => Math.floor(Math.random()*(to-from+1)+from)
let latency = (from = 1, to = 3000) => { // DEFAULT: 1ms to 3000ms
  let delay = rand(from, to)
  return new Promise((resolve, reject) => setTimeout(() => resolve(delay), delay))
}

// Dummy Data
let token = 'W29iamVjdCBPYmplY3Rd'
let user = {
  email: 'anecbook@gmail.com',
  password: '123456',
  firstName: 'Jhon Andrew',
  middleInitial: 'Q',
  lastName: 'Baes',
  userType: 'Laboratory Manager'
}

// Simulate network latency
app.use(async (req, res, next) => {
  let delay = await latency()
  if (req.path !== '/favicon.ico') console.log(req.path, `${delay}ms`)
  next()
})

// Redirect to Recent Builds
app.get('/builds', (req, res) => {
  res.redirect('https://expo.io/@jhon-andrew/eulims-mobile/builds')
})

// Server Status
app.get('/server-status', (req, res) => {
  res.json({
    status: 'online'
  })
})

// Login
app.post('/login', (req, res) => {
  let data = req.body

  if (data.email !== user.email || data.password !== user.password) {
    res.json({
      error: true,
      message: 'Either username or password is incorrect.'
    })
  } else res.json({ token, user })
})

// Route Guard - Everything after this are protected with authentication.
app.use((req, res, next) => {
  let bearer = req.get('authorization') ? req.get('authorization').split(' ')[1] : 'no auth token'
  if (bearer !== token) {
    res.json({
      error: true,
      message: 'Please login to continue.'
    })
  } else next()
})

// Get user data
app.get('/user', (req, res) => {
  res.json({ token, user })
})

// Get sample code
app.get('/samplecode', (req, res) => {
  let sampleCodes = [{"id":"5199","text":"CHE-0865"},{"id":"5210","text":"CHE-0867"},{"id":"5211","text":"CHE-0866"},{"id":"5212","text":"CHE-0868"},{"id":"5213","text":"CHE-0869"},{"id":"5214","text":"CHE-0870"},{"id":"5215","text":"CHE-0871"},{"id":"5216","text":"CHE-0872"},{"id":"5217","text":"CHE-0873"},{"id":"5218","text":"CHE-0874"},{"id":"5226","text":"CHE-0875"},{"id":"5228","text":"CHE-0876"},{"id":"5230","text":"CHE-0877"},{"id":"5231","text":"CHE-0878"},{"id":"5232","text":"CHE-0879"},{"id":"5233","text":"CHE-0880"},{"id":"5234","text":"CHE-0881"},{"id":"5235","text":"CHE-0882"},{"id":"5254","text":"CHE-0883"},{"id":"5255","text":"CHE-0884"}]
  res.json(sampleCodes.filter(result => result.text.startsWith(req.query.q)))
})

// Get analysis data
app.get('/analysis', (req, res) => {
  let sampleId = '25023 2019 CHE-0815'
  if (req.query.id === sampleId) {
    res.json({
      sampleCode: req.query.id,
      samples: [
        {
          name: 'Oil',
          description: 'Scheme: QFCS, Round: FC221, Sample: 778-Fat Quality, Storage: 2-8 C, approx. 150 g sample, in an amber glass bottle.'
        }
      ],
      tests: [...Array(10)].map((test, id) => (
        {
          id,
          name: random.arrayElement(['Package A', 'Package B', 'Moisture Content', 'Ash', 'Volatile Matter', 'Fixed Carbon', 'Heating Value']),
          method: random.arrayElement([null, 'Air oven drying @ 107 C', 'Gravimetric Method/Furnace @ 750 C', 'Gravimetric Method/Furnace @ 950 C', 'By difference', 'Bomb calorimetry']),
          progress: 0,
          workflow: random.number(6),
          status: 'pending'
        }
      ))
    })
  } else {
    res.json({ error: true, message: 'Invalid Tag' })
  }
})

// Get products data
app.get('/products', (req, res) => {
  res.json([...Array(20)].map((product, id) => ({
    id,
    product: commerce.product(),
    productName: commerce.productName(),
    thumbnail: image.image(),
    type: random.arrayElement(['consumable', 'equipment'])
  })))
})

// Start Server
app.listen(port, () => console.log(`API Server: ${ip}:${port}`))
