import { Layout } from 'antd';

const {
  Header, Footer, Sider, Content,
} = Layout;

const Main = ({header = null, sider, children}) =>
  <div style={{backgroundColor: 'white'}}>
    <Layout style={{backgroundColor: 'white'}}>
      <Header style={{backgroundColor: 'white'}}>{header}</Header>
      <Layout style={{backgroundColor: 'white'}}>
        <Sider style={{backgroundColor: 'white'}}>{sider}</Sider>
        <Content>{children}</Content>
      </Layout>
      <Footer style={{backgroundColor: 'white'}}>Footer</Footer>
    </Layout>
  </div>

export default Main
