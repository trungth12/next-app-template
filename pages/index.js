import withStore from 'next-app-store/lib/with-store'
import agesQuery from '../graphql/edu/ages.gql'
import classesQuery from '../graphql/edu/classes.gql'
import Ages from '../components/edu/ages'
import Classes from '../components/edu/classes'
import Layout from '../layouts/main'
import Sider from '../layouts/sider'
import Header from '../layouts/header'
import defaultReducer from '../reducer'

const mergeCatalogs = (language, catalogs) => {
  let cats = {
    [language]: {
      languageData: {},
      messages: {}
    }
  }
  catalogs.forEach(it => {
    cats[language].messages = {
      ...cats[language].messages,
      ...it.messages
    }
  })
  return cats
}

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

Page.getInitialConfig = async ({cookies}) => {  
  const language = cookies && cookies.language ? cookies.language : 'en'
  const siderCatalogs = await import(`../locales/${language}-sider/messages`)
  const eduAgesCatalogs = await import(`../locales/${language}-edu-ages/messages`)
  const catalogs = mergeCatalogs(language, [siderCatalogs, eduAgesCatalogs])
  return {
    language,
    catalogs,
    redux: 'REDUX_STORE_INDEX',
    apollo: {
      edu: 'edu-1.herokuapp.com/v1alpha1/graphql'
    }
  }
}

Page.getInitialStore = ({cookies}) => {
  const shareReducer = defaultReducer({cookies})
  return ({
    ...shareReducer,
    layouts: {
      inlineCollapsed: false,
      toggleCollapsed: (state, payload) => {
        state.inlineCollapsed = payload
      }
    },
    test: {
      data: 'Hello World 1',
      changeText: (state, payload) => {
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

