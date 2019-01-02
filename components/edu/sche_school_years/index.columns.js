import {Row, Col} from 'antd'
import {Trans} from "@lingui/macro"
import Button from './button'
import {sorter} from 'next-app-store/lib/utils'
import dynamic from 'next/dynamic'
const Form = dynamic(import('./form'), {ssr: false})

const columns = [{
  title: <Trans>School Year Name</Trans>,
  dataIndex: 'school_year_name',
  key: 'school_year_name',
  sorter,
}, {
  title: <Trans>From year</Trans>,
  dataIndex: 'from_year',
  key: 'from_year',
  sorter,
}, {
  title: <Trans>To Year</Trans>,
  dataIndex: 'to_year',
  key: 'to_year',
  sorter,
},{
  title: <Trans>School Year Action</Trans>,
  key: 'action',
  render: (text, record) => (
    <Row>
      <Col span={12}><Form record={record} label='Edit' /></Col>
      <Col span={12}><Button>Delete</Button></Col>
    </Row>
  ),
}]

export default columns