import {Row, Col} from 'antd'
import {Trans} from "@lingui/macro"
import Button from './button'
import {sorter} from 'next-app-store/lib/utils'
import dynamic from 'next/dynamic'
const Form = dynamic(import('./form'), {ssr: false})

const columns = [{
  title: <Trans>Checked In ?</Trans>,
  dataIndex: 'is_check_in',
  key: 'is_check_in',
  sorter,
},{
  title: <Trans>Checked In At</Trans>,
  dataIndex: 'check_in_at',
  key: 'check_in_at',
  sorter,
},{
title: <Trans>Student</Trans>,
dataIndex: 'student',
key: 'student',
sorter,
render: student => {
  return (
    <div>{student.first_name} {student.middle_name} {student.last_name}</div>
  )
}
},{
title: <Trans>Class</Trans>,
dataIndex: 'class',
key: 'class',
render: class_ => {
  return (
    <div>{class_.class_name}</div>
  )
}
}, {
  title: <Trans>Action</Trans>,
  key: 'action',
  render: (text, record) => (
    <Row>
      <Col span={12}><Form record={record} label='Edit' /></Col>
      <Col span={12}><Button>Delete</Button></Col>
    </Row>
  ),
}]

export default columns