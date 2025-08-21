import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { chatContext } from "../context/ContextApi";
import {
  getSender,
  getSenderImage,
  getSenderImageType,
} from "../../config/ChatLogic";

const MyChats = ({ fetchAgain }) => {
  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    notifications,
    setNotifications,
  } = useContext(chatContext);
  const [loggeduser, setLoggedUser] = useState();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const { data } = await axios.get(
          `http://localhost:8000/api/chats`,
          config
        );
        setChats(data);
      } catch (err) {
        console.error("Error fetching chats:", err);
      }
    };

    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  const handleSelectedChat = (chat) => {
    setSelectedChat(chat);
    setNotifications(notifications.filter((n) => n.chat._id !== chat._id));
  };

  return (
    <Box>
      {chats?.map((chat) => (
        <Card
          key={chat._id}
          // onClick={() => setSelectedChat(chat)}
          onClick={() => handleSelectedChat(chat)}
          sx={{ cursor: "pointer", mb: 1, boxShadow: "none" }}
        >
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={
                chat.isGroupChat
                  ? undefined
                  : `data:${getSenderImageType(
                      loggeduser,
                      chat.users
                    )};base64,${getSenderImage(loggeduser, chat.users)}`
              }
            />
            <Typography>
              {!chat.isGroupChat
                ? getSender(loggeduser, chat.users)
                : chat.chatName}
            </Typography>
            {notifications.some((n) => n.chat._id === chat._id) && (
              <span
                style={{
                  color: "black",
                  marginLeft: "auto",
                  fontWeight: "bold",
                }}
              >
                •
              </span>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MyChats;
