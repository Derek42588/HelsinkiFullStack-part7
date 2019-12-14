import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import { setUser } from '../reducers/usersReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Form } from 'semantic-ui-react'
import styles from '../App.module.css'

import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({
  setUser,
  setNotification
}) => {

  const username = useField('text')
  const password = useField('password')

  let user = {
    value: username.value,
    type: username.type,
    onChange: username.onChange,
  }
  let pass = {
    value: password.value,
    type: password.type,
    onChange: password.onChange,
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      setNotification({
        message: 'Logged in successfully!',
        type: 'success'
      }, 10)
    } catch (exception) {
      console.log(exception)
      setNotification({
        message: 'Wrong credentials',
        type: 'error'
      }, 10)
    }
  }

  return (
    <div className = "loginForm">
      <h2> Login </h2>

      <Form onSubmit={handleLogin} id = "loginForm">
        <div>
              username
          <input
            {...user}
          />
        </div>
        <div>
              password
          <input
            {...pass}
          />
        </div>
        <Button id = {styles['formButton']} primary type="submit">login</Button>
      </Form>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  setUser,
  setNotification
}

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)
export default ConnectedLoginForm