const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const { default: axios } = require('axios');
const morgan = require('morgan')

const app = express();

// app.use(morgan('tiny'))

app.use(cors())

app.use(bodyParser.json())

const events = []


app.post('/events', async (req, res) => {
  const event = req.body
  events.push(event)
  console.log('aaaaaaaa', event.type)

  try {
    await axios.post('http://localhost:3001/events', event)
  } catch (err) {
    console.log('error is :', err.message)
  }

  try {
    await axios.post('http://localhost:3002/events', event)
  } catch (err) {
    console.log('error is :', err.message)
  }

  try {
    await axios.post('http://localhost:3003/events', event)
  } catch (err) {
    console.log('error is :', err.message)
  }

  try {
    await axios.post('http://localhost:3004/events', event)
  } catch (err) {
    console.log('error is :', err.message)
  }

  res.send({ status: 'Ok' })
})

app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(9000, () => {
  console.log('server started at port 9000')
})