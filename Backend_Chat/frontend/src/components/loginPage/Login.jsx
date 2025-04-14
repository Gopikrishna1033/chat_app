import React, { useState } from "react";
import { Box, TextField, Button, Tab, Typography, InputAdornment } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import useStyles from "./Style";


const Login = () => {
    const classes = useStyles();
  const [value, setValue] = React.useState("1");
  const [show,setShow] = useState(false)
  const [confirmShow,setConfirmShow] = useState(false)
  const [name,setName] = useState("")
  const [logEmail,setLogEmail] = useState("")
  const [logPassword,setLogPassword] = useState("")
  const [signEmail,setSignEmail] = useState("")
  const [signPassword,setSignPassword] = useState("")
  const [signConfirmPassword,setSignConfirmPassword] = useState("")
  const [image,setImage]= useState(null)
  console.log(image)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: 400, mx: "auto", mt: 5 }}>
        <Box className={classes.container}>
          <Typography className={classes.textSize}>Quick Chat</Typography>
        </Box>
        <TabContext value={value}>
          <Box>
            <TabList
              onChange={handleChange}
              aria-label="login/signup tabs"
              centered
            >
              <Tab
                label="Login"
                value="1"
                style={{ textTransform: "none", marginRight: "50px" }}
              />
              <Tab
                label="Sign Up"
                value="2"
                style={{ textTransform: "none", marginLeft: "50px" }}
              />
            </TabList>
          </Box>

          {/* Login Panel */}
          <TabPanel value="1">
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Email"
                fullWidth
                onChange={(e) => setLogEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                onChange={(e) => setLogPassword(e.target.value)}
              />
              <Button variant="contained" color="primary">
                Login
              </Button>
              <Button variant="contained" color="primary" onChange={(e)=>(setLogEmail("guestuser@gmail.com"),setLogPassword("Guest"))}>
                Guest 
              </Button>
            </Box>
          </TabPanel>

          {/* Sign Up Panel */}
          <TabPanel value="2">
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
                onChange={(e) => setSignEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type={show ? "text" : "password"}
                fullWidth
                onChange={(e) => setSignPassword(e.target.value)}
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
                onChange={(e) => setSignConfirmPassword(e.target.value)}
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
                onChange={(e) => setImage(e.target.files[0])}
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

              <Button variant="contained" color="primary">
                Sign Up
              </Button>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Login;
