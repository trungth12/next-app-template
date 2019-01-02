import {Table, Icon, Input, List} from 'antd'
import dynamic from 'next/dynamic'
import { Trans} from "@lingui/macro"
import Button from './button'
//import NewAge from './ages/new'
const NewAge = dynamic(import('./form'), {ssr: false})
const Search = Input.Search;

const ExcelDownloader = dynamic(
  import('next-app-store/lib/excel-downloader'),
  {ssr: false})


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

const items = ({data, columns}) => [{
  component: <ExcelButton columns={columns} data={data} />
}, {
  component: <NewAge label={<Trans>New Classroom</Trans>} />
}]

const Toolbar = ({data, columns}) => (
  <div>        
    <SearchInput />
    <br/><br/><br/>
    
    <List
    grid={{ gutter: 16, column: 8 }}
    dataSource={items({data, columns})}
    renderItem={item => (
      <List.Item>
        {item.component}
      </List.Item>
    )}
  />
  </div>
)

const Test = ({data, columns}) => {  
  const pagination = {position: 'both'}
  return (
    <div>
      <h1><Trans>Classroom Listing</Trans></h1>
      <Toolbar data={data} columns={columns} />
      <br/>
      <Table 
        pagination={pagination}
        columns={columns} 
        dataSource={data} />
    </div>
  )
}

export default Test