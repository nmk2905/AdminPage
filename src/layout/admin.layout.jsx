import React, { useState } from "react";
import {
  AlertOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  BellOutlined,
  CloseSquareOutlined,
  FormOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../styles/layout.css";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Input,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import ManageUser from "../pages/manage-user";
import { Route, Routes, useNavigate } from "react-router-dom";
import ManageModerators from "../pages/manage-moderators";
import Dashboard from "../pages/dashboard";
import InfoPerson from "../pages/info-person";
import CreateModerators from "../pages/create-moderators";
import ManagePosts from "../pages/manage-posts";
import ManagePackages from "../pages/manage-packages";
import ManageReports from "../pages/manage-reports";
import ManageRevenue from "../pages/manage-revenue";
import Notifications from "../pages/notifications";
import Settings from "../pages/settings";
const { Header, Sider, Content } = Layout;
const AdminLayout = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(9);
  const [messages, setMessages] = useState(7);

  const userMenu = (
    <div style={{ padding: 10 }}>
      <p>Profile</p>
      <p>Settings</p>
      <p>Logout</p>
    </div>
  );
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const menu = [
    {
      key: "/dashboard",
      icon: <AppstoreAddOutlined />,
      label: "Bảng điều khiển",
    },
    {
      key: "/users",
      icon: <UserOutlined />,
      label: "Người dùng",
      children: [
        { key: "/users/list", label: "Người dùng" },
        { key: "/users/info", label: "Thông tin người dùng" },
      ],
    },
    {
      key: "/moderators",
      icon: <UserOutlined />,
      label: "Người kiểm duyệt",
      children: [
        { key: "/moderators/list", label: "Người kiểm duyệt" },
        { key: "/moderators/create", label: "Thêm người kiểm duyệt" },
      ],
    },
    {
      key: "/manage-posts",
      icon: <FormOutlined />,
      label: "Quản lý bài đăng",
    },
    {
      key: "/premium-packages",
      icon: <AppstoreOutlined />,
      label: "Quản lý các gói Premium",
    },
    {
      key: "/reports",
      icon: <CloseSquareOutlined />,
      label: "Quản lý báo cáo vi phạm",
    },
    {
      key: "/revenue",
      icon: <BarChartOutlined />,
      label: "Quản lý doanh thu",
    },
    {
      key: "/notifications",
      icon: <AlertOutlined />,
      label: "Thông báo",
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Cài đặt",
    },
  ];

  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZUVfAZrtjQJtxOE3nYH3frJAcgD384bY8KA&s"
            className="demo-logo-vertical"
          />
          <Menu
            style={{ height: "100vh" }}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["/dashboard"]}
            items={menu}
            onClick={(e) => navigate(e.key)}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: "0 16px",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Nút toggle menu */}
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "16px", width: 64, height: 64 }}
            />

            {/* Nhóm thông báo, tin nhắn và tìm kiếm */}
            <Space size="large">
              <Badge count={notifications}>
                <BellOutlined style={{ fontSize: 18, color: "#666" }} />
              </Badge>
              <Badge count={messages}>
                <MessageOutlined style={{ fontSize: 18, color: "#666" }} />
              </Badge>
              <Input
                placeholder="Tìm kiếm..."
                prefix={<SearchOutlined />}
                style={{ width: 200, borderRadius: 4 }}
              />
            </Space>

            {/* Avatar và dropdown user */}
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Space>
                <Avatar icon={<UserOutlined />} />
                <span>Minh Hùng</span>
              </Space>
            </Dropdown>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users/list" element={<ManageUser />} />
              <Route path="/users/info" element={<InfoPerson />} />
              <Route path="/moderators/list" element={<ManageModerators />} />
              <Route path="/moderators/create" element={<CreateModerators />} />
              <Route path="/manage-posts" element={<ManagePosts />} />
              <Route path="/premium-packages" element={<ManagePackages />} />
              <Route path="/reports" element={<ManageReports />} />
              <Route path="/revenue" element={<ManageRevenue />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;
