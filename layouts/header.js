import React from 'react'
import Link from 'next/link'
import { Menu, Button } from 'antd';
import {NetworkWifi} from 'styled-icons/material/NetworkWifi.cjs'
import {Wifi} from 'styled-icons/fa-solid/Wifi.cjs'
import {WifiOff} from 'styled-icons/feather/WifiOff.cjs'
import Login from 'next-app-store/lib/google-login'
import Logout from 'next-app-store/lib/google-logout'
import {connect} from 'react-redux'
import {inspect} from 'util'

class App extends React.Component {
  state = {
    current: 'home',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  onLoginFailure = (res) => {
    console.log(inspect(res))
  }

  render() {
    const {
      onLoginSuccess, 
      isLoggedIn, 
      onLogoutSuccess,
      webSocketStatus
    } = this.props
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="home">
          <Link href="/"><a>Home</a></Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link href="/about"><a>About</a></Link>
        </Menu.Item>
        <Menu.Item key="wifi">
          {(webSocketStatus === 'Connecting' || webSocketStatus === 'Reconnecting') && <NetworkWifi size={20} color={'#1890ff'}/>}
          {webSocketStatus === 'Connected' && <Wifi size={20} color={'#1890ff'}/>}
          {webSocketStatus === 'Disconnected' && <WifiOff size={20} color={'#1890ff'}/>}
        </Menu.Item>
        {isLoggedIn && <Menu.Item key="logout" style={{float: 'right'}}>
          <Button
            onClick={onLogoutSuccess}
          >Logout</Button>
        </Menu.Item>}
        {!isLoggedIn &&
        <Menu.Item key="login" style={{float: 'right'}}>
          <Login
            clientId={process.env.GOOGLE_CLIENT_ID}
            render={renderProps => (
              <Button onClick={renderProps.onClick}>Login with Google</Button>
            )}
            onLoginSuccess={onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
          />
        </Menu.Item>}
      </Menu>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: (state.auth.token && state.auth.token !== null),
    webSocketStatus: state.websocket.status,
  }),
  dispatch => ({
    onLoginSuccess: dispatch.auth.login,
    onLogoutSuccess: dispatch.auth.logout,
  })
)(App)