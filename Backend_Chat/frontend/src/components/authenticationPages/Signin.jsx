import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Grid from "@mui/material/Grid";
import axios from 'axios';
const Signin = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [image, setImage] = useState(null);
      const [data, setData] = useState(null);
      const [name,setName] = useState("")
        const [show,setShow] = useState(false)
        const [confirmShow,setConfirmShow] = useState(false)
        
  const handleSubmit = async ()=>{
    const formData = new FormData()
    formData.append("name",name)
    formData.append("email", email);
    formData.append("password", password);
    console.log(image,"imjn")
    if (image) {
      formData.append("image", image);
    }
    const response = await axios.post(
      "http://localhost:8000/api/user",
      formData,
    );
    const data = response.data
    setData(data)
  }
        console.log(data,"response  ")  
        console.log(image,"image")
  return (
    <div>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type={show ? "text" : "password"}
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    onClick={() => setShow(!show)}
                    style={{ textTransform: "none" }}
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Confirm Password"
          type={confirmShow ? "text" : "password"}
          fullWidth
          onChange={(e) => setConfirmPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    onClick={() => setConfirmShow(!confirmShow)}
                    style={{ textTransform: "none" }}
                  >
                    {confirmShow ? "Hide" : "Show"}
                  </Button>
                </InputAdornment>
              ),
            },
          }}
        />

        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e)=>setImage(e.target.files[0])}
        />
        <label
          htmlFor="fileInput"
          style={{
            display: "inline-block",
            padding: "10px 15px",
            backgroundColor: "#1976D2",
            color: "#fff",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Upload your picture
        </label>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Sign Up
        </Button>
      </Box>
    </div>
  );
}

export default Signin