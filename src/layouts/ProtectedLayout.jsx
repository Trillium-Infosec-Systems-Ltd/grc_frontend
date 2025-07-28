import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Dropdown, Input, Layout, Menu, Select, Space, Typography } from "antd";
import {
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ROUTES } from "../constants/routesConstants";
import logo from "../assets/logo/CYDEA-GRC.png";
import { isNotNullOrEmpty, isNullOrEmpty } from "../utils/utils";
import { SIDE_MENU } from "../constants/menuConstants";
import AvatarComp from "../components/Image/Avatar";
import useAuthHook from "../hooks/useAuthHook";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, switchOrg } = useAuthHook();

  const user = useSelector((state) => state.session.user);
  const route = SIDE_MENU().find((item) => item?.key === location.pathname);

  const { name = "", role = "", org_id = "", all_org_ids = [] } = user || {};

  if (isNullOrEmpty(user)) {
    return <Navigate to={ROUTES.PUBLIC.ROOT} replace />;
  }

  return (
    <Layout style={{ minHeight: "100vh", background: "#F5F7FA" }}>
      {/* Sidebar */}
      <Sider
        width={220}
        style={{ background: "#fff", borderRight: "1px solid #f0f0f0" }}
      >
        <Space direction="vertical" size="large">
          <div className="flex justify-center items-center py-4">
            <img src={logo} alt="Logo" className="w-32" />
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={[ROUTES.PRIVATE.ROOT]}
            selectedKeys={[window.location.pathname]}
            style={{ height: "100%", borderRight: 0 }}
            items={SIDE_MENU(user)
              ?.filter((item) => item?.show !== false)
              .map((item) => {
                let newItem = {
                  ...item,
                  style: { marginBottom: 12 },
                  onClick: () => navigate(item?.key),
                };
                if (isNotNullOrEmpty(item?.children)) {
                  delete newItem.onClick;
                  // newItem.onClick = () => navigate(item.children[0]?.key)
                  newItem.children = item.children
                    ?.filter((child) => child?.show !== false)
                    .map((child) => ({
                      ...child,
                      style: { marginBottom: 12 },
                      onClick: () => navigate(child?.key),
                    }));
                }
                return newItem;
              })}
          />
        </Space>
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Title level={4}>{route?.label ?? ""}</Title>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Select
              showSearch
              placeholder="Organization"
              optionFilterProp="label"
              value={org_id}
              onChange={switchOrg}
              options={all_org_ids ?? []}
              style={{ width: 200 }}
            />
            <Input
              size="large"
              placeholder="Search for something"
              prefix={<SearchOutlined style={{ fontSize: "20px" }} />}
              style={{
                borderRadius: 40,
                background: "#F5F7FA",
                color: "#8BA3CB",
                padding: "10px",
                gap: 10,
              }}
            />

            <div
              className="flex items-center gap-4"
              style={{ display: "flex", alignItems: "center", gap: "20px" }}
            >
              <span
                className="text-gray-500"
                style={{
                  borderRadius: 50,
                  lineHeight: 0,
                  background: "#F5F7FA",
                  color: "#8BA3CB",
                  padding: "10px",
                }}
              >
                <SettingOutlined style={{ fontSize: "24px" }} />
              </span>
              <span
                className="text-gray-500"
                style={{
                  borderRadius: 50,
                  lineHeight: 0,
                  background: "#F5F7FA",
                  color: "#8BA3CB",
                  padding: "10px",
                }}
              >
                <BellOutlined style={{ fontSize: "24px", color: "#FE5C73" }} />
              </span>

              <Dropdown
                menu={{
                  items: [
                    {
                      label: (
                        <>
                          <Text className="text-purple" strong>
                            {name}
                          </Text>{" "}
                          <Text type="danger">({role})</Text>
                        </>
                      ),
                      key: "0",
                    },
                    {
                      label: (
                        <span className="text-danger" onClick={logout}>
                          Sign Out
                        </span>
                      ),
                      key: "1",
                    },
                  ],
                }}
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {/* Click me */}
                    <AvatarComp />
                    {/* <DownOutlined /> */}
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
        </Header>

        <Content style={{ margin: "24px", padding: 24, background: "#f9f9f9" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProtectedLayout;
