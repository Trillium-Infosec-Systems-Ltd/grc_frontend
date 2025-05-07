import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Input, Layout, Menu, Space, theme } from 'antd';
import {
    UserOutlined,
    SettingOutlined,
    ProfileOutlined,
    DashboardOutlined,
    FileOutlined,
    WarningOutlined,
    GlobalOutlined,
    BellOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import { ROUTES } from '../constants/routes.constants';
import logo from '../assets/logo/CYDEA-GRC.png';
import { isNullOrEmpty } from '../utils/utils';
import { SIDE_MENU } from '../constants/menu.constants';
import AvatarComp from '../components/Image/Avatar';

const { Header, Sider, Content } = Layout;

const ProtectedLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.session.user);
    const route = SIDE_MENU.find(item => item?.key === location.pathname);

    if (isNullOrEmpty(user)) {
        return <Navigate to={ROUTES.PUBLIC.ROOT} replace />;
    }

    return (
        <Layout style={{ minHeight: '100vh', background: '#F5F7FA' }}>
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
                    <h2 style={{ fontSize: 18, fontWeight: 600 }}>{route?.label ?? ''}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <Input size="large" placeholder="Search for something" prefix={<SearchOutlined style={{ fontSize: '20px' }} />} style={{
                            borderRadius: 40,
                            background: '#F5F7FA',
                            color: '#8BA3CB',
                            padding: '10px',
                            gap: 10
                        }} />

                        <div className="flex items-center gap-4" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <span className="text-gray-500" style={{
                                borderRadius: 50,
                                lineHeight: 0,
                                background: '#F5F7FA',
                                color: '#8BA3CB',
                                padding: '10px'
                            }} >
                                <SettingOutlined style={{ fontSize: '24px' }} />
                            </span>
                            <span className="text-gray-500" style={{
                                borderRadius: 50,
                                lineHeight: 0,
                                background: '#F5F7FA',
                                color: '#8BA3CB',
                                padding: '10px'
                            }} >
                                <BellOutlined style={{ fontSize: '24px', color: '#FE5C73' }} />
                            </span>
                            <AvatarComp />
                        </div>
                    </div>
                </Header>

                <Content style={{ margin: '24px', padding: 24, background: '#f9f9f9' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout >
    );
};

export default ProtectedLayout;
