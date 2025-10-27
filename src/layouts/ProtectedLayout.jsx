import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Dropdown, Input, Layout, Menu, Select, Space, Typography } from "antd";
import {
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ROUTES } from "../constants/routesConstants";
import { isNotNullOrEmpty, isNullOrEmpty } from "../utils/utils";
import { SIDE_MENU } from "../constants/menuConstants";
import AvatarComp from "../components/Image/Avatar";
import useAuthHook from "../hooks/useAuthHook";
import useSearchHook from "../hooks/useSearchHook";
import Logo360Text from "../components/Image/Logos/Logo360Text";
import IMAGE from "../components/Image/Image";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, switchOrg } = useAuthHook();
  const { queryText, onSearch } = useSearchHook();
  const currentPath = location.pathname;

  const user = useSelector((state) => state.session.user);
  const allMenuItems = SIDE_MENU(user).flatMap((item) => [
    item,
    ...(item.children || []),
  ]);

  const route = allMenuItems.find((item) => currentPath.startsWith(item?.key));

  const { name = "", role = "", org_id = "", organizations = [] } = user || {};

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
            <Logo360Text width={200} height={40} />
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={[ROUTES.PRIVATE.ROOT]}
            selectedKeys={[route?.key]}
            style={{ height: "100%", borderRight: 0 }}
            items={SIDE_MENU(user)
              ?.filter((item) => item?.show !== false)
              .map((item) => {
                let newItem = {
                  ...item,
                  style: { marginBottom: 12 },
                  onClick: () => navigate(item?.key),
                  icon: isNotNullOrEmpty(item?.icon) ? (
                    <IMAGE
                      src={item.icon}
                      width={18}
                      height={18}
                      className="d-flex-valign"
                    />
                  ) : null,
                };
                if (isNotNullOrEmpty(item?.children)) {
                  delete newItem.onClick;
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
              options={organizations ?? []}
              style={{ width: 200 }}
            />
            <Input
              size="large"
              placeholder="Search for something"
              prefix={<SearchOutlined style={{ fontSize: "20px" }} />}
              value={queryText}
              onChange={onSearch}
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
