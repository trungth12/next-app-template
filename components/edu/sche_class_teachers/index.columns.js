import {Row, Col} from 'antd'
import {Trans} from "@lingui/macro"
import Button from './button'
import {sorter} from 'next-app-store/lib/utils'
import dynamic from 'next/dynamic'
const Form = dynamic(import('./form'), {ssr: false})

const columns = [{
  title: <Trans>UserId</Trans>,
  dataIndex: 'user_id',
  key: 'user_id',
  sorter,
},{
  title: <Trans>Class</Trans>,
  dataIndex: 'class',
  key: 'class',
  sorter,
  render: class_ => {
    return (
      <div>{class_.class_name}</div>
    )
  }
},{
  title: <Trans>Classes Action</Trans>,
  key: 'action',
  render: (text, record) => (
    <Row>
      <Col span={12}><Form record={record} label='Edit' /></Col>
      <Col span={12}><Button>Delete</Button></Col>
    </Row>
  ),
}]

export default columns