import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import { createBlog, setBlogs } from '../reducers/blogReducer'
import { setUsersList } from '../reducers/usersReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Form } from 'semantic-ui-react'
import styles from '../App.module.css'

const BlogForm = ({

  createBlog,
  setNotification,
  setUsersList,
  setBlogs

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
    setBlogs()

  }

  return (
    <Form onSubmit={addBlog} id = "addBlog">
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
      <Button id = {styles['formButton']} primary type="submit">save</Button>
    </Form>
  )

}

const mapDispatchToProps = {
  createBlog,
  setNotification,
  setUsersList,
  setBlogs
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)
export default ConnectedBlogForm