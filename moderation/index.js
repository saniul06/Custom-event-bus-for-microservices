const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.json())
// app.use(morgan('tiny'))

app.post('/events', async (req, res) => {
  const { type, data } = req.body
  console.log('moderation type', type)
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved'
    await axios.post('http://localhost:9000/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status
      }
    })
  }

  res.send({})
})

app.listen(3004, () => {
  console.log('server started at 3004')
})