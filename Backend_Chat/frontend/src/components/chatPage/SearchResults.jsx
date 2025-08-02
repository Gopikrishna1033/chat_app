import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import React from "react";

const SearchResults = ({ filteredChats, accessChat, loadingChat }) => {
  return (
    <Box>
      {loadingChat ? (
        <CircularProgress />
      ) : (
        filteredChats?.map((data, index) => (
          <Card
            sx={{ width: "100%", boxShadow: "none", cursor: "pointer", mb: 1 }}
            key={index}
            onClick={() => accessChat(data?._id)}
          >
            <CardContent
              sx={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
              }}
            >
              <Avatar src={`data:${data?.imageType};base64,${data?.image}`} />
              <Typography>{data?.name}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default SearchResults;
