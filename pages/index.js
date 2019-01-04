import withStore from 'next-app-store/lib/with-store'
import defaultReducer from '../reducer'
import PageWrapper from '../layouts/page_wrapper'
import { Row, Col } from 'antd';
import Ages from '../components/edu/sche_ages'
/*
import TestCrm from '../components/test_crm'
import {query as crmQuery} from '../components/test_crm/index.gql'
import TestHr from '../components/test'
import {query as hrQuery} from '../components/test/index.gql'
*/
/* ----- */
const Page = () => {
  return (
    <PageWrapper>
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <Ages />
        </Col>
      </Row>
    </PageWrapper>
  )
}

Page.getInitialConfig = async () => {  
  return {
    redux: 'REDUX_STORE_INDEX',
    apollo: {
      "edu": "edu-1.herokuapp.com/v1alpha1/graphql",
      "hr": "hr-1.herokuapp.com/v1alpha1/graphql",
      "crm": "crm-1.herokuapp.com/v1alpha1/graphql",
    }
  }
}

Page.getInitialStore = defaultReducer

Page.getInitialApolloState = async ({apolloClients, fetchPolicy}) => {   
  const pageQuery = require('../components/edu/sche_ages/index.gql').query
  return apolloClients.edu.query({query: pageQuery, fetchPolicy})
}

export default withStore(Page)

