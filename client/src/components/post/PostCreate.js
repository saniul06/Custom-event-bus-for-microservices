import React, { useState } from 'react'
import axios from 'axios'

const PostCreate = ({ setReload }) => {

  const [title, setTitle] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:3001/posts', { title })
    setTitle('')
    setReload(prev => !prev)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="from-group">
          <label htmlFor="">Title</label>
          <input type="text" value={title} className="form-control" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <button className="btn-btn-primary">Create</button>
      </form>
    </>
  )
}

export default PostCreate