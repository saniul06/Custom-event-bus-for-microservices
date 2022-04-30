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

const handleEvent = (type, data) => {
  if (type === 'postCreated') {
    const { id, title } = data
    posts[data.id] = { id, title, comments: [] }
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data
    const post = posts[postId]
    post.comments.push({ id, content, status })
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data
    const post = posts[postId]
    const comment = post.comments.find(comment => comment.id === id)
    comment.status = status
  }
}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body
  console.log('event type is:', type)
  handleEvent(type, data)
  res.send({})
})

app.listen(3003, async () => {
  console.log('listening in port 3003')
  const res = await axios.get('http://localhost:9000/events')
  for (let event of res.data) {
    console.log('processing events', event.type)
    handleEvent(event.type, event.data)
  }
})