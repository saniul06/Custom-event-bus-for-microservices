import React, { useState, useEffect } from 'react'
import PostCreate from './components/post/PostCreate'
import PostList from './components/post/PostList'
import CryptoJS from 'crypto-js'
import './style.css'

const App = () => {
  const [reload, setReload] = useState(false)

  return (
    <div className="container">
      <div>Blog application</div>
      <PostCreate setReload={setReload} />
      <PostList setReload={setReload} reload={reload} />
    </div>
  )
}

export default App