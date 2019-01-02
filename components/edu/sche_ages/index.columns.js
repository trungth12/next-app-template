import {Row, Col} from 'antd'
import {Trans} from "@lingui/macro"
import Button from './button'
import {sorter} from 'next-app-store/lib/utils'
import dynamic from 'next/dynamic'
const Form = dynamic(import('./form'), {ssr: false})

const columns = [{
  title: <Trans>Age Name</Trans>,
  dataIndex: 'age_name',
  key: 'age_name',
  defaultSortOrder: 'descend',
  sorter,
}, {
  title: <Trans>From month</Trans>,
  dataIndex: 'from_month',
  key: 'from_month',
  sorter,
}, {
  title: <Trans>To Month</Trans>,
  dataIndex: 'to_month',
  key: 'to_month',
  sorter,
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <Row>
      <Col span={12}><Form record={record} label='Edit' /></Col>
      <Col span={12}><Button>Delete</Button></Col>
    </Row>
  ),
}]

export default columns
