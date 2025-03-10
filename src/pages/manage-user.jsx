import React from "react";
import MTable from "../components/m-table";

const ManageUser = () => {
  const columns = [
    {
      title: "Họ và Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Giới Tính",
      dataIndex: "gender",
      key: "gender",
      filters: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" },
      ],
      onFilter: (value, record) => record.gender === value,
    },
    {
      title: "Ngày Sinh",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          style={{
            color: status === "Đang Hoạt Động" ? "green" : "red",
            background: status === "Đang Hoạt Động" ? "#e6f7e6" : "#ffe6e6",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Ngày Tham Gia",
      dataIndex: "joinDate",
      key: "joinDate",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
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
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "Phan Thị Diệu Hà",
      gender: "Female",
      dob: "06/08/1980",
      status: "Đang Hoạt Động",
      joinDate: "07/08/2024",
    },
    {
      key: "2",
      name: "Jack 5 Cú",
      gender: "Male",
      dob: "08/02/1990",
      status: "Không Hoạt Động",
      joinDate: "07/02/2024",
    },
    {
      key: "3",
      name: "Leslie Alexander",
      gender: "Female",
      dob: "08/03/1999",
      status: "Đang Hoạt Động",
      joinDate: "07/05/2024",
    },
    {
      key: "4",
      name: "Courtney Henry",
      gender: "Female",
      dob: "05/07/2000",
      status: "Không Hoạt Động",
      joinDate: "07/02/2024",
    },
    {
      key: "5",
      name: "Eleanor Pena",
      gender: "Male",
      dob: "05/07/2002",
      status: "Đang Hoạt Động",
      joinDate: "07/02/2024",
    },
    {
      key: "6",
      name: "Guy Hawkins",
      gender: "Female",
      dob: "09/04/2001",
      status: "Không Hoạt Động",
      joinDate: "19/07/2024",
    },
    {
      key: "7",
      name: "Brooklyn Simmons",
      gender: "Male",
      dob: "15/01/2003",
      status: "Đang Hoạt Động",
      joinDate: "08/04/2024",
    },
    {
      key: "8",
      name: "Darlene Robertson",
      gender: "Female",
      dob: "31/01/1992",
      status: "Không Hoạt Động",
      joinDate: "05/10/2024",
    },
    {
      key: "9",
      name: "Jerome Bell",
      gender: "Male",
      dob: "11/07/1994",
      status: "Đang Hoạt Động",
      joinDate: "20/06/2024",
    },
    {
      key: "10",
      name: "Bessie Cooper",
      gender: "Female",
      dob: "12/08/1998",
      status: "Không Hoạt Động",
      joinDate: "27/08/2024",
    },
  ];

  return (
    <div>
      <MTable
        isSearch={true}
        headerName={"Người dùng"}
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default ManageUser;
