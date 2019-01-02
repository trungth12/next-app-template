import {Row, Col} from 'antd'
import {Trans} from "@lingui/macro"
import Button from './button'
import {sorter} from 'next-app-store/lib/utils'
import dynamic from 'next/dynamic'
const Form = dynamic(import('./form'), {ssr: false})
const columns = [{
  title: <Trans>Semester Name</Trans>,
  dataIndex: 'semester_name',
  key: 'semester_name',
  sorter,
}, {
  title: <Trans>School Year</Trans>,
  dataIndex: 'school_year',
  key: 'school_year',
  sorter,
  render: school_year => (
    <div>{school_year.school_year_name}</div>
  )
},{
  title: <Trans>Start date</Trans>,
  dataIndex: 'start_date',
  key: 'start_date',
  sorter,
}, {
  title: <Trans>To Date</Trans>,
  dataIndex: 'to_date',
  key: 'to_date',
  sorter,
},{
  title: <Trans>Semester Action</Trans>,
  key: 'action',
  render: (text, record) => (
    <Row>
      <Col span={12}><Form record={record} label='Edit' /></Col>
      <Col span={12}><Button>Delete</Button></Col>
    </Row>
  ),
}]


export default columns