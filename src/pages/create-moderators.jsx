import React from "react";
import { Form, Input, Button, Upload, Card, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CreateModerators = () => {
  return (
    <div style={{ maxWidth: "100%", margin: "auto", padding: "20px" }}>
      <div style={{ marginBottom: 20 }}>
        <h2>Thêm người kiểm duyệt</h2>
      </div>

      {/* Thông tin cá nhân */}
      <Card title="THÔNG TIN CÁ NHÂN" style={{ marginBottom: 20 }}>
        <Form layout="vertical">
          <Form.Item label="Họ Và Tên" name="fullName">
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item label="Ngày Vào Làm" name="startDate">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Chức Vụ" name="position">
            <Input placeholder="Nhập chức vụ" />
          </Form.Item>

          <Form.Item label="Địa Chỉ" name="address">
            <Input.TextArea rows={3} placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item label="Hình 3x4" name="image">
            <Upload>
              <Button icon={<UploadOutlined />}>Chọn File Hình</Button>
            </Upload>
          </Form.Item>

          <Button type="primary">Lưu</Button>
        </Form>
      </Card>

      {/* Thông tin đăng nhập */}
      <Card title="THÔNG TIN ĐĂNG NHẬP">
        <Form layout="vertical">
          <Form.Item label="Tên Đăng Nhập" name="username">
            <Input placeholder="Nhập tên đăng nhập" />
          </Form.Item>

          <Form.Item label="Mật Khẩu" name="password">
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item label="Xác Nhận Lại Mật Khẩu" name="confirmPassword">
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          <Button type="primary">Lưu</Button>
        </Form>
      </Card>
    </div>
  );
};

export default CreateModerators;
