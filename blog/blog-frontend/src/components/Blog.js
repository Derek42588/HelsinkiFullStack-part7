/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setBlogs, upvoteBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { setUsersList } from '../reducers/usersReducer'


const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blog = ({ blog, user, deleteBlog, upvoteBlog, setNotification, setUsersList }) => {
  // const [expanded, setExpanded] = useState(false)

  // const hideWhenVisible = { display: expanded ? 'none' : '' }
  // const showWhenVisible = { display: expanded ? '' : 'none' }

  // const toggleExpanded = () => {
  //   setExpanded(!expanded)
  // }
  if (blog === null) {
    return null
  }
  if (blog === undefined) {
    return null
  }

  const removeBlog = async () => {
    let result = window.confirm(`remove blog ${blog.title} by ${blog.author}?`)
    if (result) {
      await deleteBlog(blog.id)
      setUsersList()
      setNotification({
        message: `blog ${blog.title} by ${blog.author} successfully removed`,
        type: 'success'
      }, 5)
    }
  }


  const showDelete = () => {
    return (
      <button onClick = {removeBlog}>delete</button>
    )
  }

  const addLike = (event) => {
    event.stopPropagation()
    upvoteBlog(blog)
  }
  const showBlog = () => {
    return (
      <div>
        <h1>
          {blog.title} by {blog.author}
        </h1>
        <p>
          <a href = {blog.url}>{blog.url}</a>
        </p>
        <p>
          {blog.likes} likes <button onClick = {addLike}>like</button>
        </p>
        <p>
          added by {blog.user.username}
        </p>
        {
          user.user.username === blog.user.username ?
            showDelete()
            :
            null
        }
      </div>

    )

  }

  return (
    <div >
      {
        user.user === null ?
          null:
          showBlog()
      }
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    // user: state.user.user
    user: state.user
  }
}

const mapDispatchToProps = {
  setBlogs,
  upvoteBlog,
  deleteBlog,
  setNotification,
  setUsersList
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default ConnectedBlog