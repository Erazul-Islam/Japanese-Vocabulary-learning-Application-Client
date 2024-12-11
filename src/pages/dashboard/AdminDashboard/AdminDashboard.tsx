import React from "react";
import { Avatar, Layout, Menu, } from "antd";
import {
    UserOutlined,
    DashboardOutlined,
    SettingOutlined,
    LogoutOutlined,
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
                    <Avatar size="large" icon={<UserOutlined />} />
                    <h2 style={{ color: 'white', marginTop: '8px' }}>{user?.name}</h2>
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
                    <Menu.Item key="Vocabulary-Manage" icon={<LogoutOutlined />}>
                        <Link to="/admin/dashboard/vocabulary-management">Vocabulary Management</Link>
                    </Menu.Item>
                    <Menu.Item key="lesson" icon={<LogoutOutlined />}>
                        <Link to="/admin/dashboard/view-and-management-lesson">Lesson</Link>
                    </Menu.Item>
                    <Menu.Item key="add-vocabulary" icon={<LogoutOutlined />}>
                        <Link to="/admin/dashboard/add-vocabulary">Add Vocabulayry</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0 }}>
                    <div style={{ padding: '0 16px', fontSize: '24px', fontWeight: 'bold' }}>
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
