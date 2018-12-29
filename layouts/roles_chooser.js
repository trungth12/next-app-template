import { Radio } from 'antd';
import {connect} from 'react-redux'
import Role from './role'
const RolesChooser = ({currentRole, setRole, currentUser}) => {
  if (currentUser) {
    return (
      <Role
          roles={currentUser.roles}
          >
          <div>
        <div>Choose a role <span />
          <Radio.Group 
            defaultValue={currentRole} 
            buttonStyle="solid"
            onChange={(e) => setRole(e.target.value)}
          >
            <Radio.Button value="user">User</Radio.Button>
            <Radio.Button value="admin">Admin</Radio.Button>
          </Radio.Group>
        </div>
        </div>
      </Role>
    )
  } else {
    return null
  }
}

export default connect(
  state => ({
    currentRole: state.auth.currentRole,
    currentUser: state.auth.currentUser,
  }),
  dispatch => ({
    setRole: dispatch.auth.setRole
  })
)(RolesChooser)