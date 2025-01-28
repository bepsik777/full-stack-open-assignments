import './main.css'
import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import UserInfo from './components/UserInfo'
import NotificationBox from './components/NotificactionBox'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    if (user !== null) {
      fetchBlogs()
    }
  }, [user])

  useEffect(() => {
    let cachedUser = window.localStorage.getItem('loggedUser')
    if (cachedUser) {
      cachedUser = JSON.parse(cachedUser)
      setUser(cachedUser)
      blogService.setToken(cachedUser.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging to the backend')
    try {
      const user = await loginService.login({ username, password })
      setPassword('')
      setUsername('')
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      handleNotification(`You have logged in as ${user.username}`)
    } catch (e) {
      console.log('error: ', e.response.data.error)
      handleNotification(`${e.response.data.error}`, true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    handleNotification('you have looged out')
  }

  const handleNotification = (text, isError = false) => {
    setNotification({ text, isError })
    setTimeout(() => setNotification(null), 5000)
  }

  return (
    <div>
      <h1>BLOGS</h1>
      {notification && <NotificationBox notification={notification} />}
      {user === null ? (
        <Togglable buttonLabel={'login'}>
          <LoginForm
            username={username}
            password={password}
            handleUsername={setUsername}
            handlePassword={setPassword}
            handleLogin={handleLogin}
          ></LoginForm>
        </Togglable>
      ) : (
        <div>
          <UserInfo user={user} handleLogout={handleLogout}></UserInfo>
          <BlogForm
            handleBlogs={setBlogs}
            blogs={blogs}
            handleNotification={handleNotification}
          ></BlogForm>
          <BlogList blogs={blogs}></BlogList>
        </div>
      )}
    </div>
  )
}

export default App
