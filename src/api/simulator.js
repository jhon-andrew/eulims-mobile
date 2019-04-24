const express = require('express')
const bodyParser = require('body-parser')
const os = require('os')

const app = express()
const ip = os.networkInterfaces()['Wi-Fi'][0].address
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
  if (req.query.token !== token) {
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

// Get analysis data
app.get('/analysis', (req, res) => {
  let sampleId = '25023 2019 CHE-0815'
  if (req.query.id === sampleId) {
    res.json({
      samples: [
        {
          name: 'Oil',
          description: 'Scheme: QFCS, Round: FC221, Sample: 778-Fat Quality, Storage: 2-8 C, approx. 150 g sample, in an amber glass bottle.'
        }
      ],
      tests: [
        {
          id: 1,
          name: 'Package B',
          method: null,
          progress: 0,
          workflow: 6,
          status: 'pending'
        },
        {
          id: 2,
          name: 'Moisture Content	',
          method: 'Air oven drying @ 107 C',
          progress: 0,
          workflow: 4,
          status: 'pending'
        },
        {
          id: 3,
          name: 'Ash',
          method: 'Gravimetric Method/Furnace @ 750 C',
          progress: 0,
          workflow: 5,
          status: 'pending'
        },
        {
          id: 4,
          name: 'Volatile Matter',
          method: 'Gravimetric Method/Furnace @ 950 C',
          progress: 0,
          workflow: 5,
          status: 'pending'
        },
        {
          id: 5,
          name: 'Fixed Carbon',
          method: 'By difference',
          progress: 0,
          workflow: 5,
          status: 'pending'
        },
        {
          id: 6,
          name: 'Heating Value',
          method: 'Bomb calorimetry',
          progress: 0,
          workflow: 4,
          status: 'pending'
        }
      ]
    })
  } else {
    res.json({
      error: true,
      message: 'Invalid Tag'
    })
  }
})

// Start Server
app.listen(port, () => console.log(`API Server: ${ip}:${port}`))
