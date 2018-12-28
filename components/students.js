import {Table, Button, Icon, Divider} from 'antd'
import dynamic from 'next/dynamic'
import {query, subscription} from '../graphql/students.gql'
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

/*
key:id
id
first_name
last_name
code
gender
middle_name 
*/
const Test = ({sche_students}) => {
  const columns = [{
    title: 'First Name',
    dataIndex: 'first_name',
    key: 'first_name'
  },{
    title: 'Middle Name',
    dataIndex: 'middle_name',
    key: 'middle_name',
  },{
    title: 'Last Name',
    dataIndex: 'last_name',
    key: 'last_name',
  },{
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
  }, {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  }]
  
  return (
    <div>
      <h1>Students</h1>
      <EnhancedToolbar data={sche_students} columns={columns} />
      <Table columns={columns} dataSource={sche_students} />
    </div>
  )
}

export default withQuery({
  apollo: 'edu',
  query,
  subscription
})(Test)
