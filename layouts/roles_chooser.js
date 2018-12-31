import { Radio } from 'antd';
import {connect} from 'react-redux'
import Role from './role'
const RolesChooser = ({currentRole, setRole, currentUser}) => {
  if (currentUser) {
    const radios = currentUser.roles.map((item, index) => {
      return (
        <Radio.Button key={index} value={item}>{item}</Radio.Button>
      )
    })
    return (
      <Role
        roles={currentUser.roles}
        >
        <div>
        <Radio.Group 
          defaultValue={currentRole} 
          buttonStyle="solid"
          onChange={(e) => setRole(e.target.value)}
        >
          {radios}
        </Radio.Group>
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