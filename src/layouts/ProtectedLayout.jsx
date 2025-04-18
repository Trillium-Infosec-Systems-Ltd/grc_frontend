import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Input, Layout, Menu, Space, theme } from 'antd';
import {
    UserOutlined,
    SettingOutlined,
    ProfileOutlined,
    DashboardOutlined,
    FileOutlined,
    WarningOutlined,
    GlobalOutlined,
} from '@ant-design/icons';
import { ROUTES } from '../constants/routes.constants';
import logo from '../assets/logo/CYDEA-GRC.png';
import { isNullOrEmpty } from '../utils/utils';
import { SIDE_MENU } from '../constants/menu.constants';

const { Header, Sider, Content } = Layout;

const ProtectedLayout = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user);

    if (isNullOrEmpty(user)) {
        return <Navigate to={ROUTES.PUBLIC.ROOT} replace />;
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Sidebar */}
            <Sider
                width={220}
                style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}
            >
                <Space direction='vertical' size='large'>
                    <div className="flex justify-center items-center py-4">
                        <img src={logo} alt="Logo" className="w-32" />
                    </div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[ROUTES.PRIVATE.ROOT]}
                        selectedKeys={[window.location.pathname]}
                        style={{ height: '100%', borderRight: 0 }}
                        items={SIDE_MENU.map(item => ({
                            ...item,
                            style: { marginBottom: 12 },
                            onClick: () => navigate(item?.key)
                        }))}
                    />
                </Space>
            </Sider>

            <Layout>
                <Header
                    style={{
                        background: '#fff',
                        padding: '0 24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #f0f0f0',
                    }}
                >
                    {/* <div></div> */}
                    {/* <div> */}
                        <Input size="large" placeholder="Search for something" prefix={<UserOutlined />} style={{
                        borderRadius: 40,
                        background: '#F5F7FA',
                        color: '#8BA3CB',
                        padding: '10px 20px'
                    }} />

                        <div className="flex items-center gap-4">
                            <span className="text-gray-500">
                                <SettingOutlined />
                            </span>
                            <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                className="w-9 h-9 rounded-full"
                                alt="User"
                            />
                        </div>
                    {/* </div> */}
                </Header>

                <Content style={{ margin: '24px', padding: 24, background: '#f9f9f9' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default ProtectedLayout;
