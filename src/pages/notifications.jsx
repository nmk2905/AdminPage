import React from "react";

const notifications = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    title: "Tố Cáo Vi Phạm",
    time: "35 mins ago",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    title: "Tố Cáo Vi Phạm",
    time: "45 mins ago",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    name: "Nguyễn Văn C",
    title: "Tố Cáo Vi Phạm",
    time: "50 mins ago",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: 4,
    name: "Nguyễn Văn V",
    title: "Tố Cáo Vi Phạm",
    time: "54 mins ago",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    id: 5,
    name: "Nguyễn Văn S",
    title: "Tố Cáo Vi Phạm",
    time: "58 mins ago",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: 6,
    name: "Nguyễn Văn W",
    title: "Tố Cáo Vi Phạm",
    time: "1 hour ago",
    avatar: "https://i.pravatar.cc/40?img=6",
  },
  {
    id: 7,
    name: "Nguyễn Văn P",
    title: "Tố Cáo Vi Phạm",
    time: "1 hour ago",
    avatar: "https://i.pravatar.cc/40?img=7",
  },
  {
    id: 8,
    name: "Nguyễn Văn Q",
    title: "Tố Cáo Vi Phạm",
    time: "2 hours ago",
    avatar: "https://i.pravatar.cc/40?img=8",
  },
  {
    id: 9,
    name: "Nguyễn Văn G",
    title: "Tố Cáo Vi Phạm",
    time: "3 hours ago",
    avatar: "https://i.pravatar.cc/40?img=9",
  },
  {
    id: 10,
    name: "Nguyễn Văn Y",
    title: "Tố Cáo Vi Phạm",
    time: "4 hours ago",
    avatar: "https://i.pravatar.cc/40?img=10",
  },
];

const Notifications = () => {
  return (
    <div style={{ maxWidth: "100%", margin: "auto", padding: "20px" }}>
      <h2 style={{ marginBottom: 20 }}>Thông báo ({notifications.length})</h2>
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: 20,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        {notifications.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <input type="checkbox" style={{ marginRight: 10 }} />
            <img
              src={item.avatar}
              alt={item.name}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 15,
              }}
            />
            <div style={{ flex: 1 }}>
              <strong>{item.title}</strong>
              <p style={{ margin: 0, fontSize: "0.9em", color: "#666" }}>
                {item.name}
              </p>
            </div>
            <span style={{ fontSize: "0.8em", color: "#999" }}>
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
