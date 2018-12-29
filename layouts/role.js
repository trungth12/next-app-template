import {connect} from 'react-redux'

const Role = ({roles, currentRole, children, currentUser}) => {
  if (!roles.includes(currentRole || !currentUser)) {
    return null
  } else {
    return children
  }
}

export default connect(
  state => ({
    currentRole: state.auth.currentRole,
    currentUser: state.auth.currentUser
  })
)(Role)
