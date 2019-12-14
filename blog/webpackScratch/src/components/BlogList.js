import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const BlogsList = (props) => {
  return (
    <div>
      <h2>Blogs</h2>

      {props.blogs.map(blog =>
        <div style = {blogStyle}
          key={blog.id}
          // blog={blog}
          // user = {blog.user}
        > <Link to = {`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></div>
      )}

    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const ConnectedBlogsList = connect(mapStateToProps)(BlogsList)

export default ConnectedBlogsList