import withStore from 'next-app-store/lib/with-store'
import defaultReducer from '../reducer'
import PageWrapper from '../layouts/page_wrapper'
import {withRouter} from 'next/router'
//import pageQuery from '../components/edu/sche_ages/index.gql'
//const Ages = dynamic(import('../components/edu/sche_ages'))
//const pageQuery = require('../components/edu/sche_ages/index.gql')
//import Ages from '../../components/edu/sche_class_teachers'
//import {query as agesQuery} from '../../components/edu/sche_class_teachers/index.gql'
/*
import TestCrm from '../components/test_crm'
import {query as crmQuery} from '../components/test_crm/index.gql'
import TestHr from '../components/test'
import {query as hrQuery} from '../components/test/index.gql'
*/
/* ----- */

const Page = ({router}) => {
  const {query} = router
  const Ages = require(`../components/edu/sche_${query.mod}`).default
  return (
    <PageWrapper>
      <Ages />
    </PageWrapper>
  )
}

Page.getInitialConfig = async ({language, query}) => {  
  const {mod} = query
  
  const catalogs = {
    [language]: await import(`../locales/edu/${mod}/locales/${language}/messages`)
  }
  
  return {
    catalogs,
    redux: `REDUX_STORE_EDU_${mod}`,
    apollo: {
      "edu": "edu-1.herokuapp.com/v1alpha1/graphql",
    }
  }
}

Page.getInitialStore = defaultReducer

Page.getInitialApolloState = async ({apolloClients, fetchPolicy, query}) => {  
  const  pageQuery = require(`../components/edu/sche_${query.mod}/index.gql`)
  return apolloClients.edu.query({query: pageQuery.query, fetchPolicy})
}

export default withStore(withRouter(Page))

