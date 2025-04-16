import React from 'react';
import { Form, Input, Button, Switch, Typography } from 'antd';

const { Title, Text } = Typography;

const LoginForm = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
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
                        rules={[{ required: true, message: 'Please enter your email!' }]}
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

                    <div className="remember-me">
                        <Switch defaultChecked className='bg-primary' />
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
