import withStore from 'next-app-store/lib/with-store'
import agesQuery from '../graphql/ages.gql'
import classesQuery from '../graphql/classes.gql'
import Ages from '../components/ages'
import Classes from '../components/classes'
import Layout from '../layouts/main'
import Sider from '../layouts/sider'
import Header from '../layouts/header'

const Page = () => {
  return (
    <Layout
      header={<Header />}
      sider={<Sider />}
    >
      <Ages />
      <Classes />
    </Layout>
  )
}

Page.getInitialConfig = async (ctx) => ({
  redux: 'REDUX_STORE_INDEX',
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
    apolloClients.edu.query({query: agesQuery, fetchPolicy }),
    apolloClients.edu.query({query: classesQuery, fetchPolicy }),
  ])
}
export default withStore(Page)

