import React from 'react';
import { Link } from 'react-router-dom';
import { userAuthStore } from '../../store/userAuth.store';
import { Settings, User, LogOut, MessageSquareQuote } from 'lucide-react';

function Navbar() {
  const { logout, authUser } = userAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className=" p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold flex items-center">
      <MessageSquareQuote  className="mr-2" size={30} />
        ChatBox
      </Link>
      <div className="flex items-center gap-x-3">
        {authUser ? (
          <>
            <Link to={"/profile"} className="flex items-center  mr-4">
              <User  size={34} />
              {authUser.name}
            </Link>
            <Link to={"/settings"} className=" flex items-center">
              <Settings  size={34} />
              Settings
            </Link>
            <button onClick={handleLogout} className=" flex items-center m-2">
              <LogOut  size={34} />
              Logout
            </button>
          </>
        ) : (
          <Link to={"/settings"} className=" flex items-center mr-10">
            <Settings  size={34} />
            Settings
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;