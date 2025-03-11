import React, { useState } from "react";
import { Alert, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../styles/m-table.css";

const MTable = ({
  noteAlert,
  isAlert,
  isSearch,
  headerName,
  columns,
  data,
}) => {
  const [searchText, setSearchText] = useState("");

  const isMatch = (item, keyword) => {
    if (!keyword) return true;
    const values = Object.values(item).map((val) => String(val).toLowerCase());
    return values.some((val) => val.includes(keyword.toLowerCase()));
  };

  // Lọc data
  const filteredData = data.filter((item) => isMatch(item, searchText));

  return (
    <>
      {isSearch && (
        <div className="search-header-table">
          <span className="name-search">{headerName}</span>
          <div className="search-input">
            <SearchOutlined className="icon-search" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      )}

      {isAlert && (
        <Alert
          style={{ marginBottom: 50 }}
          message={noteAlert}
          type="info"
          showIcon
        />
      )}

      <Table columns={columns} dataSource={filteredData} rowKey="_id" />
    </>
  );
};

export default MTable;
