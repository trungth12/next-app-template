import {Table, Button, Icon, Input} from 'antd'
import dynamic from 'next/dynamic'
import {query, subscription} from '../../graphql/edu/ages.gql'
import withQuery from 'next-app-store/lib/with-query'
import {connect} from 'react-redux'

const Search = Input.Search;

const ExcelDownloader = dynamic(
  import('next-app-store/lib/excel-downloader'),
  {ssr: false})

function search(nameKey, myArray){
  for (var i=0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
          return myArray[i];
      }
  }
}

const SearchInput = () => {
  return (
    <Search
      placeholder="input search text"
      onSearch={value => console.log(value)}
      enterButton
    />
  )
}

const ExcelButton = ({columns, data}) => {
  return (
    <ExcelDownloader columns={columns} data={data}>
    {({handleExcelDownload}) => {
      return (
        <Button type="primary" onClick={handleExcelDownload}>
          <Icon type="plus" /> Export Excel
        </Button>
      )
    }}
    </ExcelDownloader>
  )
}
const Toolbar = ({hello, changeData, data, columns}) => (
  <div>        
    <SearchInput />
    <br/><br/><br/>
    <Button onClick={changeData}>{hello}</Button>
    <ExcelButton columns={columns} data={data} />
  </div>
)

const EnhancedToolbar = connect(
  state => ({ hello: state.test.data }),
  dispatch => ({ changeData: dispatch.test.changeText })
)(Toolbar)

const sorter = (a, b) => {
  if(a.age_name < b.age_name) { return -1; }
  if(a.age_name > b.age_name) { return 1; }
  return 0;
}
const Test = ({sche_ages}) => {
  const columns = [{
    title: 'Age Name',
    dataIndex: 'age_name',
    key: 'age_name',
    defaultSortOrder: 'descend',
    sorter,
  }, {
    title: 'From month',
    dataIndex: 'from_month',
    key: 'from_month',
    sorter,
  }, {
    title: 'To Month',
    dataIndex: 'to_month',
    key: 'to_month',
    sorter,
  }]
  const pagination = {position: 'both'}
  return (
    <div>
      <h1>Ages</h1>
      <EnhancedToolbar data={sche_ages} columns={columns} />
      <br/>
      <Table 
        expandedRowRender={record => <p style={{ margin: 0 }}>{record.age_name}</p>}
        pagination={pagination}
        columns={columns} 
        dataSource={sche_ages} />
    </div>
  )
}

export default withQuery({
  apollo: 'edu',
  query,
  subscription
})(Test)