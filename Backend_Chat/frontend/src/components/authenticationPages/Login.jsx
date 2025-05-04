import React, { useState } from "react";
import { Box, TextField, Button,  Typography, InputAdornment } from "@mui/material";
import axios from "axios";

const Login = () => {
  const [show,setShow] = useState(false)
  const [confirmShow,setConfirmShow] = useState(false)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")


  const handleSubmit= async()=>{
    const response = await axios.post("http://localhost:8000/api/user/login",{email,password});
    const data = response.data
    console.log(data)
  }
 
  return (
    <>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Email"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Login
              </Button>
              <Button variant="contained" color="primary" onChange={(e)=>(setEmail("guestuser@gmail.com"),setPassword("Guest"))}>
                Guest 
              </Button>
            </Box>
             
    </>
  );
};

export default Login;
