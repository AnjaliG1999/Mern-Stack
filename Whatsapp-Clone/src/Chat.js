import { Avatar, IconButton } from "@material-ui/core";
import {
  Search as SeachIcon,
  AttachFile as AttachFileIcon,
  MoreVert as MoreVertIcon,
  InsertEmoticon as InsertEmoticonIcon,
  Mic as MicIcon,
} from "@material-ui/icons";
import React, { useState } from "react";

import axios from "./axios";

import "./css/Chat.css";

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    axios.post("/messages/new", {
      message: input,
      name: "Anjali",
      timestamp: new Date().toUTCString(),
      received: false,
    });

    setInput("");
  };
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
        {messages.map((message) => (
          <p
            className={`chat__message ${!message.received && "chat__receiver"}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>

        <form className="chat__footerInput">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage}>Send a message</button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
