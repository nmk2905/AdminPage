import React from "react";
import MTable from "../components/m-table";

const ManageModerators = () => {
  const columns = [
    {
      title: "Họ Và Tên",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Giới Tính",
      dataIndex: "gender",
      key: "gender",
      filters: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" },
      ],
    },
    {
      title: "Ngày Sinh",
      dataIndex: "dob",
      key: "dob",
      sorter: true,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span
          style={{
            color: text === "Đang Hoạt Động" ? "green" : "red",
            background: text === "Đang Hoạt Động" ? "#e6f7e6" : "#ffe6e6",
            padding: "4px 8px",
            borderRadius: "8px",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Ngày Vào Làm",
      dataIndex: "startDate",
      key: "startDate",
      sorter: true,
    },
    {
      title: "Hành Động",
      key: "action",
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
              🚫 Cấm
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
      name: "Lê Bảo",
      gender: "Female",
      dob: "06/08/1980",
      status: "Đang Hoạt Động",
      startDate: "07/01/2024",
    },
    {
      key: "2",
      name: "Nguyễn Văn A",
      gender: "Male",
      dob: "08/02/1990",
      status: "Không Hoạt Động",
      startDate: "07/02/2024",
    },
    {
      key: "3",
      name: "Nguyễn Văn B",
      gender: "Female",
      dob: "08/03/1999",
      status: "Đang Hoạt Động",
      startDate: "07/02/2024",
    },
    {
      key: "4",
      name: "Nguyễn Văn C",
      gender: "Female",
      dob: "05/07/2000",
      status: "Không Hoạt Động",
      startDate: "07/02/2024",
    },
    {
      key: "5",
      name: "Nguyễn Văn D",
      gender: "Female",
      dob: "09/04/2001",
      status: "Không Hoạt Động",
      startDate: "19/01/2024",
    },
    {
      key: "6",
      name: "Nguyễn Văn M",
      gender: "Male",
      dob: "01/15/2003",
      status: "Đang Hoạt Động",
      startDate: "08/03/2024",
    },
    {
      key: "7",
      name: "Nguyễn Văn O",
      gender: "Male",
      dob: "07/11/1994",
      status: "Đang Hoạt Động",
      startDate: "20/05/2024",
    },
  ];

  return (
    <>
      <MTable
        isSearch={true}
        headerName={"Người kiểm duyệt"}
        columns={columns}
        data={data}
      />
    </>
  );
};

export default ManageModerators;
