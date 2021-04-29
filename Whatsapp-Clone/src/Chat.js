import { Avatar, IconButton } from "@material-ui/core";
import {
  Search as SeachIcon,
  AttachFile as AttachFileIcon,
  MoreVert as MoreVertIcon,
  InsertEmoticon as InsertEmoticonIcon,
  Mic as MicIcon,
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

      <div className="chat__body">
        <p className="chat__message">
          <span className="chat__name">Anjali</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="chat__receiver">
          <span className="chat__name">You</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="chat__message">
          <span className="chat__name">Anjali</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
      </div>

      <div className="chat__footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>

        <form className="chat__footerInput">
          <input placeholder="Type a message" type="text" />
          <button>Send a message</button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
