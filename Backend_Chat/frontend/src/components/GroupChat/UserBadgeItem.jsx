import { Box } from '@mui/material'
import React from 'react'
import CloseIcon from "@mui/icons-material/Close";

const UserBadgeItem = ({handleFunction,user}) => {
  return (
    <>
      <Box
        sx={{
          px: 1,
          py: 1,
          borderRadius: "10px",
          m: 1,
          mb: 1,
          fontSize: 12,
          backgroundColor: "#e0e0e0",
          display: "inline-flex",
          alignItems: "center",
          // gap: "10px",
          cursor: "pointer",
          fontWeight:"bold"
          
        }}
        onClick={handleFunction}
      >
        {user.name}
        <CloseIcon  style={{fontSize:"12px",marginLeft:"5px"}}/>
      </Box>
    </>
  );
}

export default UserBadgeItem