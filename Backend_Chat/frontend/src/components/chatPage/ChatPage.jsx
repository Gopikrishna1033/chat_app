import React, { useContext, useState } from "react";
import axios from "axios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCallIcon from "@mui/icons-material/AddCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { chatContext } from "../context/ContextApi";
import { useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";
import MyChats from "./MyChats";
const ChatPage = () => {
  const userContext = useContext(chatContext);
  const navigate = useNavigate();
  const { user, setSelectedChat, chats, setChats } = userContext;
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);

  const headers = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const handleSearchText = async (event) => {
    try {
      const value = event.target.value;
      setSearchText(value);

      if (value.trim() === "") {
        setSearchResults([]);
        return;
      }

      const response = await axios.get(
        `http://localhost:8000/api/user?search=${value}`,
        headers
      );
      setSearchResults(response?.data);
    } catch (error) {
      console.error("Search error:", error);
    }
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
      const data = response?.data;
      if (!chats.find((chat) => chat._id === data._id))
        setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100vh",
          background: "#FAFAFA",
        }}
      >
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
                width: "100%",
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
              <IconButton>
                <LogoutIcon sx={{ color: "#f44336" }} onClick={logout} />
              </IconButton>
            </Box>

            <Box>
              <TextField
                fullWidth
                placeholder="search"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchOutlinedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={handleSearchText}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "50px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    height: "2.75em",
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "1px solid #ccc",
                    },
                  },
                }}
              />
            </Box>

            <SearchResults
              filteredChats={searchResults}
              accessChat={accessChat}
            />
            <MyChats />
          </Box>
        </Box>
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
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              p: 2,
            }}
          >
            {/* Chat messages, typing indicators, etc. */}
            {/* Example Placeholder */}
            <Typography>Welcome to the chat!</Typography>
          </Box>
          <Box sx={{ padding: "0px 30px 30px 30px" }}>
            <TextField
              fullWidth
              sx={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                background: "#FAFAFA",
                fontSize: "24px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  height: "3rem",
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #ccc",
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatPage;
