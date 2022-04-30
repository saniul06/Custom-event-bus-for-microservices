import React, { useState } from 'react'
import axios from 'axios'

const CommentCreate = ({ postId, setReload }) => {

  const [content, setContent] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:3002/post/${postId}/comment`, { content })
      setReload(prev => !prev)
    } catch (err) {
      setContent('')
      console.log('eerr is', err)
    }
    setContent('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">New comment</label>
          <input type="text" value={content} className="form-control" onChange={(e) => setContent(e.target.value)} />
        </div>
        <button className="btn btn-primary">Create</button>
      </form>
    </>
  )
}

export default CommentCreate