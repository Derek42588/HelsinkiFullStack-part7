import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.notification.message === '') {
    return null
  }

  if (props.notification.type === 'error')
  {

    return (
      <div className="error">
        {props.notification.message}
      </div>
    )
  }
  if (props.notification.type === 'success')
  {

    return (
      <div className="success">
        {props.notification.message}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification