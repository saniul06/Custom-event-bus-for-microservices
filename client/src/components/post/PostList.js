import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CommentCreate from '../comment/CommentCreate'
import CommentList from '../comment/CommentList'

const PostList = ({ reload, setReload }) => {

  const [postList, setPostList] = useState([])
  console.log('in post list reload is', reload)

  useEffect(() => {
    fetchPost()
  }, [reload])

  const fetchPost = async () => {
    const res = await axios.get('http://localhost:3003/posts')
    console.log('res is', res.data)
    setPostList(Object.values(res.data))
  }

  const renderPost = postList.map(post => (
    <div key={post.id} className='card' style={{ width: '30%', marginBottom: '20px' }}>
      <div className="card-body">
        <h4>{post.title}</h4>
        <CommentList comments={post.comments} postId={post.id} />
        <CommentCreate postId={post.id} setReload={setReload} reload={reload} />
      </div>

    </div>
  ))

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPost}
    </div>
  )
}

export default PostList