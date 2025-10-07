import React, { useState } from "react";
import { getChatbotResponse } from "./api.js";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    const res = await getChatbotResponse(message);
    setChat([...chat, { user: message, bot: res.reply }]);
    setMessage("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>AI Chatbot</h2>
      <div>
        {chat.map((c, i) => (
          <div key={i}>
            <strong>You:</strong> {c.user} <br />
            <strong>Bot:</strong> {c.bot}
            <hr />
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Chatbot;
