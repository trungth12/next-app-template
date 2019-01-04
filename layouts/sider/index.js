import { Menu, Icon } from 'antd';
import {connect} from 'react-redux'
import Link from 'next/link'
import { Trans} from "@lingui/macro"
import Button from '../../components/button'
import localize from 'next-app-store/lib/localize'

const SubMenu = Menu.SubMenu;
const Sider = ({inlineCollapsed = false, toggleCollapsed}) => {
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
          <Menu.Item key="1">
            <Link href="/edu?mod=ages"><a><Trans>Ages</Trans></a></Link>
          </Menu.Item>  
            <Menu.Item key="2">
              <Link href="/edu?mod=classes"><a><Trans>Classes</Trans></a></Link>
            </Menu.Item>
          <Menu.Item key="3">
          <Link href="/edu?mod=school_years"><a><Trans>School Years</Trans></a></Link>
          </Menu.Item>
          <Menu.Item key="4">
          <Link href="/edu?mod=semesters"><a><Trans>Semester</Trans></a></Link>
          </Menu.Item>
          <Menu.Item key="5">
          <Link href="/edu?mod=weeks"><a><Trans>Weeks</Trans></a></Link>
          </Menu.Item>
          <Menu.Item key="6">
          <Link href="/edu?mod=terms"><a><Trans>Terms</Trans></a></Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link href="/edu?mod=classrooms"><a><Trans>Classrooms</Trans></a></Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link href="/edu?mod=students"><a><Trans>Students</Trans></a></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="g2" title={<span><Icon type="appstore" /><span><Trans>Admissions</Trans></span></span>}>
          <Menu.Item key="9">
          <Link href="/edu?mod=class_teachers"><a><Trans>Teacher Admission</Trans></a></Link>
          </Menu.Item>
          <Menu.Item key="10">
          <Link href="/edu?mod=class_enrollments"><a><Trans>Student Admission</Trans></a></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="g3" title={<span><Icon type="appstore" /><span><Trans>Attendance</Trans></span></span>}>
          <Menu.Item key="11">
            <Link href="/edu?mod=class_attendances"><a><Trans>Students Attendance</Trans></a></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="g4" title={<span><Icon type="appstore" /><span><Trans>Calendar</Trans></span></span>}>
        <Menu.Item key="12">
            <Link href="/edu?mod=timetables"><a><Trans>Students Timetables</Trans></a></Link>
          </Menu.Item>
        </SubMenu>
      </SubMenu>
    </Menu>
    </div>      
  );
}
const LocalizedSider = localize(
  language => ({
    [language]: require(`./locales/${language}/messages`)
}))(Sider)

export default connect(
  state => ({inlineCollapsed: state.layouts.inlineCollapsed}),
  dispatch => ({
    toggleCollapsed: dispatch.layouts.toggleCollapsed
  }),
  null,
  { pure: false }
)(LocalizedSider)
