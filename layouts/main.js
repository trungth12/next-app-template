import { Layout } from 'antd';
import {connect} from 'react-redux';
import RolesChooser from './roles_chooser';

const {
  Header, Footer, Sider, Content, Alert
} = Layout;

const Main = ({header = null, sider, children, errorMessage, closeErrorMessage}) => {
  let alert =  null
  if (errorMessage) {
    alert = (
      <Alert 
        showIcon
        message={errorMessage}
        type="error" 
        closeText="Close Now" 
        onClose={() => closeErrorMessage(null)}
      />
    )
  }
  return (
    <div style={{backgroundColor: 'white'}}>
    <Layout style={{backgroundColor: 'white'}}>
      <Header style={{backgroundColor: 'white'}}>{header}</Header>
      {alert}
      <Layout style={{backgroundColor: 'white'}}>
        <Sider style={{backgroundColor: 'white'}}>{sider}</Sider>
        <Layout style={{backgroundColor: 'white'}}>
        <Content style={{margin: '6px'}}>
          <RolesChooser />          
          {children}
        </Content>
        </Layout>
      </Layout>
      <Footer style={{backgroundColor: 'white'}}>Footer</Footer>
    </Layout>
  </div>
  )
}
  

const ConnectedMain = connect(
  state => ({ errorMessage: state.error.errorMessage }),
  dispatch => ({ closeErrorMessage: dispatch.error.setError })
)(Main)

export default ConnectedMain
