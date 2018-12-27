import {Button} from 'antd'
import withStore from 'next-app-store/lib/with-store'
import {connect} from 'react-redux'
import query from '../graphql/ages.gql'
import dynamic from 'next/dynamic'
const Test = dynamic(import('../components/ages'))

const Page = ({hello, changeData, apolloClients}) => (
  <div><Button onClick={changeData}>{hello}</Button>
    <Test apolloClients={apolloClients} />
  </div>
)

const EnhancedPage = connect(
  state => ({ hello: state.test.data }),
  dispatch => ({ changeData: dispatch.test.changeText })
)(Page)
EnhancedPage.getInitialConfig = async (ctx) => ({
  redux: 'REDUX_STORE_INDEX',
  apollo: {
    edu: 'edu-1.herokuapp.com/v1alpha1/graphql'
  }
})
EnhancedPage.getInitialStore = (ctx) => ({
  test: {
    data: 'Hello World 1',
    changeText: (state, payload) => {
      state.data = 'Leuleu'
    }
  }
})

EnhancedPage.getInitialApolloState = async ({apolloClients, fetchPolicy}) => {   
  return Promise.all([
    apolloClients.edu.query({query, fetchPolicy }),
  ])
}
export default withStore(EnhancedPage)

