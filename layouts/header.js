import React from 'react'
import Link from 'next/link'

import { logout } from 'next-app-store/lib/auth'
import { Menu, Icon, Button } from 'antd';

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

  render() {
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
        <Menu.Item key="logout" style={{float: 'right'}}>
          <Button onClick={logout}>Logout</Button>
        </Menu.Item>
        <Menu.Item key="login" style={{float: 'right'}}>
          <Link href="/login"><a>Login</a></Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default App