import React, { useContext, useEffect, useState } from "react";
import { chatContext } from "../context/ContextApi";
import axios from "axios";
import { Avatar, Box, Card, CardContent } from "@mui/material";
import { getSender } from "../../config/ChatLogic";
const MyChats = () => {
  const usecontext = useContext(chatContext);
  const { selectedChat, setSelectedChat, user, chats, setChats } = usecontext;
  const [loggeduser, setLoggedUser] = useState();
  const headers = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/chats`, headers);
        const data = res?.data;
        setChats(data);
      } catch (err) {
        console.log("Error fetching chats:", err);
      }
    };
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
    <>{selectedChat &&
      <Box>
        {chats.map((chat) => (
          <Card
            key={chat._id}
            onClick={() => setSelectedChat(chat)}
            sx={{
              cursor: "pointer",
            }}
          >
            <CardContent>
              {!chat.isGroupChat
                ? getSender(loggeduser, chat.users)
                : chat.chatName}
            </CardContent>
          </Card>
        ))}
      </Box>}
    </>
  );
};

export default MyChats;
