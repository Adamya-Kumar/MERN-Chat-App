import { Eye, EyeOff, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RightSide from '../components/RightSide.jsx';
import { userAuthStore } from '../../store/userAuth.store.js';
import toast from 'react-hot-toast';



function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const {signup,isSigningUp}=userAuthStore();

const vaildateForm=()=>{
  if(!formData.fullName.trim()) return toast.error("Full Name is requried")
  if(!formData.email.trim()) return toast.error("Full Email is required")
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailPattern.test(formData.email))return  toast.error("Invaild Email Expression")
  if(!formData.password)return  toast.error("Password required")
  if(formData.password.length < 6)return  toast.error("Password must be alteast 6 Character")
console.log("toast")
    return true;

}
const formSubmission=(e)=>{
  e.preventDefault();
  const response=vaildateForm();
  
  console.log("inside form  submit ")
  if(response===true){
   signup(formData);  
  }
}


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <div className="w-full md:w-1/2 flex items-center justify-center  p-4">
        <div className="text-center w-full max-w-md">
          <h1 className="text-4xl font-bold mb-4 ">Sign Up</h1>
          <p className="mb-8 ">Create your account by filling the form below</p>
          <form className="space-y-4" onSubmit={(e)=>formSubmission(e)}>
            <div className="relative">
              <label className="block text-left ">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={(e)=>handleChange(e)}
                placeholder="Enter your full name"
                className="input input-bordered w-full"
              />
            </div>
            <div className="relative">
              <label className="block text-left ">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e)=>handleChange(e)}
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
                  onChange={(e)=>handleChange(e)}
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
            <button type="submit" className="btn  w-full" disabled={isSigningUp}>{isSigningUp ? (
              <>
              <Loader2 className='size-5 animate-spin'/>
              Loading...
              </>
            ) : (
              "Create Account"
            )}</button>
          </form>
          <p className="mt-4 ">
            Already have an account? <Link to="/login" className="font-bold">Sign In</Link>
          </p>
        </div>
      </div>
      <RightSide/>
    </div>
  );
}

export default SignUpPage;