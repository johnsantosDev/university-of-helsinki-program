import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [operation, setOperation] = useState(false)
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const blogFormRef = useRef()

  console.log('blogs: ', blogs)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])

  const logOutUser = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
    setUsername('')
    setPassword('')
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    await blogService.create(blogObject)
    const response = await blogService.getAll()
    setBlogs(response)
  }

  return (
    <div>
      <h1>Login to the application</h1>
      <Notification
        operation={operation}
        successMsg={successMsg}
        errorMsg={errorMsg}
      />
      {
        user === null ?
          <Togglable buttonLabel='login'>
            <Login
              user={user}
              username={username}
              password={password}
              setUser={setUser}
              setUsername={setUsername}
              setPassword={setPassword}
              setErrorMsg={setErrorMsg}
              setOperation={setOperation}
            />
          </Togglable> :
          <div>
            <p>{user.name} logged in</p>
            <button onClick={logOutUser}>logout</button>
            <Togglable buttonLabel ='create blog' ref={blogFormRef}>
              <CreateBlog
                createBlog = {addBlog}
                setSuccessMsg={setSuccessMsg}
                setOperation={setOperation}
              />
            </Togglable>
          </div>
      }
      <br />
      {blogs
        .sort((a, b) => a.likes - b.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            setBlogs={setBlogs}
            user={user}
          />
        )}
    </div>
  )
}

export default App
