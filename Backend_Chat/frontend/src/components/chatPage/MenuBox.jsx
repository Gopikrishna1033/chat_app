import React from 'react'
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, IconButton, Typography } from '@mui/material';
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupChatModal from '../GroupChat/GroupChatModal';

const MenuBox = ({ logout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleGroupChatDialog = ()=>{
    setOpenDialog(!openDialog)
    handleClose()
  }
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem
          onClick={handleGroupChatDialog}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography> New GroupChat</Typography>
          </Box>
          <Box>
            <IconButton sx={{ ml: "auto" }}>
              <GroupAddIcon />
            </IconButton>
          </Box>
        </MenuItem>
        <MenuItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          Logout &nbsp; &nbsp; &nbsp;
          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </MenuItem>
      </Menu>

      <GroupChatModal open = {openDialog} setOpen = {setOpenDialog}/>
    </>
  );
};

export default MenuBox