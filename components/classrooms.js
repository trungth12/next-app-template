import {Table, Button, Icon, Divider} from 'antd'
import dynamic from 'next/dynamic'
import {query, subscription} from '../graphql/classrooms.gql'
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
id
  classroom_name
  amount
  building
  floor
  url_camera
  classes:scheClassessByclassroomId{
    class_name
    is_skill
    ages:scheAgesByageId{
      age_name
    }
  }
*/
const Test = ({sche_classrooms}) => {
  const columns = [{
    title: 'Classroom name',
    dataIndex: 'classroom_name',
    key: 'classroom_name'
  },{
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },{
    title: 'Building',
    dataIndex: 'building',
    key: 'building',
  }, {
    title: 'Floor',
    dataIndex: 'floor',
    key: 'floor',
  },  {
    title: 'Camera',
    dataIndex: 'url_camera',
    key: 'url_camera',
  },{
    title: 'Classes',
    dataIndex: 'classes',
    render: classes => (
      <span>
        {classes.map(i => i.class_name).join(', ')}
      </span>
    ),
  }]
  
  return (
    <div>
      <h1>Classrooms</h1>
      <EnhancedToolbar data={sche_classrooms} columns={columns} />
      <Table columns={columns} dataSource={sche_classrooms} />
    </div>
  )
}

export default withQuery({
  apollo: 'edu',
  query,
  subscription
})(Test)
