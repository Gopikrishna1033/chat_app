import React, { useContext, useEffect, useState } from "react";
import { chatContext } from "../context/ContextApi";
import axios from "axios";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { getSender, getSenderImage, getSenderImageType } from "../../config/ChatLogic";
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
    <>
      {selectedChat && (
      <Box>
        {chats.map((chat) => (
          <Card
            key={chat._id}
            onClick={() => setSelectedChat(chat)}
            sx={{
              cursor: "pointer",
              mb: 1,
              boxShadow:"none"
            }}
          >
            <CardContent
              sx={{ display: "flex", alignItems: "center", gap: "15px" }}
            >
              <Avatar
                src={`data:${getSenderImageType(
                  loggeduser,
                  chat.users
                )};base64,${getSenderImage(loggeduser, chat.users)}`}
              />
              <Typography color="black" sx={{ fontSize: "16px" }}>
                {" "}
                {!chat.isGroupChat
                  ? getSender(loggeduser, chat.users)
                  : chat.chatName}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
       )} 
      {/* {selectedChat && (
        <Card
          key={selectedChat._id}
          sx={{
            cursor: "pointer",
            mb: "10px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <CardContent
            sx={{ display: "flex", alignItems: "center", gap: "15px" }}
          >
            <Avatar
              src={`data:${getSenderImageType(
                loggeduser,
                selectedChat.users
              )};base64,${getSenderImage(loggeduser, selectedChat.users)}`}
            />
            <Typography color="black" sx={{ fontSize: "18px" }}>
              {!selectedChat.isGroupChat
                ? getSender(loggeduser, selectedChat.users)
                : selectedChat.chatName}
            </Typography>
          </CardContent>
        </Card>
      )} */}
    </>
  );
};

export default MyChats;
