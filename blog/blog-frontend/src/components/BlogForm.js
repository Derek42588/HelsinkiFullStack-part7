import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import { createBlog } from '../reducers/blogReducer'
import { setUsersList } from '../reducers/usersReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'semantic-ui-react'
import styles from '../App.module.css'

const BlogForm = ({

  createBlog,
  setNotification,
  setUsersList

}) => {
  const author = useField('text')
  const title = useField('text')
  const url = useField('text')

  let t = {
    type: title.type,
    value: title.value,
    onChange: title.onChange,
  }
  let a = {
    type: author.type,
    value: author.value,
    onChange: author.onChange,
  }
  let u = {
    type: url.type,
    value: url.value,
    onChange: url.onChange,
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    author.reset()
    url.reset()
    title.reset()
    await createBlog(blogObject)
    setNotification(
      {
        message: `added new blog: ${blogObject.title} by ${blogObject.author}!`,
        type: 'success'
      }, 10)
    setUsersList()

  }

  return (
    <form onSubmit={addBlog} id = "addBlog">
      <div>
              title:
        <input
          {...t}
        />
      </div>
      <div>
              author:
        <input
          {...a}

        />
      </div>
      <div>
              url:
        <input
          {...u}

        />
      </div>
      <Button id = {styles["menuButton"]} primary type="submit">save</Button>
    </form>
  )

}

const mapDispatchToProps = {
  createBlog,
  setNotification,
  setUsersList
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)
export default ConnectedBlogForm