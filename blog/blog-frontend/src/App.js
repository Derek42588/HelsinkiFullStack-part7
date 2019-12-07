/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Footer from './components/Footer'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { setUser, removeUser } from './reducers/usersReducer'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs, createBlog } from './reducers/blogReducer'

import blogService from './services/blogs'

const App = (props) => {

  useEffect(() => {
    props.setBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    props.removeUser()
    window.localStorage.clear()
  }

  const blogFormRef = React.createRef()
  const loginFormRef = React.createRef()

  return (
    <div>
      <h1>Blogs</h1>

      <Notification />

      {props.user === null ?
        <Togglable buttonLabel = "log in" ref = {loginFormRef }>
          <LoginForm />
        </Togglable>
        :
        <div>
          <p>{props.user.name} logged in</p>
          <button onClick = {handleLogout}>logout</button>
          <Togglable buttonLabel = "add blog" ref = {blogFormRef}>
            <BlogForm />
          </Togglable>
        </div>
      }
      <BlogList />
      <Footer />
    </div>
  )
  
}

const mapDispatchToProps = {
  setUser,
  removeUser,
  setNotification,
  setBlogs,
  createBlog
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    notification: state.notification
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
