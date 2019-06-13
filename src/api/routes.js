const { random, commerce, image, date, company, lorem, finance } = require('faker')
const express = require('express')
const app = express.Router()

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

// Server Status
app.get('/server', (req, res) => {
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
  let sampleCodes = [{"sample_id":"5199","sample_code":"CHE-0865"},{"sample_id":"5210","sample_code":"CHE-0867"},{"sample_id":"5211","sample_code":"CHE-0866"},{"sample_id":"5212","sample_code":"CHE-0868"},{"sample_id":"5213","sample_code":"CHE-0869"},{"sample_id":"5214","sample_code":"CHE-0870"},{"sample_id":"5215","sample_code":"CHE-0871"},{"sample_id":"5216","sample_code":"CHE-0872"},{"sample_id":"5217","sample_code":"CHE-0873"},{"sample_id":"5218","sample_code":"CHE-0874"},{"sample_id":"5226","sample_code":"CHE-0875"},{"sample_id":"5228","sample_code":"CHE-0876"},{"sample_id":"5230","sample_code":"CHE-0877"},{"sample_id":"5231","sample_code":"CHE-0878"},{"sample_id":"5232","sample_code":"CHE-0879"},{"sample_id":"5233","sample_code":"CHE-0880"},{"sample_id":"5234","sample_code":"CHE-0881"},{"sample_id":"5235","sample_code":"CHE-0882"},{"sample_id":"5254","sample_code":"CHE-0883"},{"sample_id":"5255","sample_code":"CHE-0884"}]
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
    code: commerce.product(),
    name: commerce.productName(),
    thumbnail: image.image(),
    type: random.arrayElement(['consumable', 'equipment'])
  })))
})

// Get entries data
app.get('/entries', (req, res) => {
  if (req.query.productId) {
    res.json(
      [...Array(random.number({ min: 1, max: 3 }))].map((entry, id) => ({
        id,
        expiration: date.future(),
        supplier: company.companyName(),
        description: lorem.sentence(),
        content: `${random.number(9)} ${random.arrayElement(['Liters (L)', 'Mililiters (mL)', 'Kilograms (kg)', 'Grams (g)'])}`,
        price: finance.amount(),
        onhand: random.number(20)
      }))
    )
  } else res.json({ error: true, message: 'Invalid productId.' })
})

module.exports = app
