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

const commentsByPostId = {}

app.get('/post/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
})

app.post('/post/:id/comment', async (req, res) => {
  const { content } = req.body

  const postId = req.params.id

  const commentId = randomBytes(4).toString('hex')

  const status = 'pending'

  const comments = commentsByPostId[postId] || []

  comments.push({ id: commentId, content, status })

  commentsByPostId[postId] = comments

  await axios.post('http://localhost:9000/events', {
    type: 'CommentCreated',
    data: { id: commentId, content, postId, status }
  })

  res.status(201).send(commentsByPostId[postId])
})

app.post('/events', async (req, res) => {
  const { type, data } = req.body
  console.log('event type is:', type)
  if (type === 'CommentModerated') {
    const { id, postId, status, content } = data
    const comment = commentsByPostId[postId].find(comment => comment.id == id)
    comment.status = status
    await axios.post('http://localhost:9000/events', {
      type: 'CommentUpdated',
      data: { id, postId, status, content }
    })
  }
  res.send({})
})

app.listen(3002, () => {
  console.log('listening in port 3002')
})