import React from 'react'
import {
  Drawer, Form, Col, Row, Input, Icon,
} from 'antd';
import Button from './button'
import {Trans, t} from "@lingui/macro"
import withApollo from 'next-app-store/lib/with-apollo'
import { I18n } from "@lingui/react"
import {createAgesMutation} from './index.gql'
import {Mutation} from 'react-apollo'

class DrawerForm extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, variables) => {
      console.log(variables)
      if (!err) {
        this.props.action({variables})
      }
    });

  }

  render() {
    const {label} = this.props
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="plus" /> {label}
        </Button>
        <Drawer
          title={<Trans>Create a new age</Trans>}
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          style={{
            overflow: 'auto',
            height: 'calc(100% - 108px)',
            paddingBottom: '108px',
          }}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
              <I18n>
                {({ i18n }) => (
                <Form.Item label={<Trans>Age Name</Trans>}>
                  {getFieldDecorator('age_name', {
                    rules: [{ required: true, message: <Trans>Please enter age name</Trans> }],
                  })(
                    <Input placeholder={i18n._(t`Please enter age name`)} />
                  )}
                </Form.Item>
                )}</I18n>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
              <I18n>
                {({ i18n }) => (
                <Form.Item label={<Trans>From Month</Trans>}>
                  {getFieldDecorator('from_month', {
                    rules: [{ required: true, message: <Trans>Please enter starting month</Trans> }],
                  })(
                    <Input placeholder={i18n._(t`Please enter starting month`)} />
                  )}
                </Form.Item>
                )}
                </I18n>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
              <I18n>
                      {({ i18n }) => (
                <Form.Item label={<Trans>Ending Month</Trans>}>
                  {getFieldDecorator('to_month', {
                    rules: [{ required: true, message: <Trans>Please enter ending month</Trans> }],
                  })(
                    <Input placeholder={i18n._(t`Please enter ending month`)} />
                  )}
                </Form.Item>
                  )}
                  </I18n>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
            <Trans>Cancel</Trans>
            </Button>
            <Button onClick={this.handleSubmit} type="primary">
              <Trans>Submit</Trans>
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const App = Form.create()(DrawerForm);

const MutatedForm = ({...rest}) => {
  return (
    <Mutation mutation={createAgesMutation}>
    {action => <App action={action} {...rest} />}
    </Mutation>
  )
}
export default withApollo('edu')(MutatedForm)
