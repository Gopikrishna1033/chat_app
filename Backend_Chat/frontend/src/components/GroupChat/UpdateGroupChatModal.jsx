import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  IconButton,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { chatContext } from "../context/ContextApi";
import UserBadgeItem from "./UserBadgeItem";
import axios from "axios";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const { selectedChat, setSelectedChat, user, chats, setChats } =
    useContext(chatContext);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const headers = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const handleRemove = async (userToRemove) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/chats/group/remove/user`,
        {
          chatId: selectedChat._id,
          userId: userToRemove._id,
        },
        headers
      );
      if (userToRemove._id === user._id) {
        setSelectedChat(null);
      } else {
        setSelectedChat(res.data);
      }
      setFetchAgain(!fetchAgain);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRename = async () => {
    if (!groupChatName.trim()) return;
    setRenameLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:8000/api/chats/group/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        headers
      );
      setSelectedChat(res.data);
      setChats((prev) =>
        prev.map((chat) => (chat._id === res.data._id ? res.data : chat))
      );
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      setGroupChatName("");
    } catch (err) {
      console.error(err);
      setRenameLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/user?search=${query}`,
        headers
      );
      setSearchResults(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
      alert("User already in group");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:8000/api/chats/group/add/user`,
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        },
        headers
      );
      setSelectedChat(res.data);
      setFetchAgain(!fetchAgain);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <VisibilityIcon fontSize="small" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" mb={2}>
            {selectedChat?.chatName}
          </Typography>

          {/* Members */}
          <Box width="100%" display="flex" flexWrap="wrap" pb={2}>
            {selectedChat?.users.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleRemove(u)}
              />
            ))}
          </Box>

          {/* Rename group */}
          <Box display="flex" gap={1} mb={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="New Chat Name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleRename}
              disabled={renameLoading}
            >
              {renameLoading ? <CircularProgress size={20} /> : "Update"}
            </Button>
          </Box>

          {/* Search field */}
          <TextField
            fullWidth
            placeholder="Add users to group"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            size="small"
          />

          {/* Search Results */}
          <Box mt={2}>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              searchResults?.slice(0, 4).map((user) => (
                <Card
                  key={user._id}
                  sx={{
                    mb: 1,
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                  onClick={() => handleAddUser(user)}
                >
                  <CardContent
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Avatar
                      src={`data:${user.imageType};base64,${user.image}`}
                    />
                    <Typography>{user.name}</Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
