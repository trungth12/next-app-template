import {Row, Col} from 'antd'
import {Trans} from "@lingui/macro"
import Button from './button'
import {sorter} from 'next-app-store/lib/utils'
import dynamic from 'next/dynamic'
const Form = dynamic(import('./form'), {ssr: false})

const columns = [{
  title: <Trans>Class Name</Trans>,
  dataIndex: 'class_name',
  key: 'class_name',
  sorter
}, {
  title: <Trans>Is Skill ?</Trans>,
  dataIndex: 'is_skill',
  key: 'is_skill',
  sorter
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