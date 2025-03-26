import React, { useState } from "react";
import {
  AlertOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
  CloseSquareOutlined,
  FormOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
  BellOutlined,
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
import Notifications from "../pages/notifications";
import Settings from "../pages/settings";

const { Header, Sider, Content } = Layout;
const AdminLayout = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(9);
  const [messages, setMessages] = useState(7);
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
      key: "/users/list",
      icon: <UserOutlined />, 
      label: "Người dùng",
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
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <img src="https://i.postimg.cc/VNnMmfC8/nest.png" className="demo-logo-vertical" />
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
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
          <Space size="large">
            <Badge count={notifications}>
              <BellOutlined style={{ fontSize: 18, color: "#666" }} />
            </Badge>
            <Badge count={messages}>
              <MessageOutlined style={{ fontSize: 18, color: "#666" }} />
            </Badge>
            <Input placeholder="Tìm kiếm..." prefix={<SearchOutlined />} style={{ width: 200, borderRadius: 4 }} />
          </Space>
          <Dropdown overlay={<div style={{ padding: 10 }}><p>Profile</p><p>Settings</p><p>Logout</p></div>} placement="bottomRight">
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
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;