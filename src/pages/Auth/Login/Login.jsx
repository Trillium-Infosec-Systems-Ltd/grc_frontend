import { useState } from "react";
import { Form, Input, Button, Switch, Typography, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../../constants/routesConstants";
import { isNotNullOrEmpty } from "../../../utils/utils";
import useAuthHook from "../../../hooks/useAuthHook";
import Logo360 from "../../../components/Image/Logos/Logo360";
import LogoText from "../../../components/Image/Logos/LogoText";

const { Title, Text } = Typography;

const LoginForm = () => {
  const { isLoading, login } = useAuthHook();
  const location = useLocation();

  const user = useSelector((state) => state.session.user);

  const [stateRef, setStateRef] = useState({
    rememberMe: false,
  });

  if (isNotNullOrEmpty(user) && location.pathname === ROUTES.PUBLIC.ROOT) {
    return <Navigate to={ROUTES.PRIVATE.ROOT} replace />;
  }

  return (
    <div className="login-container">
      <div className="login-left">
        {/* <Title
          level={3}
          className="text-primary"
          style={{ fontWeight: "bold" }}
        >
          Welcome Back
        </Title>
        <Text type="secondary">Enter your email and password to sign in</Text> */}
        <Form
          layout="vertical"
          //   onFinish={(values) => login({ ...values })}
          onFinish={(values) =>
            login({ ...values, remember_me: stateRef.rememberMe })
          }
          className="login-form"
          requiredMark={false}
        >
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              {/* <Col xs={24} sm={24} md={span} key={fieldname}> */}
              <Form.Item>
                <Title
                  level={3}
                  className="text-primary"
                  style={{ fontWeight: "bold" }}
                >
                  Welcome Back
                </Title>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              {/* <Col xs={24} sm={24} md={span} key={fieldname}> */}
              <Form.Item>
                <Text type="secondary">
                  Enter your email and password to sign in
                </Text>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              {/* <Col xs={24} sm={24} md={span} key={fieldname}> */}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
                ]}
              >
                <Input placeholder="Your email" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24}>
              {/* <Col xs={24} sm={24} md={span} key={fieldname}> */}
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password placeholder="Your password" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24}>
              {/* <Col xs={24} sm={24} md={span} key={fieldname}> */}
              <div className="remember-me">
                <Switch
                  checked={stateRef.rememberMe}
                  className={stateRef.rememberMe ? "bg-primary" : ""}
                  onChange={(e) => setStateRef({ ...stateRef, rememberMe: e })}
                />
                <span style={{ marginLeft: 8 }}>Remember me</span>
              </div>
            </Col>

            <Col xs={24} sm={24} md={24}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="signin-btn"
                  loading={isLoading}
                >
                  SIGN IN
                </Button>
              </Form.Item>
            </Col>

            <Form.Item>
              <Text>
                Don’t have an account?{" "}
                <a href="#" className="text-primary">
                  Sign up
                </a>
              </Text>
            </Form.Item>
          </Row>
        </Form>
      </div>

      <div className="login-right">
        <div className="logo-group-auth">
          <Logo360 height={300} width={400} />
          <LogoText width={400} />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
