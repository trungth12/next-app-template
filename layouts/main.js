import { Layout, Alert } from 'antd';
import {connect} from 'react-redux';
import { Row, Col } from 'antd';

const {
  Header, Footer, 
} = Layout;
const headerStyle = {
  backgroundColor: 'white',
  //boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
}
const Main = ({header = null, sider, children, errorMessage, closeErrorMessage, inlineCollapsed}) => {
  
  const leftSpan = inlineCollapsed ? 2 : 4
  return (
    <div style={{backgroundColor: 'white'}}>
    <Layout style={headerStyle}>
      <Header style={{backgroundColor: 'white'}}>{header}</Header>
      {errorMessage && <Alert 
        showIcon
        message={errorMessage}
        type="error" 
        closeText="Close Now" 
        onClose={() => closeErrorMessage(null)}
      />}
      <Layout style={{backgroundColor: 'white'}}>
      <Row>
      <Col span={leftSpan}>
        {sider}
      </Col>
      <Col span={24 - leftSpan}>
        {children}
      </Col>
      </Row>                
      </Layout>
      <Footer style={{backgroundColor: 'white'}}>Footer</Footer>
    </Layout>
  </div>
  )
}
  

const ConnectedMain = connect(
  state => ({ 
    errorMessage: state.error.errorMessage ,
    inlineCollapsed: state.layouts.inlineCollapsed,
  }),
  dispatch => ({ closeErrorMessage: dispatch.error.setError })
)(Main)

export default ConnectedMain
