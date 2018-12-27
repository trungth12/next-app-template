import {Button} from 'antd'
import withStore from 'next-app-store/lib/with-store'

const Page = () => (
  <div><Button>Hello</Button></div>
)
export default withStore(Page)

