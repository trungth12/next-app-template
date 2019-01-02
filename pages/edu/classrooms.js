import withStore from 'next-app-store/lib/with-store'
import defaultReducer from '../../reducer'
import PageWrapper from '../../layouts/page_wrapper'
import { Row, Col } from 'antd';
import Ages from '../../components/edu/sche_classrooms'
import {query as agesQuery} from '../../components/edu/sche_classrooms/index.gql'
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

Page.getInitialConfig = async ({language}) => {  
  const catalogs = {
    [language]: await import(`../../locales/edu/classrooms/locales/${language}/messages`)
  }
  return {
    catalogs,
    redux: 'REDUX_STORE_EDU_CLASSROOMS',
    apollo: {
      "edu": "edu-1.herokuapp.com/v1alpha1/graphql",
    }
  }
}

Page.getInitialStore = defaultReducer

Page.getInitialApolloState = async ({apolloClients, fetchPolicy}) => {   
 return apolloClients.edu.query({query: agesQuery, fetchPolicy})
}

export default withStore(Page)

