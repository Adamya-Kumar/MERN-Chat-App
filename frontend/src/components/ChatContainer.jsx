import React, { useEffect, useRef } from 'react'
import {userChatStore} from "../../store/useChat.store.js"
import ChatHeader from './ChatHeader.jsx';
import MessageInput from "./MessageInput.jsx";
import MessageSkeleton from './Skeletons/MessageSkeleton.jsx';
import { formatMessageTime } from "../lib/utils.jsx";
import { userAuthStore } from '../../store/userAuth.store.js';

function ChatContainer() {
 const {messages,getMessages,isMessagesLoading,selectedUser,subscribeToMessages,unsubscribeToMessage} = userChatStore();
 const { authUser } = userAuthStore();
 const messageEndRef = useRef(null);


  useEffect(() => {
    // console.log(selectedUser._id);
   getMessages(selectedUser._id);
   subscribeToMessages();
    console.log(messages);
   return ()=> unsubscribeToMessage();
  }, [selectedUser._id,getMessages,subscribeToMessages,unsubscribeToMessage]);
  

  if(isMessagesLoading) 
  return(
 <div className='flex-1 flex flex-col overflow-auto'>
   <ChatHeader/>
   <MessageSkeleton/>
    <MessageInput/>
  </div>)

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          
          <div
            
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
           
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "https://preview.redd.it/high-resolution-remakes-of-the-old-default-youtube-avatar-v0-bgwxf7bec4ob1.png?width=640&crop=smart&auto=webp&s=99d5fec405e0c7fc05f94c1e1754f7dc29ccadbd"
                      : selectedUser.profilePic || "https://preview.redd.it/high-resolution-remakes-of-the-old-default-youtube-avatar-v0-bgwxf7bec4ob1.png?width=640&crop=smart&auto=webp&s=99d5fec405e0c7fc05f94c1e1754f7dc29ccadbd"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput/>
    </div>
  )
}

export default ChatContainer