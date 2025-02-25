import { X } from "lucide-react";
import { userAuthStore } from "../../store/userAuth.store.js";
import { userChatStore } from "../../store/useChat.store.js";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = userChatStore();
  const { onlineUsers } = userAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={
                  selectedUser.profilePic ||
                  "https://preview.redd.it/high-resolution-remakes-of-the-old-default-youtube-avatar-v0-bgwxf7bec4ob1.png?width=640&crop=smart&auto=webp&s=99d5fec405e0c7fc05f94c1e1754f7dc29ccadbd"
                }
                alt={selectedUser.fullName}
                className="object-cover rounded-full"
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)} className="text-gray-600 hover:text-gray-800">
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;