import withStore from 'next-app-store/lib/with-store'
//import defaultReducer from 'next-app-store/lib/reducer'
import PageWrapper from '../layouts/page_wrapper'
import {withRouter} from 'next/router'
import defaultReducer from '../reducer'

const Page = ({router}) => {
  const {query} = router
  const Ages = require(`../components/edu/sche_${query.mod}`).default
  return (
    <PageWrapper>
      <Ages />
    </PageWrapper>
  )
}

Page.getInitialConfig = async ({query}) => {  
  const {mod} = query
  
  return {
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

