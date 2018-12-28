import withStore from 'next-app-store/lib/with-store'
import weeksQuery from '../../graphql/weeks.gql'
import Weeks from '../../components/weeks'
import Layout from '../../layouts/main'
import Sider from '../../layouts/sider'
import Header from '../../layouts/header'

const Page = () => {
  return (
    <Layout
      header={<Header />}
      sider={<Sider />}
    >
      <Weeks />
    </Layout>
  )
}

Page.getInitialConfig = async (ctx) => ({
  redux: 'REDUX_STORE_EDU_WEEKS',
  apollo: {
    edu: 'edu-1.herokuapp.com/v1alpha1/graphql'
  }
})
Page.getInitialStore = ({cookies}) => {
  return ({
    layouts: {
      inlineCollapsed: (cookies.get('sider') === 'true') || false,
      toggleCollapsed: (state, payload) => {
        cookies.set('sider', payload)
        state.inlineCollapsed = payload
      }
    },
    test: {
      data: cookies.get('hello') || 'Hello World 1',
      changeText: (state, payload) => {
        cookies.set('hello', 'Leuleu')
        state.data = 'Leuleu'
      }
    }
  })
}

Page.getInitialApolloState = async ({apolloClients, fetchPolicy}) => {   
  return Promise.all([
    apolloClients.edu.query({query: weeksQuery, fetchPolicy }),
  ])
}
export default withStore(Page)
