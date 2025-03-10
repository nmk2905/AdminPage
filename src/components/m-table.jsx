import React from "react";
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
  return (
    <>
      {isSearch && (
        <div className="search-header-table">
          <span className="name-search">{headerName}</span>
          <div className="search-input">
            <SearchOutlined className="icon-search" />
            <input />
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

      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default MTable;
