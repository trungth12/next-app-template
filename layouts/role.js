import React from 'react'
import {connect} from 'react-redux'

const Role = ({roles = ["anonymous"], currentRole, children, currentUser, dispatch, ...rest}) => {
  if (!roles.includes(currentRole || !currentUser)) {
    return null
  } else {
    return React.cloneElement(children, { ...rest })
  }
}

export default connect(
  state => ({
    currentRole: state.auth.currentRole,
    currentUser: state.auth.currentUser
  })
)(Role)
