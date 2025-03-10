import React, { useState, useEffect } from "react";
import { 
  Table, Button, Modal, Form, Input, InputNumber, Select, message, 
  Card, Divider, Row, Col, Tag, Typography, Spin, Empty, 
  Space, Avatar, Tooltip, Badge, Dropdown, Menu
} from "antd";
import { 
  EditOutlined, PlusOutlined, CrownOutlined,
  TeamOutlined, CalendarOutlined, MinusOutlined
} from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [form] = Form.useForm();

  const server_url = "https://platform-family.onrender.com";

  // Giả lập danh sách features
  const featuresList = [
    { id: "676a65ed185976f1555eb260", name: "Bộ Sưu Tập Gia Đình", icon: "📸" },
    { id: "676a662d185976f1555eb264", name: "Lịch Gia Đình", icon: "📅" },
    { id: "676a663a185976f1555eb266", name: "Đăng Hình Group Gia Đình", icon: "👨‍👩‍👧‍👦" },
    { id: "676a664a185976f1555eb268", name: "Câu Đố, Trò Chơi", icon: "🎮" },
    { id: "676a665a185976f1555eb26a", name: "Nhắn Tin", icon: "💬" },
    { id: "676a666a185976f1555eb26c", name: "Theo Dõi Vị Trí", icon: "📍" },
    { id: "676a667a185976f1555eb26e", name: "Nhắc Nhở Dịp Đặc Biệt", icon: "🎂" },
    { id: "676a668a185976f1555eb270", name: "Hiệu Ứng Tương Tác", icon: "✨" },
  ];

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${server_url}/package/get-all`);
      const result = await response.json();
      
      if (result.ok && result.data) {
        setPackages(result.data);
      } else {
        message.error("Không thể tải dữ liệu gói dịch vụ");
      }
    } catch (error) {
      console.error("Lỗi khi tải gói dịch vụ:", error);
      message.error("Lỗi kết nối đến máy chủ");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePackageFeatures = async (packageId, features, type = 'add') => {
    try {
      setLoading(true);
      const response = await fetch(`${server_url}/package/permission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,  // 'add' or 'remove'
          packageId,
          features
        }),
      });
      
      const result = await response.json();
      
      if (result.ok || result.statusCode === 200) {
        message.success(
          type === 'add' 
            ? "Thêm tính năng thành công" 
            : "Xóa tính năng thành công"
        );
        fetchPackages();
      } else {
        message.error(result.message || "Thao tác không thành công");
      }
    } catch (error) {
      console.error("Lỗi cập nhật tính năng:", error);
      message.error("Lỗi kết nối đến máy chủ");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPackage = async (values) => {
    try {
      setLoading(true);
      const url = editingPackage 
        ? `${server_url}/package/update/${editingPackage._id}`
        : `${server_url}/package/create`;
      
      const method = editingPackage ? 'PUT' : 'POST';
      
      const updatePayload = editingPackage ? {
        name: values.name,
        price: values.price,
        maxMembers: values.maxMembers,
        duration: values.duration
      } : values;
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePayload),
      });
      
      const result = await response.json();
      
      if (result.ok || result.statusCode === 200) {
        message.success(editingPackage ? "Cập nhật gói thành công" : "Tạo gói thành công");
        setIsModalVisible(false);
        form.resetFields();
        setEditingPackage(null);
        fetchPackages();
      } else {
        message.error(result.message || "Thao tác không thành công");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      message.error("Lỗi kết nối đến máy chủ");
    } finally {
      setLoading(false);
    }
  };

  const showModal = (packageItem = null) => {
    setEditingPackage(packageItem);
    setIsModalVisible(true);
    
    if (packageItem) {
      form.setFieldsValue({
        name: packageItem.name,
        price: packageItem.price,
        maxMembers: packageItem.maxMembers,
        duration: packageItem.duration,
        features: packageItem.features,
      });
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingPackage(null);
    form.resetFields();
  };

  const getFeatureName = (featureId) => {
    const feature = featuresList.find(f => f.id === featureId);
    return feature ? feature.name : featureId;
  };

  const getFeatureIcon = (featureId) => {
    const feature = featuresList.find(f => f.id === featureId);
    return feature ? feature.icon : "⭐";
  };

  const getPackageBadgeColor = (price) => {
    if (price <= 100000) return 'blue';
    if (price <= 300000) return 'purple';
    return 'gold';
  };

  const renderFeatureManagement = (packageItem) => {
    return (
      <div style={{ marginTop: 16 }}>
        <Text strong>Quản Lý Tính Năng:</Text>
        <Space>
          <Dropdown
            overlay={
              <Menu>
                {featuresList
                  .filter(feature => 
                    !packageItem.features.includes(feature.id)
                  )
                  .map(feature => (
                    <Menu.Item 
                      key={feature.id}
                      onClick={() => handleUpdatePackageFeatures(
                        packageItem._id, 
                        [feature.id], 
                        'add'
                      )}
                    >
                      {feature.icon} {feature.name}
                    </Menu.Item>
                  ))
                }
              </Menu>
            }
          >
            <Button icon={<PlusOutlined />}>Thêm Tính Năng</Button>
          </Dropdown>
          
          <Dropdown
            overlay={
              <Menu>
                {packageItem.features.map(featureId => {
                  const feature = featuresList.find(f => f.id === featureId);
                  return feature ? (
                    <Menu.Item 
                      key={featureId}
                      onClick={() => handleUpdatePackageFeatures(
                        packageItem._id, 
                        [featureId], 
                        'remove'
                      )}
                    >
                      {feature.icon} {feature.name}
                    </Menu.Item>
                  ) : null;
                })}
              </Menu>
            }
          >
            <Button icon={<MinusOutlined />}>Xóa Tính Năng</Button>
          </Dropdown>
        </Space>
      </div>
    );
  };

  const renderPackageCard = (packageItem) => {
    const badgeColor = getPackageBadgeColor(packageItem.price);
    const packageTier = 
      packageItem.price <= 100000 ? 'Cơ bản' : 
      packageItem.price <= 300000 ? 'Nâng cao' : 'Cao cấp';
      
    return (
      <Col xs={24} sm={12} lg={8} xl={6} key={packageItem._id}>
        <Badge.Ribbon text={packageTier} color={badgeColor}>
          <Card 
            hoverable
            className="package-card"
            style={{ height: '100%', position: 'relative', overflow: 'hidden' }}
            actions={[
              <Tooltip title="Chỉnh sửa">
                <Button 
                  type="text" 
                  icon={<EditOutlined />} 
                  onClick={() => showModal(packageItem)}
                />
              </Tooltip>,
            ]}
          >
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <Avatar
                size={64}
                icon={<CrownOutlined />}
                style={{ 
                  backgroundColor: badgeColor, 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center' 
                }}
              />
              <Title level={4} style={{ marginTop: 16, marginBottom: 0 }}>
                {packageItem.name}
              </Title>
            </div>
            
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Title level={2} style={{ color: '#1890ff', margin: '0 0 8px 0', fontWeight: 600 }}>
                {packageItem.price.toLocaleString()} VND
              </Title>
              <Space>
                <Tag icon={<CalendarOutlined />} color="green">
                  {packageItem.duration} ngày
                </Tag>
                <Tag icon={<TeamOutlined />} color="geekblue">
                  {packageItem.maxMembers} thành viên
                </Tag>
              </Space>
            </div>
            
            <Divider style={{ margin: '12px 0' }} />
            
            <div>
              <Text strong>Tính năng bao gồm:</Text>
              <ul style={{ padding: '8px 0 0 20px', margin: 0 }}>
                {packageItem.features.map(featureId => (
                  <li key={featureId} style={{ marginBottom: 8, listStyleType: 'none', position: 'relative' }}>
                    <Space>
                      <Text style={{ marginRight: 8 }}>{getFeatureIcon(featureId)}</Text>
                      <Text>{getFeatureName(featureId)}</Text>
                    </Space>
                  </li>
                ))}
              </ul>
            </div>

            {renderFeatureManagement(packageItem)}
          </Card>
        </Badge.Ribbon>
      </Col>
    );
  };
  
  const renderEmptyState = () => (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="Chưa có gói dịch vụ nào"
      style={{ margin: '40px 0' }}
    >
      <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
        Tạo gói đầu tiên
      </Button>
    </Empty>
  );

  return (
    <div className="package-management-container" style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Card className="page-header-card" style={{ marginBottom: 24, borderRadius: 8 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space direction="vertical" size={4}>
              <Title level={2} style={{ margin: 0, fontSize: 24 }}>
                <CrownOutlined style={{ marginRight: 12, color: '#faad14' }} />
                Quản Lý Gói Premium
              </Title>
              <Text type="secondary">
                Quản lý các gói dịch vụ Premium cho người dùng
              </Text>
            </Space>
          </Col>
          <Col>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              size="large"
              onClick={() => showModal()}
            >
              Tạo Gói Mới
            </Button>
          </Col>
        </Row>
      </Card>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Spin size="large" tip="Đang tải..." />
        </div>
      ) : (
        <div>
          {packages.length > 0 ? (
            <Row gutter={[24, 24]}>
              {packages.map(renderPackageCard)}
            </Row>
          ) : (
            renderEmptyState()
          )}
        </div>
      )}

      <Modal
        title={editingPackage ? "Chỉnh Sửa Gói Premium" : "Tạo Gói Premium Mới"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
        destroyOnClose
        style={{ top: 20 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitPackage}
          requiredMark="optional"
        >
          <Form.Item
            name="name"
            label="Tên Gói"
            rules={[{ required: true, message: 'Vui lòng nhập tên gói!' }]}
          >
            <Input placeholder="Ví dụ: Gói Gia Đình Cơ Bản" prefix={<CrownOutlined style={{ color: '#d9d9d9' }} />} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Giá (VND)"
                rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Ví dụ: 200000"
                  min={0}
                  step={10000}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duration"
                label="Thời Hạn (ngày)"
                rules={[{ required: true, message: 'Vui lòng nhập thời hạn!' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="Ví dụ: 30"
                  min={1}
                  addonAfter="Ngày"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="maxMembers"
            label="Số Lượng Thành Viên Tối Đa"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng thành viên!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="Ví dụ: 10"
              min={1}
              addonAfter="Người"
            />
          </Form.Item>

          <Form.Item
            name="features"
            label="Tính Năng Bao Gồm"
            rules={[{ required: true, message: 'Vui lòng chọn ít nhất một tính năng!' }]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn các tính năng cho gói này"
              style={{ width: '100%' }}
              optionLabelProp="label"
            >
              {featuresList.map(feature => (
                <Option 
                  key={feature.id} 
                  value={feature.id} 
                  label={feature.name}
                >
                  <Space>
                    <span role="img" aria-label={feature.name}>
                      {feature.icon}
                    </span>
                    {feature.name}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button onClick={handleCancel}>
                Hủy
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {editingPackage ? 'Cập Nhật' : 'Tạo Gói'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <style jsx global>{`
        .package-card {
          transition: all 0.3s;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .package-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .ant-ribbon.ant-ribbon-placement-end {
          right: -10px;
          top: 8px;
          height: 24px;
          padding: 0 10px;
          font-size: 12px;
          line-height: 24px;
        }
      `}</style>
    </div>
  );
};

export default ManagePackages;