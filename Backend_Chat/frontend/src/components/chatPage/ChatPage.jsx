import React, { useContext, useState } from "react";
import axios from "axios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddCallIcon from "@mui/icons-material/AddCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SendIcon from "@mui/icons-material/Send";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import AddIcon from "@mui/icons-material/Add";
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
import MenuBox from "./MenuBox";
import {
  getSender,
  getSenderImage,
  getSenderImageType,
} from "../../config/ChatLogic";
const ChatPage = () => {
  const userContext = useContext(chatContext);
  const navigate = useNavigate();
  const { user, setSelectedChat, chats, setChats } = userContext;
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loadingChat, setLoadingChat] = useState(true);
  const [loadChatBox,setLoadChatBox] =  useState(false)

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
      // setLoadingChat(true);
      const response = await axios.post(
        `http://localhost:8000/api/chats/`,
        { userId },
        headers
      );
      const data = response?.data;
      if (!chats.find((chat) => chat._id === data._id))
        setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(!loadingChat);
      setLoadChatBox(!loadChatBox)
    } catch (error) {
      console.log(error);
    }
  };
  const icons = [<AddReactionIcon />, <AddIcon />, <SendIcon />];

  const loggeduser = JSON.parse(localStorage.getItem("userInfo"));
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
              <MenuBox logout={logout} />
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
              loadingChat={loadingChat}
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
            sx={{
              background: "white",
              boxShadow: "none",
              p: 2,
              minHeight: "50px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
                {loadChatBox &&(
                  chats.map((chat, index) => {
                    const senderImageType = getSenderImageType(loggeduser, chat.users);
                    const senderImage = getSenderImage(loggeduser, chat.users);
                    const senderName = !chat.isGroupChat ? getSender(loggeduser, chat.users) : chat.chatName;
                  
                    return (
                      <React.Fragment key={chat._id || index}>
                        <Avatar
                          src={`data:${senderImageType};base64,${senderImage}`}
                        />
                        <Typography color="black" sx={{ fontSize: "18px" }}>
                          {senderName}
                        </Typography>
                      </React.Fragment>
                    );
                  })
                )}
              </Box>
              {loadChatBox && (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <AddCallIcon sx={{ cursor: "pointer", color: "grey" }} />
                  <VideoCallIcon sx={{ cursor: "pointer", color: "grey" }} />
                </Box>
              )}
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
            {!loadChatBox && (
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "15rem",
                }}
              >
                Welcome to the Nex Talk
              </Typography>
            )}
          </Box>
          {loadChatBox && (
            <Box sx={{ padding: "0px 30px 30px 30px" }}>
              <TextField
                fullWidth
                placeholder="Type something here..."
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
                slotProps={{
                  input: {
                    endAdornment: icons.map((icon, idx) => {
                      return <IconButton key={idx}>{icon}</IconButton>;
                    }),
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ChatPage;
