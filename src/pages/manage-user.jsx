import React, { useState, useEffect } from "react";
import MTable from "../components/m-table";
import { message, Spin } from "antd";
import { UserService } from "../services/user.service";

const ManageUser = () => {
  const [dataUser, setDataUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const asyncDataUser = async () => {
    try {
      setIsLoading(true);
      const response = await UserService.getAllUsers();
      setDataUser(response);
    } catch (error) {
      message.error("Lỗi xảy ra khi tải dữ liệu");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (userId) => {
    try {
      setIsLoading(true);
      await UserService.deleteUser(userId);
      asyncDataUser();
      message.success("Xóa thành công");
    } catch (error) {
      message.error("Lỗi hệ thống khi xóa");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    asyncDataUser();
  }, []);
  const columns = [
    {
      title: "Họ và Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Ngày Tham Gia",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "5px" }}>
          {/* <button
            style={{
              background: "#d4a118",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            🚫 Cấm
          </button> */}
          <button
            style={{
              background: "#d63031",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
            onClick={() => handleDelete(record._id)}
          >
            🗑️ Xóa
          </button>
        </div>
      ),
    },
  ];
  return (
    <Spin spinning={isLoading}>
      <MTable
        isSearch={true}
        headerName={"Người dùng"}
        columns={columns}
        data={dataUser}
      />
    </Spin>
  );
};

export default ManageUser;
