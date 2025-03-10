import React from "react";
import { Card, Avatar, Typography, List, Tooltip } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const InfoPerson = () => {
  const userInfo = {
    name: "Jack 5 Củ",
    role: "Ca Sĩ",
    location: "Bến Tre, Việt Nam",
    dob: "08/02/1990",
    account: "Premium",
    groups: "2 Nhóm gia đình",
    bio: "Thiên lý ai đi em có thể ở lại bên tôi. Sông gió duyên phận...",
    avatar:
      "https://i.pinimg.com/736x/6e/af/1a/6eaf1a844ae4b6fa6eeb6ff17f468cc0.jpg",
  };

  const posts = [
    {
      id: 1,
      group: "Đom Đóm",
      content: "Tình cha như nước con sống dài.",
      comments: [
        {
          id: 1,
          user: "Fin",
          text: "Anh cho em bánh mì",
          avatar:
            "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-hai-huoc-cam-dep-duoi-ai-do.jpg?1704789789335",
        },
        {
          id: 2,
          user: "Arun",
          text: "Em thích câu này.",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEJYIpFHv0duRFHRU0gCB09mkIg9-zhWcnqw&s",
        },
      ],
    },
    {
      id: 2,
      group: "An An",
      content: "Hôm nay mọi người thế nào",
      comments: [
        {
          id: 1,
          user: "Fin",
          text: "Nay ăn cơm với cá",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPA5iWVI65pstaSXnv0S_w2_oqY2kGG2fPCQ&s",
        },
        {
          id: 2,
          user: "Arun",
          text: "Nay đi học mệt.",
          avatar:
            "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223",
        },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: "100%", margin: "auto", padding: 20 }}>
      <div style={{ marginBottom: 30 }}>
        <h2>Thông tin người dùng</h2>
      </div>
      <Card>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar size={80} src={userInfo.avatar} />
          <div style={{ marginLeft: 20 }}>
            <Title level={4}>{userInfo.name}</Title>
            <Text>{userInfo.role}</Text>
            <br />
            <Text>{userInfo.location}</Text> | <Text>{userInfo.dob}</Text>
            <br />
            <Text>Tài Khoản: {userInfo.account}</Text> |{" "}
            <Text>{userInfo.groups}</Text>
          </div>
        </div>
      </Card>

      <Card style={{ marginTop: 20 }}>
        <Title level={5}>Châm ngôn sống:</Title>
        <Text>
          Gia đình là tổ ấm mà tôi trân trọng, không gì trên cuộc đời này có thể
          sánh bằng...
        </Text>
      </Card>

      {posts.map((post) => (
        <Card key={post.id} style={{ marginTop: 20 }}>
          <Title level={5}>
            {userInfo.name} đăng trong gia đình {post.group}
          </Title>
          <Text>{post.content}</Text>
          <div style={{ marginTop: 10 }}>
            <Tooltip title="Like">
              <LikeOutlined style={{ marginRight: 8 }} />
            </Tooltip>
            <Tooltip title="Comment">
              <MessageOutlined style={{ marginRight: 8 }} />
            </Tooltip>
            <Tooltip title="Favorite">
              <StarOutlined />
            </Tooltip>
          </div>
          <List
            dataSource={post.comments}
            renderItem={(comment) => (
              <div
                style={{ display: "flex", alignItems: "center", marginTop: 10 }}
              >
                <Avatar size={40} src={comment.avatar} />
                <div style={{ marginLeft: 10 }}>
                  <Text strong>{comment.user}</Text>
                  <br />
                  <Text>{comment.text}</Text>
                </div>
              </div>
            )}
          />
        </Card>
      ))}
    </div>
  );
};

export default InfoPerson;
