import React from "react";
import { Typography } from "antd";
import Chatbot from "./Chatbot/Chatbot";
import { RobotOutlined } from "@ant-design/icons";
const { Title } = Typography;

function App() {
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Title level={2}>
          CHAT BOT APP&nbsp;
          <RobotOutlined />
        </Title>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Chatbot />
      </div>
    </div>
  );
}

export default App;
