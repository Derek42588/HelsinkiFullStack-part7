/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import { Container } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import User from './components/User'
import Blog from './components/Blog'
import UsersList from './components/UsersList'
import Notification from './components/Notification'
import Footer from './components/Footer'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { setUser, removeUser, setUsersList } from './reducers/usersReducer'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs, createBlog } from './reducers/blogReducer'
import { Menu, Button } from 'semantic-ui-react'
import styles from './App.module.css'
import blogService from './services/blogs'

const App = (props) => {
  const padding = {
    padding: 5
  }

  useEffect(() => {
    props.setBlogs()
    props.setUsersList()
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

  const userById = (id) => {
    if (props.user === null) {
      return null
    }
    if (props.user.users === undefined) {
      return null
    }
    return props.user.users.find(user => user.id === id)
  }
  const blogById = (id) => {
    if (props.blogs === null) {
      return null
    }
    if (props.blogs === undefined) {
      return null
    }
    return props.blogs.find(blog => blog.id === id)
  }

  const blogFormRef = React.createRef()
  const loginFormRef = React.createRef()

  return (
    <Container>
      <Router>
        <Menu id = {styles["menuLink"]}>
          <Menu.Item id = {styles["menuLink"]} as = { Link } to = "/"
            name = 'home'>
            home
          </Menu.Item>
          <Menu.Item id = {styles["menuLink"]} as = { Link } to = "/blogs"
            name = 'home'>
            blogs
          </Menu.Item>
          <Menu.Item id = {styles["menuLink"]} as = { Link } to = "/users"
            name = 'home'>
            users
          </Menu.Item>
          {(props.user === null || props.user.user === undefined) ?
            null
            :
            <Menu.Item id = {styles["menuLink"]} position = "right">

              {props.user.user.name} logged in 
              <Button id = {styles["menuButton"]} primary onClick = {handleLogout}>logout</Button>

            </Menu.Item>
          }
        </Menu>

        <h1>Blogs</h1>

        <Notification />

        {(props.user === null || props.user.user === undefined) ?
          <Togglable buttonLabel = "log in" ref = {loginFormRef }>
            <LoginForm />
          </Togglable>
          :
          <div>
            <Togglable buttonLabel = "add blog" ref = {blogFormRef}>
              <BlogForm />
            </Togglable>
          </div>
        }

        <Route exact path ="/" render = {() => <BlogList />} />
        <Route exact path ="/blogs" render = {() => <BlogList />} />
        <Route exact path ="/users" render = {() => <UsersList users = {props.user} />} />
        <Route exact path="/users/:id" render={({ match }) =>
          <User user={userById(match.params.id)} />
        } />
        <Route exact path="/blogs/:id" render={({ match }) =>
          <Blog blog={blogById(match.params.id)} />
        } />
      </Router>
      <Footer />
    </Container>
  )

}

const mapDispatchToProps = {
  setUser,
  removeUser,
  setNotification,
  setBlogs,
  createBlog,
  setUsersList
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    notification: state.notification
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
