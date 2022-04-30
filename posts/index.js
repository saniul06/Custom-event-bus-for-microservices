const express = require('express');
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const morgan = require('morgan')
const axios = require('axios')

const app = express();

// app.use(morgan('tiny'))
app.use(cors())

app.use(bodyParser.json())

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts', async (req, res) => {
  const { title } = req.body
  const id = randomBytes(4).toString('hex')
  posts[id] = { id, title }


  await axios.post('http://localhost:9000/events', {
    type: 'postCreated',
    data: { id, title }
  })

  res.status(201).send(posts[id])

})

app.post('/events', (req, res) => {
  console.log('event type is:', req.body.type)
  res.send({})
})

app.listen(3001, () => {
  console.log('listening in port 3001')
})