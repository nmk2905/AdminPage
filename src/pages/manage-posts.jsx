import React, { useEffect, useState } from "react";
import MTable from "../components/m-table";
import { message, Spin, Tag } from "antd";
import { PostService } from "../services/post.service";

const ManagePosts = () => {
  const [dataPosts, setDataPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const asyncDataUser = async () => {
    try {
      setIsLoading(true);
      const response = await PostService.getAllPosts();
      setDataPosts(response);
    } catch (error) {
      message.error("Lỗi xảy ra khi tải dữ liệu");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (postId) => {
    try {
      setIsLoading(true);
      await PostService.deletePost(postId);
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
      title: "Người Dùng",
      dataIndex: "author",
      key: "author",
      render: (item) => <p>{item?.name}</p>,
    },
    {
      title: "Nội Dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Nhóm Gia Đình",
      dataIndex: "family",
      key: "family",
      render: (item) => <p>{item?.name}</p>,
    },
    {
      title: "Trạng thái",
      dataIndex: "isPrivate",
      key: "isPrivate",
      render: (item) => (
        <Tag color={item ? "success" : "error"}>
          {item ? "Private" : "Public"}
        </Tag>
      ),
    },
    {
      title: "Phê Duyệt",
      key: "approval",
      render: (_, record) => (
        <>
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
              📄 Duyệt
            </button> */}
            <button
              style={{
                background: "#d63031",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
              onClick={() => handleDelete(record.postId)}
            >
              🗑️ Xóa
            </button>
          </div>
        </>
      ),
    },
  ];

  return (
    <Spin spinning={isLoading}>
      <div style={{ marginBottom: 30 }}>
        <h2>Quản lý bài đăng</h2>
        <small>Kiểm duyệt nội dung cho bài đăng</small>
      </div>
      <MTable
        noteAlert={"Nội dung phải hợp lệ , kiểm duyệt thật kĩ nội dung."}
        isAlert={true}
        columns={columns}
        data={dataPosts}
      />
    </Spin>
  );
};

export default ManagePosts;
