import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:8000/api/chat");
    setChats(response?.data);
  };

  return (
    <>
      <Box>Chat Page</Box>
    </>
  );
};

export default ChatPage;
