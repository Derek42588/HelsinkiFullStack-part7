import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { setUsersList } from '../reducers/usersReducer'
import { Table } from 'semantic-ui-react'

const UsersList = (props) => {

  if (props.users === null ) {
    // props.history.push('/')
    return null
  }

  if (props.users.users === undefined) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <Table striped celled>
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell>user</Table.HeaderCell>
            <Table.HeaderCell>blogs created</Table.HeaderCell>
          </Table.Row>
          {props.users.users.map(user =>
            <Table.Row key = {user.id}>
              <Table.Cell><Link to = {`/users/${user.id}`}>{user.name}</Link></Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>


    </div>

  )
}
const mapDispatchToProps = {
  setUsersList
}
const mapStateToProps = (state, ownProps) => {
  const users = ownProps.users
  return {
    users: users
  }
}

const ConnectedUsersList = connect(mapStateToProps, mapDispatchToProps)(withRouter(UsersList))

export default ConnectedUsersList