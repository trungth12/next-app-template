import {Button} from 'antd'
import withStore from 'next-app-store/lib/with-store'
import {connect} from 'react-redux'

const Page = ({hello, changeData}) => (
  <div><Button onClick={changeData}>{hello}</Button></div>
)

const EnhancedPage = connect(
  state => ({ hello: state.test.data }),
  dispatch => ({ changeData: dispatch.test.changeText })
)(Page)
EnhancedPage.getInitialConfig = async (ctx) => {
  return {
    redux: 'REDUX_STORE_INDEX'
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

export default withStore(EnhancedPage)

