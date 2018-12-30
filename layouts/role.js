import React from 'react'
import {connect} from 'react-redux'

const Role = ({roles = ["anonymous"], currentRole, children, currentUser, ...rest}) => {
  if (!roles.includes(currentRole || !currentUser)) {
    return null
  } else {
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { ...rest })
    );
    return childrenWithProps
  }
}

export default connect(
  state => ({
    currentRole: state.auth.currentRole,
    currentUser: state.auth.currentUser
  })
)(Role)
