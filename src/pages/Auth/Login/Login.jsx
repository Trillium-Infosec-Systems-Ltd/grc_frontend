import React, { useState } from 'react';
import { Form, Input, Button, Switch, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../features/user/userSlice';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';
import { isNotNullOrEmpty } from '../../../utils/utils';

const { Title, Text } = Typography;

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector((state) => state.session.user);

    const [stateRef, setStateRef] = useState({
        rememberMe: true
    })

    if (isNotNullOrEmpty(user) && location.pathname === ROUTES.PUBLIC.ROOT) {
        return <Navigate to={ROUTES.PRIVATE.ROOT} replace />;
    }

    const onFinish = (values) => {
        dispatch(setUser({ ...values, rememberMe: stateRef.rememberMe }))
        navigate(ROUTES.PRIVATE.ROOT)
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <Title level={3} className='text-primary' style={{ fontWeight: 'bold' }}>Welcome Back</Title>
                <Text type="secondary">Enter your email and password to sign in</Text>

                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    className="login-form"
                    requiredMark={false}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email!' }, {
                            type: 'email',
                            message: 'Please enter a valid email address!',
                        },]}
                    >
                        <Input
                            placeholder="Your email"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password placeholder="Your password" />
                    </Form.Item>

                    {/* <Form.Item label="Switch" valuePropName="checked">
                        <Switch />
                    </Form.Item> */}

                    <div className="remember-me">
                        <Switch checked={stateRef.rememberMe} className={stateRef.rememberMe ? 'bg-primary' : ''} onChange={(e) => setStateRef({ ...stateRef, rememberMe: e })} />
                        <span style={{ marginLeft: 8 }}>Remember me</span>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="signin-btn">
                            SIGN IN
                        </Button>
                    </Form.Item>

                    <Text>
                        Don’t have an account? <a href="#" className='text-primary'>Sign up</a>
                    </Text>
                </Form>
            </div>

            <div className="login-right">
                {/* <img src="/assets/logo.png" alt="logo" className="logo-image" /> */}
            </div>
        </div>
    );
};

export default LoginForm;
