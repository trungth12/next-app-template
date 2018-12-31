import withStore from 'next-app-store/lib/with-store'
import agesQuery from '../../graphql/edu/ages.gql'
import Ages from '../../components/edu/ages'
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
      <Ages />
    </Layout>
  )
}

Page.getInitialConfig = async ({cookies}) => {
  const language = cookies.get('language')
  let catalogs = {}
  if (language && language !== 'en') {
    const siderCatalogs = await import(`../../locales/${language}-sider/messages`)
    const eduAgesCatalogs = await import(`../../locales/${language}-edu-ages/messages`)
    catalogs = {
      [language]: {
        ...siderCatalogs,
        ...eduAgesCatalogs,
      }
    }
  }
  return {
    language,
    catalogs,
    redux: 'REDUX_STORE_EDU_AGES',
    apollo: {
      edu: 'edu-1.herokuapp.com/v1alpha1/graphql'
    }
  }
}
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
    apolloClients.edu.query({query: agesQuery, fetchPolicy }),
  ])
}
export default withStore(Page)

