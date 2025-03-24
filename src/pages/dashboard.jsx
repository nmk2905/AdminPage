import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const server_url = "https://platform-family.onrender.com";
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateError, setDateError] = useState("");

  const fetchData = async () => {
    // Kiểm tra xem người dùng đã chọn cả ngày bắt đầu và ngày kết thúc chưa
    if (!startDate || !endDate) {
      setDateError("Vui lòng chọn cả ngày bắt đầu và ngày kết thúc!");
      return;
    }
    
    // Kiểm tra ngày kết thúc không được trước ngày bắt đầu
    if (new Date(endDate) < new Date(startDate)) {
      setDateError("Ngày kết thúc không được trước ngày bắt đầu!");
      return;
    }

    setDateError("");
    setLoading(true);
    try {
      const response = await axios.post(`${server_url}/dashboard`, {
        startDate,
        endDate,
      });

      if (response.data.ok) {
        setDashboardData(response.data.data);
      } else {
        setError("Đã xảy ra lỗi khi lấy dữ liệu!");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi kết nối với server!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Tổng quan hệ thống</h1>
        
        {/* Date Range Selector */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Chọn khoảng thời gian</h2>
          <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col">
              <label htmlFor="startDate" className="mb-1 text-sm font-medium text-gray-700">
                Từ ngày
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="endDate" className="mb-1 text-sm font-medium text-gray-700">
                Đến ngày
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Xem dữ liệu
            </button>
          </form>
          {dateError && (
            <p className="mt-2 text-red-600 text-sm">{dateError}</p>
          )}
        </div>

        {/* Initial State - No data yet */}
        {!loading && !dashboardData && !error && (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600">Vui lòng chọn khoảng thời gian và nhấn "Xem dữ liệu" để xem thông tin</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}

        {/* Dashboard Data */}
        {!loading && dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Posts */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">
                Tổng số bài viết
              </h3>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.totalPost}</p>
            </div>

            {/* New Posts */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">
                Bài viết mới
              </h3>
              <p className="text-3xl font-bold text-green-600">{dashboardData.totalNewPost}</p>
            </div>

            {/* New Registrations */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">
                Đăng ký mới
              </h3>
              <p className="text-3xl font-bold text-blue-600">{dashboardData.newRegistrationsCount}</p>
            </div>
          </div>
        )}

        {/* Revenue Section */}
        {!loading && dashboardData && dashboardData.revenue && dashboardData.revenue.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Doanh thu</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thời gian
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số tiền
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboardData.revenue.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.amount.toLocaleString('vi-VN')} VNĐ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Revenue Data */}
        {!loading && dashboardData && (!dashboardData.revenue || dashboardData.revenue.length === 0) && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Doanh thu</h2>
            <p className="text-gray-500 italic">Không có dữ liệu doanh thu trong khoảng thời gian này</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;