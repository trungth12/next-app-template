import { Menu, Icon } from 'antd';
import {connect} from 'react-redux'
import Link from 'next/link'
import Role from '../role'
import { Trans} from "@lingui/macro"
import Button from '../../components/button'

const SubMenu = Menu.SubMenu;
const Sider = ({inlineCollapsed = true, toggleCollapsed}) => {
  return (
    <div>
      <Button type="primary" onClick={() => toggleCollapsed(!inlineCollapsed)} style={{ margin: 16 }}>
        <Icon type={inlineCollapsed ? 'menu-unfold' : 'menu-fold'} />
      </Button>
      <Menu
      //onClick={this.handleClick}
      defaultSelectedKeys={['1']}
      mode="inline"
      inlineCollapsed={inlineCollapsed}
    >
      <SubMenu key="sub1" title={<span><Icon type="mail" /><span><Trans>Edu</Trans></span></span>}>
        <SubMenu key="g1" title={<span><Icon type="appstore" /><span><Trans>Directory</Trans></span></span>}>
        <Role roles={["user", "admin"]} key="1">
          <Menu.Item>
            <Link href="/edu/ages"><a><Trans>Ages</Trans></a></Link>
          </Menu.Item>  
          </Role>        
          <Role roles={["admin"]} key="2">
            <Menu.Item>
              <Link href="/edu/classes"><a><Trans>Classes</Trans></a></Link>
            </Menu.Item>
          </Role>
          <Menu.Item key="3">
          <Link href="/edu/school_years"><a><Trans>School Years</Trans></a></Link>
          </Menu.Item>
          <Menu.Item key="4">
          <Link href="/edu/semesters"><a><Trans>Semester</Trans></a></Link>
          </Menu.Item>
          <Menu.Item key="5">
          <Link href="/edu/weeks"><a><Trans>Weeks</Trans></a></Link>
          </Menu.Item>
          <Menu.Item key="6">
          <Link href="/edu/terms"><a><Trans>Terms</Trans></a></Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link href="/edu/classrooms"><a><Trans>Classrooms</Trans></a></Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link href="/edu/students"><a><Trans>Students</Trans></a></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="g2" title={<span><Icon type="appstore" /><span><Trans>Admissions</Trans></span></span>}>
          <Menu.Item key="9">
          <Link href="/edu/class_teachers"><a><Trans>Teacher Admission</Trans></a></Link>
          </Menu.Item>
          <Menu.Item key="10">
          <Link href="/edu/class_enrollments"><a><Trans>Student Admission</Trans></a></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="g3" title={<span><Icon type="appstore" /><span><Trans>Attendance</Trans></span></span>}>
          <Menu.Item key="11">
            <Link href="/edu/class_attendances"><a><Trans>Students Attendance</Trans></a></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="g4" title={<span><Icon type="appstore" /><span><Trans>Calendar</Trans></span></span>}>
        <Menu.Item key="12">
            <Link href="/edu/timetables"><a><Trans>Students Timetables</Trans></a></Link>
          </Menu.Item>
        </SubMenu>
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
