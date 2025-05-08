import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Signin from "./Signin";
import Login from "./Login";
import useStyles from "./Style";

const AuthPages = () => {
  const [value, setValue] = React.useState("1");
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div>
      <Box sx={{ width: 500, mx: "auto", mt: 5 }}>
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
            <Login />
          </TabPanel>
          {/* Sign Up Panel */}
          <TabPanel value="2">
            <Signin />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default AuthPages;
