<<<<<<< HEAD
import React from "react";
import MTable from "../components/m-table";

const ManagePosts = () => {
  const columns = [
    {
      title: "Người Dùng",
      dataIndex: "user",
      key: "user",
=======
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
>>>>>>> 844e217 (Fix AdminPage)
    },
    {
      title: "Nội Dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Nhóm Gia Đình",
<<<<<<< HEAD
      dataIndex: "group",
      key: "group",
=======
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
>>>>>>> 844e217 (Fix AdminPage)
    },
    {
      title: "Phê Duyệt",
      key: "approval",
      render: (_, record) => (
        <>
          <div style={{ display: "flex", gap: "5px" }}>
<<<<<<< HEAD
            <button
=======
            {/* <button
>>>>>>> 844e217 (Fix AdminPage)
              style={{
                background: "#d4a118",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              📄 Duyệt
<<<<<<< HEAD
            </button>
=======
            </button> */}
>>>>>>> 844e217 (Fix AdminPage)
            <button
              style={{
                background: "#d63031",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
<<<<<<< HEAD
=======
              onClick={() => handleDelete(record.postId)}
>>>>>>> 844e217 (Fix AdminPage)
            >
              🗑️ Xóa
            </button>
          </div>
        </>
      ),
    },
  ];
<<<<<<< HEAD
  const data = [
    {
      key: "1",
      user: "Jack 5 Củ",
      content: "Ăn cơm với canh",
      group: "Đom Đóm",
    },
    {
      key: "2",
      user: "Nguyễn Văn A",
      content: "Đêm nay không say",
      group: "Gia Đình Thân Thương",
    },
    {
      key: "3",
      user: "Nguyễn Văn B",
      content: "Một đêm tình",
      group: "Gia Đình Bộ Đội",
    },
    {
      key: "4",
      user: "Nguyễn Văn C",
      content: "Lo cho em đến già",
      group: "Gia Đình Quân Nhân",
    },
    {
      key: "5",
      user: "Nguyễn Văn D",
      content: "Một đời thương em",
      group: "Sóc Nâu",
    },
    {
      key: "6",
      user: "Nguyễn Văn M",
      content: "IIIIlbaabs",
      group: "Cá Vàng",
    },
    {
      key: "7",
      user: "Nguyễn Văn P",
      content: "Pelusaore",
      group: "Một Lá Cây",
    },
    {
      key: "8",
      user: "Nguyễn Văn U",
      content: "How are you?",
      group: "Thôi Xong",
    },
    {
      key: "9",
      user: "Nguyễn Văn T",
      content: "What time is it?",
      group: "Gia Đình Yêu Thương",
    },
  ];

  return (
    <>
=======

  return (
    <Spin spinning={isLoading}>
>>>>>>> 844e217 (Fix AdminPage)
      <div style={{ marginBottom: 30 }}>
        <h2>Quản lý bài đăng</h2>
        <small>Kiểm duyệt nội dung cho bài đăng</small>
      </div>
      <MTable
<<<<<<< HEAD
        noteAlert={
          "Nội dung phải hợp lệ , kiểm duyệt thật kĩ nội dung trước khi phê duyệt."
        }
        isAlert={true}
        columns={columns}
        data={data}
      />
    </>
=======
        noteAlert={"Nội dung phải hợp lệ , kiểm duyệt thật kĩ nội dung."}
        isAlert={true}
        columns={columns}
        data={dataPosts}
      />
    </Spin>
>>>>>>> 844e217 (Fix AdminPage)
  );
};

export default ManagePosts;
