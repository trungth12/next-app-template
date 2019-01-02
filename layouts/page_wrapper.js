import Header from './header'
import Sider from './sider'
import Layout from './main'
const Page = ({children}) => {
  return (
    <Layout
      header={<Header />}
      sider={<Sider />}
    >
      {children}
    </Layout>
  )
}

export default Page