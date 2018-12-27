import {Button, Table} from 'antd'
import withStore from 'next-app-store/lib/with-store'
import withApollo from 'next-app-store/lib/with-apollo'
import {connect} from 'react-redux'
import Query from 'next-app-store/lib/query'
import gql from 'graphql-tag'

const fragment = gql`
  fragment sche_ages_fragment on sche_ages {
    key:id
    id
    age_name
    from_month
    to_month
  }
`

const query = gql`
query{
  sche_ages{
    ...sche_ages_fragment
  }
}
${fragment}
`

const subscription = gql`
subscription{
  sche_ages{
    ...sche_ages_fragment
  }
}
${fragment}
`

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id',
}, {
  title: 'Age Name',
  dataIndex: 'age_name',
  key: 'age_name',
}, {
  title: 'From month',
  dataIndex: 'from_month',
  key: 'from_month',
}, {
  title: 'To Month',
  dataIndex: 'to_month',
  key: 'to_month',
}]

const Test = withApollo('edu')(() => {
  return (
    <Query
      query={query}
      subscription={subscription}>
      {
        data => <Table columns={columns} dataSource={data.sche_ages} />
      }
    </Query>
  )
})

const Page = ({hello, changeData, apolloClients}) => (
  <div><Button onClick={changeData}>{hello}</Button>
    <Test apolloClients={apolloClients} />
  </div>
)

const EnhancedPage = connect(
  state => ({ hello: state.test.data }),
  dispatch => ({ changeData: dispatch.test.changeText })
)(Page)
EnhancedPage.getInitialConfig = async (ctx) => {
  const apollo = {
    edu: 'edu-1.herokuapp.com/v1alpha1/graphql'
  }
  return {
    redux: 'REDUX_STORE_INDEX',
    apollo,
  }
}
EnhancedPage.getInitialStore = (ctx) => {
  return {
    test: {
      data: 'Hello World 1',
      changeText: (state, payload) => {
        state.data = 'Leuleu'
      }
    }
  }
}
EnhancedPage.getInitialApolloState = async ({apolloClients, fetchPolicy}) => {   
  return Promise.all([
    apolloClients.edu.query({query, fetchPolicy }),
  ])
}
export default withStore(EnhancedPage)

