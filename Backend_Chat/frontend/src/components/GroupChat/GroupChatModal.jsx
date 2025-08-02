import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { chatContext } from "../context/ContextApi";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { getSenderImage, getSenderImageType } from "../../config/ChatLogic";
import UserBadgeItem from "./UserBadgeItem";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GroupChatModal = ({ open, setOpen }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, chats, setChats } = useContext(chatContext);
  const handleClose = () => {
    setOpen(!open);
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:8000/api/user?search=${query}`,
        config
      );
      setSearchResults(response?.data);
      setLoading(false);
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:8000/api/chats/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      const data = response?.data;
      setChats([data, ...chats]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      alert("user already added");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const handleDelete = (userToRemove) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== userToRemove._id));
  };
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
        PaperProps={{
          sx: {
            width: "700px", // or "80%", "50vw", etc.
            maxWidth: "none", // disable default maxWidth
          },
        }}
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
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <TextField
                fullWidth
                placeholder="Add users"
                variant="outlined"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {selectedUsers.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleDelete(u)}
              />
            ))}

            {loading ? (
              <div>loading</div>
            ) : (
              searchResult?.slice(0, 4).map((user) => (
                <Card
                  sx={{ m: 1 }}
                  onClick={() => handleGroup(user)}
                  key={user._id}
                >
                  <CardContent
                    sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                  >
                    <Avatar
                      src={`data:${user?.imageType};base64,${user?.image}`}
                    />
                    <Typography sx={{ fontSize: "18px" }}>
                      {user?.name}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            )}
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
