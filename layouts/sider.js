import { Menu, Icon, Button } from 'antd';
import {connect} from 'react-redux'
import Link from 'next/link'
import Role from './role'

const SubMenu = Menu.SubMenu;
const Sider = ({inlineCollapsed = true, toggleCollapsed, pathname}) => {
  return (
    <div>
      <Button type="primary" onClick={() => toggleCollapsed(!inlineCollapsed)} style={{ margin: 16 }}>
        <Icon type={inlineCollapsed ? 'menu-unfold' : 'menu-fold'} />
      </Button>
      <Menu
      //onClick={this.handleClick}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      inlineCollapsed={inlineCollapsed}
    >
      <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Edu</span></span>}>
        <SubMenu key="g1" title={<span><Icon type="appstore" /><span>Directory</span></span>}>
          <Menu.Item key="1">
            <Role roles={["user", "admin"]}>
              <Link href="/edu/ages"><a>Ages</a></Link>
            </Role>
          </Menu.Item>          
          <Menu.Item key="2">
            <Role roles={["admin"]}>
              <Link href="/edu/classes"><a>Classes</a></Link>
            </Role>
          </Menu.Item>
          <Menu.Item key="3">
          <Link href="/edu/school_years"><a>School Years</a></Link>
          </Menu.Item>
          <Menu.Item key="4">
          <Link href="/edu/semesters"><a>Semester</a></Link>
          </Menu.Item>
          <Menu.Item key="5">
          <Link href="/edu/weeks"><a>Weeks</a></Link>
          </Menu.Item>
          <Menu.Item key="6">
          <Link href="/edu/terms"><a>Terms</a></Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link href="/edu/classrooms"><a>Classrooms</a></Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link href="/edu/students"><a>Students</a></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="g2" title={<span><Icon type="appstore" /><span>Admissions</span></span>}>
          <Menu.Item key="9">
          <Link href="/edu/class_teachers"><a>Teacher Admission</a></Link>
          </Menu.Item>
          <Menu.Item key="10">
          <Link href="/edu/class_enrollments"><a>Student Admission</a></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="g3" title={<span><Icon type="appstore" /><span>Attendance</span></span>}>
          <Menu.Item key="11">
            <Link href="/edu/class_attendances"><a>Students Attendance</a></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="g4" title={<span><Icon type="appstore" /><span>Calendar</span></span>}>
        <Menu.Item key="12">
            <Link href="/edu/timetables"><a>Students Timetables</a></Link>
          </Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
    </div>      
  );
}

export default connect(
  state => ({inlineCollapsed: state.layouts.inlineCollapsed}),
  dispatch => ({
    toggleCollapsed: dispatch.layouts.toggleCollapsed
  }),
  null,
  { pure: false }
)(Sider)
