import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const SearchResults = ({filteredChats, accessChat}) => {
  return (
    <>
      <Box>
        {filteredChats &&
          filteredChats?.map((data, index) => {
            return (
              <Card
                sx={{ width: "100%", boxShadow: "none", cursor: "pointer" }}
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
                  <Avatar
                    src={`data:${data?.imageType};base64,${data?.image}`}
                  />
                  <Typography>{data?.name}</Typography>
                </CardContent>
              </Card>
            );
          })}
      </Box>
    </>
  );
};

export default SearchResults;
