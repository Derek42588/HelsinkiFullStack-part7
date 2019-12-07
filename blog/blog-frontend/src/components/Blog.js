/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setBlogs, upvoteBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blog = ({ blog, user, deleteBlog, upvoteBlog, setNotification }) => {
  const [expanded, setExpanded] = useState(false)

  const hideWhenVisible = { display: expanded ? 'none' : '' }
  const showWhenVisible = { display: expanded ? '' : 'none' }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const removeBlog = () => {
    let result = window.confirm(`remove blog ${blog.title} by ${blog.author}?`)
    if (result) {
      deleteBlog(blog.id)
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
      <div style = {blogStyle} className = "blog">
        <div onClick = {toggleExpanded} style = {hideWhenVisible} className = 'truncated'>
          {blog.title} by {blog.author}
        </div>
        <div onClick = {toggleExpanded} style = {showWhenVisible} className = 'expanded'>
          <p>
            {blog.title} by {blog.author}
          </p>
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
            user.username === blog.user.username ?
              showDelete()
              :
              null
          }
        </div>

      </div>
    )

  }

  return (
    <div >
      {
        user === null ?
          null:
          showBlog()
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // addLike: PropTypes.func.isRequired,
  // deleteBlog: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setBlogs,
  upvoteBlog,
  deleteBlog,
  setNotification
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default ConnectedBlog