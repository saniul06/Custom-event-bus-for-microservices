import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CommentList = ({ postId, comments }) => {

  // const [comments, setComments] = useState([])

  // useEffect(() => {
  //   fetchComments()
  // }, [])

  const fetchComments = async () => {
    // const res = await axios.get(`http://localhost:3002/post/${postId}/comments`)
    // setComments(res.data)
  }

  const renderComments = comments.map(comment => (
    <li key={comment.id} >
      {comment.content} (status: {comment.status})
    </li>
  ))

  return (
    <>
      {renderComments}
    </>
  )
}

export default CommentList