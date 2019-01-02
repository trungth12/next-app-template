import withStore from 'next-app-store/lib/with-store'
import Layout from '../layouts/main'
import Sider from '../layouts/sider'
import Header from '../layouts/header'
import defaultReducer from '../reducer'

const Page = () => {
  return (
    <Layout
      header={<Header />}
      sider={<Sider />}
    >
      Hello world
    </Layout>
  )
}

Page.getInitialConfig = async (ctx) => ({
  redux: 'REDUX_STORE_ABOUT',
})

Page.getInitialStore = defaultReducer
  
export default withStore(Page)

