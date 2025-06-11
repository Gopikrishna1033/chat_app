import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCallIcon from "@mui/icons-material/AddCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SendIcon from "@mui/icons-material/Send";
import { debounce } from "lodash";

import {
  AppBar,
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { chatContext } from "../context/ContextApi";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const userContext = useContext(chatContext);
  const navigate = useNavigate();
  const { user } = userContext;

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [chats, setChats] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [recentChats, setRecentChats] = useState([]);
  const [messageText, setMessageText] = useState("");

  const headers = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
 
  // Debounced search
  const handleSearch = async (value) => {
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/api/user?search=${value}`,
        headers
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  const handleSearchText = (event) => {
    const value = event.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const response = await axios.post(
        `http://localhost:8000/api/chats/`,
        { userId },
        headers
      );
      const chat = response?.data;

      setSelectedChat(chat);
      setLoadingChat(false);

      // Add to recent chats if not already present
      setRecentChats((prev) => {
        const alreadyExists = prev.find((c) => c._id === chat._id);
        return alreadyExists ? prev : [chat, ...prev];
      });
    } catch (error) {
      console.log(error);
      setLoadingChat(false);
    }
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    // Replace with actual message-sending logic
    console.log("Send message:", messageText);
    setMessageText("");
  };

  const getChatName = () => {
    if (!selectedChat || !selectedChat.users) return "Welcome";
    const otherUser = selectedChat.users.find((u) => u._id !== user._id);
    return otherUser?.name || "Chat";
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        background: "#FAFAFA",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: "23vw",
          borderRight: "1px solid #ccc",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            padding: "10px",
            justifyContent: "center",
            background: "#fff",
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">
              <Box
                component="span"
                sx={{ color: "#1976D2", fontWeight: "bold" }}
              >
                Nex
              </Box>
              <Box
                component="span"
                sx={{ color: "#f44336", fontWeight: "bold" }}
              >
                Talk
              </Box>
            </Typography>
            <IconButton onClick={logout}>
              <LogoutIcon sx={{ color: "#f44336" }} />
            </IconButton>
          </Box>

          <TextField
            fullWidth
            placeholder="Search"
            onChange={handleSearchText}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "50px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                height: "2.75em",
                "& fieldset": { border: "none" },
                "&.Mui-focused fieldset": { border: "1px solid #ccc" },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

          {searchText.trim()
            ? searchResults?.map((data, index) => (
                <Card
                  sx={{ width: "100%", boxShadow: "none", cursor: "pointer" }}
                  key={index}
                  onClick={() => accessChat(data?._id)}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      gap: "15px",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={`data:${data?.imageType};base64,${data?.image}`}
                    />
                    <Typography>
                      {data?.name} {data?._id === user?._id ? "(You)" : ""}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            : recentChats.map((data) => {
                {
                  <Card
                    sx={{ width: "100%", boxShadow: "none", cursor: "pointer" }}
                    onClick={() => accessChat(user?._id)}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src={`data:${user?.imageType};base64,${user?.image}`}
                      />
                      <Typography>{user?.name} (You)</Typography>
                    </CardContent>
                    {console.log(data)}
                  </Card>;
                }
              })}
        </Box>
      </Box>

      {/* Main Chat Window */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F0F4F8",
        }}
      >
        <AppBar
          position="static"
          sx={{ background: "white", boxShadow: "none", p: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <Avatar />
              <Typography color="black" sx={{ fontSize: "18px" }}>
                hella
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <AddCallIcon sx={{ cursor: "pointer", color: "grey" }} />
              <VideoCallIcon sx={{ cursor: "pointer", color: "grey" }} />
            </Box>
          </Box>
        </AppBar>

        <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
          <Typography>Welcome to the chat!</Typography>
        </Box>

        <Box sx={{ padding: "0px 30px 30px 30px" }}>
          <TextField
            fullWidth
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              background: "#FAFAFA",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                height: "3rem",
                "& fieldset": { border: "none" },
                "&.Mui-focused fieldset": { border: "1px solid #ccc" },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSendMessage}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
