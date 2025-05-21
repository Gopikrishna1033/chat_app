import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { chatContext } from "../context/ContextApi";
const ChatPage = () => {
  const userContext = useContext(chatContext);
  const { user } = userContext;
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const headers = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
 
  const handleSearchText = async (event) => {
    const value = event.target.value;
    setSearchText(value);

    if (value.trim() === "") {
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
            width: "20%",
            borderRight: "1px solid black",
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
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
            }}
          >
            <Box>
              {" "}
              <Typography variant="h5">NexTalk</Typography>
            </Box>
            <Box>
              <TextField
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
                  border: "1px solid black",
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
                      border: "1px solid black",
                    },
                  },
                }}
              />
            </Box>
            {searchResults &&
              searchResults.map((data) => {
                return (
                  <Card
                    sx={{ width: "100%", boxShadow: "none", cursor: "pointer" }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                      }}
                    >
                      <Avatar src={data?.image} />
                      <Typography>{data?.name}</Typography>
                    </CardContent>
                  </Card>
                );
              })}
          </Box>
        </Box>
        <Box sx={{ flex: 1, padding: "16px" }}>
          <Typography variant="body1" color="textSecondary">
            Select a chat or start a new conversation
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ChatPage;
