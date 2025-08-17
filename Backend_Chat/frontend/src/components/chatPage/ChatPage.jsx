import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  SearchOutlined as SearchIcon,
  AddCall as CallIcon,
  VideoCall as VideoIcon,
  Send as SendIcon,
  AddReaction as ReactionIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { chatContext } from "../context/ContextApi";
import { useNavigate } from "react-router-dom";
import MenuBox from "./MenuBox";
import MyChats from "./MyChats";
import {
  getSender,
  getSenderImage,
  getSenderImageType,
} from "../../config/ChatLogic";
import UpdateGroupChatModal from "../GroupChat/UpdateGroupChatModal";
import ScrollableChat from "./Messages/ScrollableChat";
import io from "socket.io-client";
import TypingIndicator from "../typingIndication/TypingIndicator";

const ENDPOINT = "http://localhost:8000";
var socket, selectedChatCompare;

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessages, setNewMessages] = useState("");
  const [socketConnection, setSocketConnection] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { user, setSelectedChat, chats, setChats, selectedChat } =
    useContext(chatContext);
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);

  const loggedUser = JSON.parse(localStorage.getItem("userInfo"));

  const headers = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const handleSearchText = async (event) => {
    const value = event.target.value;
    setSearchText(value);
    if (value.trim() === "") return setSearchResults([]);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/user?search=${value}`,
        headers
      );
      setSearchResults(res.data);
    } catch (err) {
      console.error("Search Error:", err);
    }
  };

  const accessChat = async (userId) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/chats/`,
        { userId },
        headers
      );
      const data = res.data;
      if (!chats.find((chat) => chat._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
    } catch (err) {
      console.log("Access Chat Error:", err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const renderUserCard = (data) => (
    <Box
      key={data._id}
      onClick={() => accessChat(data._id)}
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1,
        gap: 2,
        cursor: "pointer",
        borderRadius: 1,
        "&:hover": { background: "#f0f0f0" },
      }}
    >
      <Avatar src={`data:${data.imageType};base64,${data.image}`} />
      <Typography>
        {data.name} {data._id === user._id && "(You)"}
      </Typography>
    </Box>
  );
  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/messages/${selectedChat._id}`,
        config
      );
      console.log(response?.data, "fetchMessages");
      setMessages(response?.data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnection(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    // socket.on("message received", (newMessageReceived) => {
    //   if (
    //     !selectedChatCompare ||
    //     selectedChatCompare._id !== newMessageReceived.chat._id
    //   ) {
    //     //give notification
    //   } else {
    //     setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
    //   }
    // });
    const handleMessage = (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // notification
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    };

    socket.on("message received", handleMessage);

    return () => {
      socket.off("message received", handleMessage); // cleanup!
    };
  }, [selectedChatCompare]);

  const sendMessages = async (event) => {
    if (newMessages) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        };
        const response = await axios.post(
          "http://localhost:8000/api/messages",
          { content: newMessages, chatId: selectedChat._id },
          config
        );
        console.log(response?.data, "messages");
        socket.emit("new message", response?.data);
        setMessages((prev) => [...prev, response?.data]);
        setNewMessages("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessages(e.target.value);
    if (!socketConnection) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
      {/* Sidebar */}
      <Box sx={{ width: "25vw", borderRight: "1px solid #ddd", p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">
            <Box component="span" sx={{ color: "#1976D2", fontWeight: "bold" }}>
              Nex
            </Box>
            <Box component="span" sx={{ color: "#f44336", fontWeight: "bold" }}>
              Talk
            </Box>
          </Typography>
          <MenuBox logout={logout} />
        </Box>

        <TextField
          fullWidth
          placeholder="Search users..."
          onChange={handleSearchText}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {searchText.trim() ? (
          searchResults.map(renderUserCard)
        ) : (
          <MyChats fetchAgain={fetchAgain} />
        )}
      </Box>

      {/* Chat Area */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AppBar
          position="static"
          sx={{ background: "#fff", boxShadow: "none", p: 2 }}
        >
          {selectedChat && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  src={`data:${getSenderImageType(
                    loggedUser,
                    selectedChat.users
                  )};base64,${getSenderImage(loggedUser, selectedChat.users)}`}
                />
                <Typography color="black">
                  {!selectedChat.isGroupChat ? (
                    getSender(loggedUser, selectedChat.users)
                  ) : (
                    <>
                      {selectedChat.chatName}
                      <UpdateGroupChatModal
                        fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain}
                        fetchMessages={fetchMessages}
                      />
                    </>
                  )}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <CallIcon sx={{ color: "gray", cursor: "pointer" }} />
                <VideoIcon sx={{ color: "gray", cursor: "pointer" }} />
              </Box>
            </Box>
          )}
        </AppBar>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "500px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div>
            <ScrollableChat messages={messages} />
          </div>
        )}
        <Box sx={{ flex: 1, p: 2, overflow: "auto" }}>
          {!selectedChat && (
            <Typography align="center" sx={{ mt: 20, color: "gray" }}>
              Please select a chat to message..
            </Typography>
          )}
        </Box>

        {selectedChat && (
          <Box sx={{ px: 3, pb: 3 }}>
            {isTyping ? (
              <div>
                <TypingIndicator />
              </div>
            ) : (
              <></>
            )}
            <TextField
              fullWidth
              placeholder="Type something here..."
              sx={{ background: "#f9f9f9", borderRadius: 1 }}
              onChange={typingHandler}
              value={newMessages}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessages();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {[<ReactionIcon />, <AddIcon />, <SendIcon />].map(
                      (icon, i) => (
                        <IconButton
                          key={i}
                          onClick={i === 2 ? sendMessages : undefined}
                        >
                          {icon}
                        </IconButton>
                      )
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatPage;
