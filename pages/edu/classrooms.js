import withStore from 'next-app-store/lib/with-store'
import classroomsQuery from '../../graphql/edu/classrooms.gql'
import Classrooms from '../../components/edu/classrooms'
import Layout from '../../layouts/main'
import Sider from '../../layouts/sider'
import Header from '../../layouts/header'
import defaultReducer from '../../reducer'

const Page = () => {
  return (
    <Layout
      header={<Header />}
      sider={<Sider />}
    >
      <Classrooms />
    </Layout>
  )
}

Page.getInitialConfig = async (ctx) => ({
  redux: 'REDUX_STORE_EDU_CLASSROOMS',
  apollo: {
    edu: 'edu-1.herokuapp.com/v1alpha1/graphql'
  }
})

Page.getInitialStore = ({cookies}) => {
  const reducer = defaultReducer({cookies})
  return ({
    ...reducer,
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
    apolloClients.edu.query({query: classroomsQuery, fetchPolicy }),
  ])
}
export default withStore(Page)

