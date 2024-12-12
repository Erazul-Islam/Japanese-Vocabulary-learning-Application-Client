import React from "react";
import {  Layout, Menu, } from "antd";
import {

    DashboardOutlined,
    SettingOutlined,
    LogoutOutlined,
    BorderLeftOutlined,
    PlusOutlined,
    ClockCircleOutlined,
    RadiusSettingOutlined,
    RadarChartOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { useAppSelector } from "../../../redux/hook";

const { Header, Content, Sider } = Layout;

const AdminDashboard: React.FC = () => {

    const user = useAppSelector((state: RootState) => state.auth.user)

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible>
                <div className="logo" style={{ padding: '16px', textAlign: 'center' }}>
                    <img className="w-20 lg:ml-10 h-20 rounded-full" src={user?.photo} alt="" />
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['profile']}>
                    <Menu.Item key="profile" icon={<DashboardOutlined />}>
                        <Link to="/admin/dashboard/lesson-management">Lesson Management</Link>
                    </Menu.Item>
                    <Menu.Item key="lesson-add" icon={<SettingOutlined />}>
                        <Link to="/admin/dashboard/lesson-add">Add Lesson</Link>
                    </Menu.Item>
                    <Menu.Item key="Manage" icon={<LogoutOutlined />}>
                        <Link to="/admin/dashboard/user-management">Manage Users</Link>
                    </Menu.Item>
                    <Menu.Item key="Vocabulary-Manage" icon={<BorderLeftOutlined /> }>
                        <Link to="/admin/dashboard/vocabulary-management">Vocabulary Management</Link>
                    </Menu.Item>
                    <Menu.Item key="lesson" icon={<ClockCircleOutlined />}>
                        <Link to="/admin/dashboard/view-and-management-lesson">Lesson</Link>
                    </Menu.Item>
                    <Menu.Item key="add-vocabulary" icon={<PlusOutlined />}>
                        <Link to="/admin/dashboard/add-vocabulary">Add Vocabulayry</Link>
                    </Menu.Item>
                    <Menu.Item key="/tutorial-management" icon={<RadiusSettingOutlined />}>
                        <Link to="/admin/dashboard/tutorial-management">Tutorail Management</Link>
                    </Menu.Item>
                    <Menu.Item key="/lesson" icon={<RadarChartOutlined />}>
                        <Link to="/lessions">Go Lesson</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0 }}>
                    <div style={{ padding: '0 16px', fontSize: '24px', fontWeight: 'bold',color:'white' }}>
                        Welcome {user?.name}
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;
