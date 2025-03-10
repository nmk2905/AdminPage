import React, { useState, useEffect } from "react";
import MTable from "../components/m-table";
import axios from "axios";

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, id: null });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://platform-family.onrender.com/report");
      
      if (response.data.ok) {
        const formattedData = response.data.data.map((item) => ({
          key: item._id,
          reporter: item.userReport.name,
          violator: item.userViolation.name,
          reason: item.reason,
          reportId: item._id,
          createdAt: new Date(item.createdAt).toLocaleString('vi-VN')
        }));
        
        setReports(formattedData);
      } else {
        showNotification("Không thể tải dữ liệu báo cáo", "error");
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      showNotification("Đã xảy ra lỗi khi tải dữ liệu", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const openConfirmDialog = (id) => {
    setConfirmDialog({ isOpen: true, id });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ isOpen: false, id: null });
  };

  const handleDelete = async (id) => {
    closeConfirmDialog();
    try {
      const response = await axios.delete(`https://platform-family.onrender.com/report/delete/${id}`);
      
      if (response.data && response.data.ok) {
        showNotification("Xóa báo cáo thành công", "success");
        setReports(reports.filter(report => report.key !== id));
      } else {
        showNotification("Không thể xóa báo cáo", "error");
      }
    } catch (error) {
      console.error("Lỗi khi xóa báo cáo:", error);
      showNotification("Đã xảy ra lỗi khi xóa báo cáo", "error");
    }
  };

  const columns = [
    {
      title: "Người Dùng Tố Cáo",
      dataIndex: "reporter",
      key: "reporter",
      render: (text) => (
        <div style={styles.userCell}>
          <div style={styles.avatar}>{text.charAt(0).toUpperCase()}</div>
          <span>{text}</span>
        </div>
      )
    },
    {
      title: "Người Dùng Vi Phạm",
      dataIndex: "violator",
      key: "violator",
      render: (text) => (
        <div style={styles.userCell}>
          <div style={{...styles.avatar, backgroundColor: "#e74c3c"}}>{text.charAt(0).toUpperCase()}</div>
          <span>{text}</span>
        </div>
      )
    },
    {
      title: "Lý Do",
      dataIndex: "reason",
      key: "reason",
      render: (text) => (
        <div style={styles.reasonTag}>{text}</div>
      )
    },
    {
      title: "Thời Gian Báo Cáo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <div style={styles.timeCell}>
          <div style={styles.timeIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span>{text}</span>
        </div>
      )
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <div style={styles.actionCell}>
          <button
            style={styles.deleteButton}
            onClick={() => openConfirmDialog(record.reportId)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Xóa</span>
          </button>
        </div>
      ),
    },
  ];

  // Styles
  const styles = {
    pageContainer: {
      padding: "20px",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
    },
    header: {
      marginBottom: "30px",
      borderBottom: "1px solid #e9ecef",
      paddingBottom: "15px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#343a40",
      margin: "0 0 5px 0",
    },
    subtitle: {
      fontSize: "14px",
      color: "#6c757d",
    },
    userCell: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    avatar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      backgroundColor: "#3498db",
      color: "white",
      fontWeight: "bold",
      fontSize: "14px",
    },
    reasonTag: {
      display: "inline-block",
      padding: "4px 8px",
      backgroundColor: "#e9f3fe",
      color: "#2c79c1",
      borderRadius: "4px",
      fontSize: "13px",
      fontWeight: "500",
    },
    timeCell: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#6c757d",
      fontSize: "13px",
    },
    timeIcon: {
      display: "flex",
      alignItems: "center",
    },
    actionCell: {
      display: "flex",
      gap: "8px",
    },
    deleteButton: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      backgroundColor: "#fff",
      border: "1px solid #dc3545",
      color: "#dc3545",
      padding: "6px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontSize: "13px",
    },
    notification: {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "12px 20px",
      borderRadius: "6px",
      zIndex: 1000,
      opacity: notification.message ? 1 : 0,
      transition: "opacity 0.3s ease",
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      fontSize: "14px",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
      display: confirmDialog.isOpen ? "flex" : "none",
      justifyContent: "center",
      alignItems: "center",
      animation: "fadeIn 0.2s ease",
    },
    modal: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "25px",
      width: "400px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      animation: "slideIn 0.3s ease",
    },
    modalHeader: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "15px",
      color: "#343a40",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    modalIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: "#fff4f4",
      color: "#dc3545",
    },
    modalMessage: {
      marginBottom: "25px",
      color: "#6c757d",
      fontSize: "14px",
      lineHeight: "1.5",
    },
    modalActions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
    },
    cancelButton: {
      padding: "8px 16px",
      borderRadius: "4px",
      border: "1px solid #dee2e6",
      backgroundColor: "#fff",
      color: "#495057",
      cursor: "pointer",
      fontWeight: "500",
      fontSize: "14px",
      transition: "all 0.2s ease",
    },
    confirmButton: {
      padding: "8px 16px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#dc3545",
      color: "white",
      cursor: "pointer",
      fontWeight: "500",
      fontSize: "14px",
      transition: "all 0.2s ease",
    },
    alertBox: {
      marginBottom: "20px",
      padding: "12px 16px",
      backgroundColor: "#fff8e8",
      border: "1px solid #ffe5b4",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    alertIcon: {
      color: "#f6c000",
    },
    alertText: {
      color: "#664d03",
      fontSize: "14px",
    },
    refresh: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      backgroundColor: "#f8f9fa",
      border: "1px solid #ced4da",
      borderRadius: "4px",
      padding: "6px 12px",
      cursor: "pointer",
      fontSize: "14px",
      color: "#495057",
      transition: "all 0.2s ease",
      marginBottom: "15px",
    },
  };

  // Đặt màu cho notification theo loại
  const getNotificationStyle = () => {
    let style = {...styles.notification};
    
    if (notification.type === "success") {
      style.backgroundColor = "#28a745";
    } else if (notification.type === "error") {
      style.backgroundColor = "#dc3545";
    } else if (notification.type === "info") {
      style.backgroundColor = "#17a2b8";
    }
    
    return style;
  };

  return (
    <div style={styles.pageContainer}>
      {/* Thông báo */}
      {notification.message && (
        <div style={getNotificationStyle()}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {notification.type === "success" ? (
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            ) : (
              <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </svg>
          {notification.message}
        </div>
      )}

      {/* Dialog xác nhận xóa */}
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <div style={styles.modalHeader}>
            <div style={styles.modalIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>Xác nhận xóa</span>
          </div>
          <div style={styles.modalMessage}>
            Bạn có chắc chắn muốn xóa báo cáo này không? Hành động này không thể hoàn tác.
          </div>
          <div style={styles.modalActions}>
            <button 
              style={styles.cancelButton} 
              onClick={closeConfirmDialog}
            >
              Hủy bỏ
            </button>
            <button 
              style={styles.confirmButton} 
              onClick={() => handleDelete(confirmDialog.id)}
            >
              Xác nhận xóa
            </button>
          </div>
        </div>
      </div>

      <div style={styles.header}>
        <h2 style={styles.title}>Quản Lý Báo Cáo Vi Phạm</h2>
        <p style={styles.subtitle}>Kiểm duyệt và xử lý báo cáo vi phạm do người dùng tố cáo</p>
      </div>

      <button style={styles.refresh} onClick={fetchReports}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4V9H4.58152M19.9381 11C19.446 7.05369 16.0796 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.2317 17.9318 15.3574 20 12 20C7.92038 20 4.55399 16.9463 4.06189 13M19.4185 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Làm mới dữ liệu
      </button>

      <div style={styles.alertBox}>
        <div style={styles.alertIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0378 2.66667 10.268 4L3.33978 16C2.56998 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={styles.alertText}>
          Lý do vi phạm phải hợp lệ, kiểm duyệt thật kỹ báo cáo trước khi xử lý.
        </div>
      </div>

      <MTable
        columns={columns}
        data={reports}
        loading={loading}
      />
    </div>
  );
};

export default ManageReports;