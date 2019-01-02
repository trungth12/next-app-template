import {Row, Col} from 'antd'
import {Trans} from "@lingui/macro"
import Button from './button'
import {sorter} from 'next-app-store/lib/utils'
import dynamic from 'next/dynamic'
const Form = dynamic(import('./form'), {ssr: false})

const columns = [{
    title: <Trans>Enrollment Status</Trans>,
    dataIndex: 'status',
    key: 'status',
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
    },
  },{
    title: <Trans>Student Class</Trans>,
    dataIndex: 'class',
    key: 'class',
    sorter,
    render: class_ => {
      return (
        <div>{class_.class_name}</div>
      )
    }
  },{
    title: <Trans>Students Enrollment Action</Trans>,
    key: 'action',
    render: (text, record) => (
      <Row>
        <Col span={12}><Form record={record} label='Edit' /></Col>
        <Col span={12}><Button>Delete</Button></Col>
      </Row>
    ),
  }]

export default columns