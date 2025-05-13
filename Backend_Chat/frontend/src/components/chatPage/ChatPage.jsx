import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import {chatContext} from "../context/ContextApi"
const ChatPage = () => {
  const userContext = useContext(chatContext)
  const {user} = userContext
  console.log(user,"chat")
  const [chats, setChats] = useState([]);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:8000/api/chat");
    setChats(response?.data);
  };

  return (
    <>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ background: "yellow", width: "20%" }}>
          <Box sx={{display:"flex",flexDirection:"column",gap:"15px",padding:"10px",alignItems:"center",justifyContent:"center"}}>
           <Box> <Typography variant="h5">NexTalk</Typography></Box>
           <Box>
            <TextField placeholder="search" slotProps={{input:{
              endAdornment:(
                <InputAdornment position="end">
                  <SearchOutlinedIcon/>
                </InputAdornment>
              )
            }}}
            sx={{border:"1px solid black",
              borderRadius:"50px",
              "& .MuiOutlinedInput-root": {
  borderRadius: "50px",
  height:"2.75em",
  "& fieldset": {
    border: "none",
  },
  "&:hover fieldset": {
    border: "none",
  },
  "&.Mui-focused fieldset": {
    border: "2px solid black", // optional, to differentiate focus state
  },
}
          }}
            />
            </Box>
          </Box>
        </Box>
        <Box sx={{ background: "green" }}>j</Box>
      </Box>
    </>
  );
};

export default ChatPage;
