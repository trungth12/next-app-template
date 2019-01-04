import {Row, Col} from 'antd'
import {Trans} from "@lingui/macro"
import Button from './button'
import {sorter} from 'next-app-store/lib/utils'
import dynamic from 'next/dynamic'
const Form = dynamic(import('./form'), {ssr: false})

const columns = [{
  title: <Trans>Code</Trans>,
  dataIndex: 'code',
  key: 'first_name',
  sorter,
}, {
  title: <Trans>First Name</Trans>,
  dataIndex: 'first_name',
  key: 'first_name',
  sorter,
}, {
  title: <Trans>Middle Name</Trans>,
  dataIndex: 'middle_name',
  key: 'middle_name',
  sorter,
},{
  title: <Trans>Last Name</Trans>,
  dataIndex: 'last_name',
  key: 'last_name',
  sorter,
},{
  title: <Trans>Birthday</Trans>,
  dataIndex: 'birth_of_date',
  key: 'birth_of_date',
  sorter,
}, {
  title: <Trans>Gender</Trans>,
  dataIndex: 'gender',
  key: 'gender',
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
