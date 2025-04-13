import React, { useEffect,useState } from 'react'
import axios from 'axios'
import {Box} from "@mui/material"
const ChatPage = () => {
  const [chats,setChats] = useState([])
  const fetchData = async()=>{
    const response = await axios.get("http://localhost:8000/api/chat")
    setChats(response?.data)
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <>
      {chats.map((data, index) => (
        <Box key={index} >
          {data.chatName}
        </Box>
      ))}
    </>
  );
}

export default ChatPage