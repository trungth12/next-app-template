import {Table} from 'antd'
import withApollo from 'next-app-store/lib/with-apollo'
import Query from 'next-app-store/lib/query'
import dynamic from 'next/dynamic'
import {query, subscription} from '../graphql/ages.gql'

const ExcelDownloader = dynamic(
  import('./excel-downloader'),
  {ssr: false})

const columns = [{
title: 'Id',
dataIndex: 'id',
key: 'id',
}, {
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

const Test = withApollo('edu')(() => {
return (
  <Query
    query={query}
    subscription={subscription}>
    {
      data => (
        <div>
          <ExcelDownloader columns={columns} data={data.sche_ages} />
          <Table columns={columns} dataSource={data.sche_ages} />
        </div>)
    }
  </Query>
)
})
export default Test