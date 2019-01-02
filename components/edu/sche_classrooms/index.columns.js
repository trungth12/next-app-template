import {Row, Col} from 'antd'
import {Trans} from "@lingui/macro"
import Button from './button'
import {sorter} from 'next-app-store/lib/utils'
import dynamic from 'next/dynamic'
const Form = dynamic(import('./form'), {ssr: false})

const columns = [{
  title: <Trans>Classroom name</Trans>,
  dataIndex: 'classroom_name',
  key: 'classroom_name'
},{
  title: <Trans>Amount</Trans>,
  dataIndex: 'amount',
  key: 'amount',
},{
  title: <Trans>Building</Trans>,
  dataIndex: 'building',
  key: 'building',
}, {
  title: <Trans>Floor</Trans>,
  dataIndex: 'floor',
  key: 'floor',
},  {
  title: <Trans>Camera</Trans>,
  dataIndex: 'url_camera',
  key: 'url_camera',
},{
  title: <Trans>Classes Listing</Trans>,
  dataIndex: 'classes',
  render: classes => (
    <span>
      {classes.map(i => i.class_name).join(', ')}
    </span>
  ),
},{
  title: <Trans>Classroom Action</Trans>,
  key: 'action',
  render: (text, record) => (
    <Row>
      <Col span={12}><Form record={record} label='Edit' /></Col>
      <Col span={12}><Button>Delete</Button></Col>
    </Row>
  ),
}]

export default columns