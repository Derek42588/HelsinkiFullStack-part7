import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'

const BlogsList = (props) => {
  return (
    <div>
      <h2>Blogs</h2>

      {props.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user = {blog.user}
        />
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