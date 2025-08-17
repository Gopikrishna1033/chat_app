import React, { useContext } from "react";
import { isLastMessage, isSameSender, isSameSenderMargin, issameUser } from "../../../config/ChatLogic";
import { chatContext } from "../../context/ContextApi";
import { Avatar } from "@mui/material";
const ScrollableChat = ({ messages }) => {
  const { user } = useContext(chatContext);
  return (
    <>
        {messages &&
          messages.map((m, i) => (
            <div key={m._id} style={{ display: "flex",margin:"0 70px 0 70px" }}>
              {/* {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Avatar
                  src={`data:${m.sender.imageType};base64,${m.sender.image}`}
                  mt="7px"
                  mr={1}
                  size="sm"
                />
              )} */}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                  marginLeft:isSameSenderMargin(messages,m,i,user._id),
                  marginTop:issameUser(messages,m,i,user._id)?3:10,
                  textAligin:'center'
                }}
              >
                {m.content}
              </span>
            </div>
          ))}
    </>
  );
};

export default ScrollableChat;
