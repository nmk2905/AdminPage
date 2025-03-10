import React from "react";
import MTable from "../components/m-table";

const ManagePosts = () => {
  const columns = [
    {
      title: "Người Dùng",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Nội Dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Nhóm Gia Đình",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Phê Duyệt",
      key: "approval",
      render: (_, record) => (
        <>
          <div style={{ display: "flex", gap: "5px" }}>
            <button
              style={{
                background: "#d4a118",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              📄 Duyệt
            </button>
            <button
              style={{
                background: "#d63031",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              🗑️ Xóa
            </button>
          </div>
        </>
      ),
    },
  ];
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
      <div style={{ marginBottom: 30 }}>
        <h2>Quản lý bài đăng</h2>
        <small>Kiểm duyệt nội dung cho bài đăng</small>
      </div>
      <MTable
        noteAlert={
          "Nội dung phải hợp lệ , kiểm duyệt thật kĩ nội dung trước khi phê duyệt."
        }
        isAlert={true}
        columns={columns}
        data={data}
      />
    </>
  );
};

export default ManagePosts;
