import {Table, Button, Icon} from 'antd'
import dynamic from 'next/dynamic'
import {query, subscription} from '../../graphql/edu/ages.gql'
import withQuery from 'next-app-store/lib/with-query'
import {connect} from 'react-redux'

const ExcelDownloader = dynamic(
  import('next-app-store/lib/excel-downloader'),
  {ssr: false})

const Toolbar = ({hello, changeData, data, columns}) => (
  <div><Button onClick={changeData}>{hello}</Button>
    <ExcelDownloader columns={columns} data={data}>
    {({handleExcelDownload}) => {
      return (
        <Button type="primary" onClick={handleExcelDownload}>
          <Icon type="plus" /> Export Excel
        </Button>
      )
    }}
    </ExcelDownloader>
  </div>
)

const EnhancedToolbar = connect(
  state => ({ hello: state.test.data }),
  dispatch => ({ changeData: dispatch.test.changeText })
)(Toolbar)


const Test = ({sche_ages}) => {
  const columns = [{
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
  
  return (
    <div>
      <h1>Ages</h1>
      <EnhancedToolbar data={sche_ages} columns={columns} />
      <Table columns={columns} dataSource={sche_ages} />
    </div>
  )
}

export default withQuery({
  apollo: 'edu',
  query,
  subscription
})(Test)