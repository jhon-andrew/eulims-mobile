const express = require('express')
const bodyParser = require('body-parser')
const os = require('os')
const routes = require('./routes')

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

app.use('/api/restapi', routes)

// Start Server
app.listen(port, () => console.log(`API Server: ${ip}:${port}`))
