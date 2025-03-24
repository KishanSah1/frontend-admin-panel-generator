"use client"

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UseCaseContainer from "./UseCaseContainer";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { sender: "User", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "Bot", text: "This is a bot response." },
      ]);
    }, 1000);
  };

  return (
    <Card className="p-1 h-96 shadow-md flex flex-col">
      <CardContent className="flex flex-col flex-1 overflow-y-auto space-y-1">
        <p className="text-lg font-semibold">Chatbot</p>
        <div className="flex-1 overflow-y-auto border p-2 rounded-md bg-[#f1f5f9]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-1.5 m-3 text-sm rounded-md ${
                msg.sender === "User" ? "bg-blue-200 text-right" : "bg-gray-300"
              }`}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>
      </CardContent>
      <div className="p-2 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </Card>
  );
};

export default Chatbot;
