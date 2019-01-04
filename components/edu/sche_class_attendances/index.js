import withQuery from 'next-app-store/lib/with-query'
import {query, subscription} from './index.gql'
import Listing from './listing'
import columns from './index.columns'
import localize from 'next-app-store/lib/localize'

export default withQuery({
  apollo: 'edu',
  query,
  subscription,
  name: 'sche_class_attendances',
  columns,
})(localize(
  language => ({
    [language]: require(`./locales/${language}/messages`)
}))(Listing))
