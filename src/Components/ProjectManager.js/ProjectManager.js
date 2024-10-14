import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectManager = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    const response = await axios.get("https://of-management-backend-4.onrender.com/api/messages");
    setMessages(response.data);
  };

  const sendMessage = async () => {
    await axios.post("https://of-management-backend-4.onrender.com/api/messages", {
      text: newMessage,
      role: "manager",
    });
    setNewMessage("");
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className=" mx-auto p-4 ml-[30px] w-[600px] mt-20 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Project Manager Chat</h2>
      <div className="message-container  bg-white p-5   max-h-96 overflow-y-auto mb-4 flex flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-lg ${msg.role === "manager" ? "bg-blue-200 self-end" : "bg-green-200 self-start"}`}
            style={{ display: "inline-block" }} 
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <input
          className="border rounded-lg p-2  w-full"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button
          className=" bg-blue-500 text-white rounded-lg p-2 pl-4 pr-4 "
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ProjectManager;
