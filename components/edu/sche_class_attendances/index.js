import withQuery from 'next-app-store/lib/with-query'
import {query, subscription} from './index.gql'
import Listing from './listing'
import columns from './index.columns'

export default withQuery({
  apollo: 'edu',
  query,
  subscription,
  name: 'sche_class_attendances',
  columns,
})(Listing)
