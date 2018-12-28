import {Table, Button, Icon} from 'antd'
import dynamic from 'next/dynamic'
import {query, subscription} from '../graphql/class_attendances.gql'
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
is_check_in
is_check_out
check_in_at
check_out_at
date_attendance  
student:scheStudentsBystudentId{
  first_name
  middle_name
  last_name
}
class:scheClassesByclassId{
  class_name
  classroom:scheClassroomsByclassroomId{
    classroom_name
    building
    floor
  }
  age:scheAgesByageId{
    age_name
    is_active      
  }
}
*/
const Test = ({sche_class_attendances}) => {
  const columns = [{
      title: 'Checked In ?',
      dataIndex: 'is_check_in',
      key: 'is_check_in',
    },{
      title: 'Checked In At',
      dataIndex: 'check_in_at',
      key: 'check_in_at',
    },{
    title: 'Student',
    dataIndex: 'student',
    key: 'student',
    render: student => {
      return (
        <div>{student.first_name} {student.middle_name} {student.last_name}</div>
      )
    }
  },{
    title: 'Class',
    dataIndex: 'class',
    key: 'class',
    render: class_ => {
      return (
        <div>{class_.class_name}</div>
      )
    }
  }]
  
  return (
    <div>
      <h1>Student Attendances</h1>
      <EnhancedToolbar data={sche_class_attendances} columns={columns} />
      <Table columns={columns} dataSource={sche_class_attendances} />
    </div>
  )
}

export default withQuery({
  apollo: 'edu',
  query,
  subscription
})(Test)
