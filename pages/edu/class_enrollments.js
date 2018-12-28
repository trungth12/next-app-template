import withStore from 'next-app-store/lib/with-store'
import query from '../../graphql/edu/class_enrollments.gql'
import ClassEnrollments from '../../components/edu/class_enrollments'
import Layout from '../../layouts/main'
import Sider from '../../layouts/sider'
import Header from '../../layouts/header'
import Collapse from '../../layouts/collapse'
import dynamic from 'next/dynamic'
const Students = dynamic(import('../../components/edu/students'), {ssr: false})
const items = [
  {
    key: 1,
    header: 'Students',
    component: <Students />
  },
  {
    key: 2,
    header: 'Students Admission',
    component: <ClassEnrollments />
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
  redux: 'REDUX_STORE_EDU_CLASSENROLLMENTS',
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
    apolloClients.edu.query({query, fetchPolicy }),
  ])
}
export default withStore(Page)

