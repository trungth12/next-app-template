import React from 'react'
import Link from 'next/link'
import { Menu, Spin } from 'antd';
import {NetworkWifi} from 'styled-icons/material/NetworkWifi.cjs'
import {Wifi} from 'styled-icons/fa-solid/Wifi.cjs'
import {WifiOff} from 'styled-icons/feather/WifiOff.cjs'
import Login from 'next-app-store/lib/google-login'
import {connect} from 'react-redux'
import {inspect} from 'util'
import {withRouter} from 'next/router'
import LanguageChooser from '../language_chooser'
import RolesChooser from '../roles_chooser'
import Button from '../../components/button'
import { Trans} from "@lingui/macro"
import localize from 'next-app-store/lib/localize'

class App extends React.Component {
  state = {
    current: 'home'
  }

  static getDerivedStateFromProps(props, state) {
    const {pathname} = props.router
    let current = 'home'
    if (pathname === '/about') current = 'about'
    return {current}
  }


  onLoginFailure = (res) => {
    console.log(inspect(res))
  }

  render() {
    const {
      onLoginSuccess, 
      isLoggedIn, 
      onLogoutSuccess,
      webSocketStatus,
      loading,
      primaryColor,
    } = this.props
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="home">
          <Link href="/"><a><Trans>Home</Trans></a></Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link href="/about"><a><Trans>About</Trans></a></Link>
        </Menu.Item>
        <Menu.Item key="wifi">
          {(webSocketStatus === 'Connecting' || webSocketStatus === 'Reconnecting') && <NetworkWifi size={20} color={primaryColor}/>}
          {webSocketStatus === 'Connected' && <Wifi size={20} color={primaryColor}/>}
          {webSocketStatus === 'Disconnected' && <WifiOff size={20} color={primaryColor}/>}
        </Menu.Item>
        {isLoggedIn && <Menu.Item key="logout" style={{float: 'right'}}>
          <Button
            onClick={onLogoutSuccess}
          ><Trans>Logout</Trans></Button>
        </Menu.Item>}
        {!isLoggedIn &&
        <Menu.Item key="login" style={{float: 'right'}}>
          <Login
            clientId={process.env.GOOGLE_CLIENT_ID}
            render={renderProps => (
              <Button onClick={renderProps.onClick}><Trans>Login with Google</Trans></Button>
            )}
            onLoginSuccess={onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
          />
        </Menu.Item>}
        <Menu.Item>
          <LanguageChooser />
        </Menu.Item>
        <Menu.Item>
          <RolesChooser />
        </Menu.Item>
        {loading && <Menu.Item><Spin /></Menu.Item>}
      </Menu>
    );
  }
}

const LocalizedHeader = localize(
  language => ({
    [language]: require(`./locales/${language}/messages`)
}))(App)


export default connect(
  state => ({
    isLoggedIn: (state.auth.token && state.auth.token !== null),
    webSocketStatus: state.websocket.status,
    loading: state.layouts.loading,
    primaryColor: state.theme.primaryColor,
  }),
  dispatch => ({
    onLoginSuccess: dispatch.auth.login,
    onLogoutSuccess: dispatch.auth.logout,
  })
)(withRouter(LocalizedHeader))
