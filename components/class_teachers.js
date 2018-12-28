import {Table, Button, Icon} from 'antd'
import dynamic from 'next/dynamic'
import {query, subscription} from '../graphql/class_teachers.gql'
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
  user_id  
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
const Test = ({sche_class_teachers}) => {
  const columns = [{
    title: 'UserId',
    dataIndex: 'user_id',
    key: 'user_id'
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
      <h1>Teacher Admission</h1>
      <EnhancedToolbar data={sche_class_teachers} columns={columns} />
      <Table columns={columns} dataSource={sche_class_teachers} />
    </div>
  )
}

export default withQuery({
  apollo: 'edu',
  query,
  subscription
})(Test)
