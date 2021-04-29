import { Avatar, IconButton } from "@material-ui/core";
import {
  Search as SeachIcon,
  AttachFile as AttachFileIcon,
  MoreVert as MoreVertIcon,
} from "@material-ui/icons";
import React from "react";
import "./css/Chat.css";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Dance Room</h3>
          <p>last seen Fri, 04 Sep 2020 18:00:16 GMT</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SeachIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body"></div>
    </div>
  );
};

export default Chat;
