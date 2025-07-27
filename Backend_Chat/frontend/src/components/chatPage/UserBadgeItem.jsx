import { Box } from '@mui/material'
import React from 'react'
import CloseIcon from "@mui/icons-material/Close";

const UserBadgeItem = ({handleFunction,user}) => {
  return (
    <>
      <Box
        sx={{
          px: 2,
          py: 1,
          borderRadius: "10px",
          m: 1,
          mb: 2,
          fontSize: 14,
          backgroundColor: "#e0e0e0",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          fontWeight:"bold"
        }}
        onClick={handleFunction}
      >
        {user.name}
        <CloseIcon fontSize="small" />
      </Box>
    </>
  );
}

export default UserBadgeItem