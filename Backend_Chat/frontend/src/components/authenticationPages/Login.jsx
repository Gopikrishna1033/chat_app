import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const response = await axios.post(
      "http://localhost:8000/api/user/login",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    const data = response.data;
    if (response.status === 200) {
      setOpen(true);
      navigate("/chatpage");
    }
    const userData = {
      _id: data._id,
      name: data?.name,
      email: data?.email,
      image: data?.image,
      imageType: data?.imageType,
      token: data?.token,
    };
    localStorage.setItem("userInfo",JSON.stringify(userData))
  };
  const handleClose = () => {
    setOpen(false);
  };
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
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          message="login successful!"
          sx={{ background: "green", color: "white" }}
        />
      </Snackbar>
    </>
  );
};

export default Login;
