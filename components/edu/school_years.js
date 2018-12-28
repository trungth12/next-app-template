import {Table, Button, Icon} from 'antd'
import dynamic from 'next/dynamic'
import {query, subscription} from '../../graphql/edu/school_years.gql'
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


const Test = ({sche_school_years}) => {
  const columns = [{
    title: 'School Year Name',
    dataIndex: 'school_year_name',
    key: 'school_year_name',
  }, {
    title: 'From year',
    dataIndex: 'from_year',
    key: 'from_year',
  }, {
    title: 'To Year',
    dataIndex: 'to_year',
    key: 'to_year',
  }]
  
  return (
    <div>
      <h1>School Years</h1>
      <EnhancedToolbar data={sche_school_years} columns={columns} />
      <Table columns={columns} dataSource={sche_school_years} />
    </div>
  )
}

export default withQuery({
  apollo: 'edu',
  query,
  subscription
})(Test)