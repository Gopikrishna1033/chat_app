import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { chatContext } from "../context/ContextApi";
import { Box, FormControl, TextField } from "@mui/material";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GroupChatModal = ({ open, setOpen }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResults] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, chats, setChats } = useContext(chatContext);
  const handleClose = () => {
    setOpen(!open);
  };
 const handleSearch = async (query)=>{
    setSearch(query)
    if(!query){
        return
    }
    try{
        const config = {headers:{
            Authorization:`Bearer ${user.token}`
        }}
        const response = await axios.get(`http://localhost:8000/api/user?search=${query}`,config)
        setSearchResults(response?.data)
        console.log(response?.data)
    }catch(error){
        console.log(error)
    }
 }

const handleSubmit = ()=>{

}

  return (
    <>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Create GroupChat</DialogTitle>
        <DialogContent>
          <Box>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
              }}
            >
              <TextField
                fullWidth
                placeholder="Chat Name"
                variant="outlined"
                onChange={(e)=>setGroupChatName(e.target.value)}
              />
              <TextField fullWidth placeholder="Add users" variant="outlined" onChange={(e)=>handleSearch(e.target.value)}/>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex,", justifyContent: "space-between" }}
        >
          <Button
            onClick={handleClose}
            sx={{
              textTransform: "none",
              background: "#ce2029",
              color: "#fff",
            }}
          >
            Cancel
          </Button>
          <Button
          variant="contained"
            onClick={handleSubmit}
            sx={{
              textTransform: "none",
            }}
          >
            Create Chat
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GroupChatModal;
