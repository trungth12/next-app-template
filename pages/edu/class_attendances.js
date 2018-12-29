import withStore from 'next-app-store/lib/with-store'
import query from '../../graphql/edu/class_attendances.gql'
import ClassAttendances from '../../components/edu/class_attendances'
import Layout from '../../layouts/main'
import Sider from '../../layouts/sider'
import Header from '../../layouts/header'
import Collapse from '../../layouts/collapse'
import dynamic from 'next/dynamic'
import defaultReducer from '../../reducer'

const Students = dynamic(import('../../components/edu/students'), {ssr: false})
const items = [
  {
    key: 1,
    header: 'Students',
    component: <Students />
  },
  {
    key: 2,
    header: 'Students Attendances',
    component: <ClassAttendances />
  }
]
const Page = () => {
  return (
    <Layout
      header={<Header />}
      sider={<Sider />}
    >
      <Collapse
        items={items}
        bordered={false} 
        defaultActiveKey={['2']}
      />
    </Layout>
  )
}

Page.getInitialConfig = async (ctx) => ({
  redux: 'REDUX_STORE_EDU_CLASSATTENDANCES',
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
    apolloClients.edu.query({query, fetchPolicy }),
  ])
}
export default withStore(Page)

