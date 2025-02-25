import React, { useState } from 'react';
import { userAuthStore } from '../../store/userAuth.store.js';
import RightSide from '../components/RightSide';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

function LogInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = userAuthStore();


  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
   <div className='h-full '>
     <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <div className="w-full md:w-1/2 flex items-center justify-center  p-4">
        <div className="text-center w-full max-w-md">
          <h1 className="text-4xl font-bold mb-4 ">Log In</h1>
          <p className="mb-8 ">Log in to your account by filling the form below</p>
          <form className="space-y-4" onSubmit={(e)=>handleSubmit(e)}>
            <div className="relative">
              <label className="block text-left ">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />
            </div>
            <div className="relative">
              <label className="block text-left ">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="input input-bordered w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center "
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn  w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>
          <p className="mt-4 ">
            Don't have an account? <Link to="/signup" className="font-bold">Sign Up</Link>
          </p>
        </div>
      </div>
      <RightSide />
    </div>
   </div>
  );
}

export default LogInPage;