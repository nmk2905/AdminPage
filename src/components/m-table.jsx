<<<<<<< HEAD
import React from "react";
import { Alert, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../styles/m-table.css";
=======
import React, { useState } from "react";
import { Alert, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../styles/m-table.css";

>>>>>>> 844e217 (Fix AdminPage)
const MTable = ({
  noteAlert,
  isAlert,
  isSearch,
  headerName,
  columns,
  data,
}) => {
<<<<<<< HEAD
=======
  const [searchText, setSearchText] = useState("");

  const isMatch = (item, keyword) => {
    if (!keyword) return true;
    const values = Object.values(item).map((val) => String(val).toLowerCase());
    return values.some((val) => val.includes(keyword.toLowerCase()));
  };

  // Lọc data
  const filteredData = data.filter((item) => isMatch(item, searchText));

>>>>>>> 844e217 (Fix AdminPage)
  return (
    <>
      {isSearch && (
        <div className="search-header-table">
          <span className="name-search">{headerName}</span>
          <div className="search-input">
            <SearchOutlined className="icon-search" />
<<<<<<< HEAD
            <input />
          </div>
        </div>
      )}
=======
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      )}

>>>>>>> 844e217 (Fix AdminPage)
      {isAlert && (
        <Alert
          style={{ marginBottom: 50 }}
          message={noteAlert}
          type="info"
          showIcon
        />
      )}

<<<<<<< HEAD
      <Table columns={columns} dataSource={data} />
=======
      <Table columns={columns} dataSource={filteredData} rowKey="_id" />
>>>>>>> 844e217 (Fix AdminPage)
    </>
  );
};

export default MTable;
