import {Table, Button, Icon} from 'antd'
import dynamic from 'next/dynamic'
import {query, subscription} from '../graphql/classes.gql'
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

const Test = ({sche_classes}) => {
  const columns = [{
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: 'Class Name',
    dataIndex: 'class_name',
    key: 'class_name',
  }, {
    title: 'Is Skill',
    dataIndex: 'is_skill',
    key: 'is_skill',
  }]
  
  return (
    <div>
      <EnhancedToolbar data={sche_classes} columns={columns} />
      <Table columns={columns} dataSource={sche_classes} />
    </div>
  )
}

export default withQuery({
  apollo: 'edu',
  query,
  subscription
})(Test)