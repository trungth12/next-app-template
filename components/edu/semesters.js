import {Table, Button, Icon, Divider} from 'antd'
import dynamic from 'next/dynamic'
import {query, subscription} from '../../graphql/edu/semesters.gql'
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


const Test = ({sche_semesters}) => {
  const columns = [{
    title: 'Semester Name',
    dataIndex: 'semester_name',
    key: 'semester_name',
  }, {
    title: 'School Year',
    dataIndex: 'school_year',
    key: 'school_year',
    render: school_year => (
      <div>{school_year.school_year_name}</div>
    )
  },{
    title: 'Start date',
    dataIndex: 'start_date',
    key: 'start_date',
  }, {
    title: 'To Date',
    dataIndex: 'to_date',
    key: 'to_date',
  },, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Invite {record.semester_name}</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    ),
  }]
  
  return (
    <div>
      <h1>Semesters</h1>
      <EnhancedToolbar data={sche_semesters} columns={columns} />
      <Table columns={columns} dataSource={sche_semesters} />
    </div>
  )
}

export default withQuery({
  apollo: 'edu',
  query,
  subscription
})(Test)