import { MessageSquareQuote } from "lucide-react";
import React from "react";

function NoChatSelected() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <MessageSquareQuote className="text-gray-600" size={64} />
      <h1 className="text-4xl font-bold mt-4">Welcome to ChatBox</h1>
      <p className="text-lg text-gray-600 mt-2">
        Select a conversation from the sidebar to start chatting
      </p>
    </div>
  );
}

export default NoChatSelected;
