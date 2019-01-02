import {Row, Col} from 'antd'
import {Trans} from "@lingui/macro"
import Button from './button'
import {sorter} from 'next-app-store/lib/utils'
import dynamic from 'next/dynamic'
const Form = dynamic(import('./form'), {ssr: false})

const columns = [{
  title: <Trans>Week</Trans>,
  dataIndex: 'week',
  key: 'week',
  sorter,
},{
  title: <Trans>Semester</Trans>,
  dataIndex: 'semester',
  key: 'semester',
  sorter,
  render: semester => (
    <div>{semester.semester_name}</div>
  )
},{
  title: <Trans>Start date</Trans>,
  dataIndex: 'start_date',
  key: 'start_date',
  sorter,
}, {
  title: <Trans>End Date</Trans>,
  dataIndex: 'end_date',
  key: 'end_date',
  sorter,
},{
  title: <Trans>Week Action</Trans>,
  key: 'action',
  render: (text, record) => (
    <Row>
      <Col span={12}><Form record={record} label='Edit' /></Col>
      <Col span={12}><Button>Delete</Button></Col>
    </Row>
  ),
}]

export default columns