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
  let delay = await latency(5000, 7000)
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
  }
})

// Get user data
app.get('/user', (req, res) => {
  res.json({ token, user })
})

// Start Server
app.listen(port, () => console.log(`API Server: ${ip}:${port}`))
