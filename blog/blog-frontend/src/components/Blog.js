/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setBlogs, upvoteBlog, deleteBlog, commentOnBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { setUsersList } from '../reducers/usersReducer'
import { useField } from '../hooks/index'
import { Button } from 'semantic-ui-react'
import styles from '../App.module.css'


const Blog = ({ blog, user, deleteBlog, upvoteBlog, setNotification, setUsersList, history, commentOnBlog }) => {
  // const [expanded, setExpanded] = useState(false)

  // const hideWhenVisible = { display: expanded ? 'none' : '' }
  // const showWhenVisible = { display: expanded ? '' : 'none' }

  // const toggleExpanded = () => {
  //   setExpanded(!expanded)
  // }
  const comment = useField('text')

  let c = {
    type: comment.type,
    value: comment.value,
    onChange: comment.onChange,
  }

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
      history.push('/')
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

  const showComments = (comments) => {
    return (
      <div>
        <h2>comments</h2>
        <form onSubmit={addComment} id = "addComment">
          <div>
              comment:
            <input
              {...c}
            />
            <Button id = {styles['menuButton']} primary type="submit">add comment</Button>
          </div>
        </form>
        <ul>
          {comments.map(comment =>
            <li key = {comment.id}>{comment.comment}</li>
          )}
        </ul>
      </div>
    )
  }

  const addComment = (event) => {
    event.preventDefault()

    const commentObject = {
      comment: comment.value,
      id: blog.id + blog.comments.length
    }

    comment.reset()
    commentOnBlog(blog, commentObject)
    setUsersList()
    setBlogs()

  }

  const commentForm = () => {
    return (
      <div>
        <h2>comments</h2>
        <form onSubmit={addComment} id = "addComment">
          <div>
              comment:
            <input
              {...c}
            />
            <Button id = {styles['formButton']} primary type="submit">add comment</Button>
          </div>

        </form>
      </div>
    )
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
          {blog.likes} likes  <Button id = {styles['formButton']} onClick={addLike}>like</Button>
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
        {
          blog.comments.length > 0 ?
            showComments(blog.comments)
            :
            commentForm()
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
  commentOnBlog,
  setNotification,
  setUsersList
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(withRouter(Blog))
export default ConnectedBlog