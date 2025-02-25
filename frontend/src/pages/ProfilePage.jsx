import React, { useEffect, useState } from 'react';
import { userAuthStore } from '../../store/userAuth.store';
import { Camera } from 'lucide-react';

function ProfilePage() {
  const { authUser, isUpdateProfile,updateProfile } = userAuthStore();
  const [image, setImage] = useState(null);

  const handleImageUpload = async (e) => {
    // Handle image upload logic here
    const file =e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file)

    reader.onload=async ()=>{
      const base64Image=reader.result;
      setImage(base64Image);
      await updateProfile({profilePic:base64Image})
    }

  };

  return (
  <div className='h-screen '>
      <div className=" flex flex-col items-center mt-10 rounded-xl mx-auto w-[50%] p-4 bg-transparent border">
      <div className='my-4 flex flex-col items-center gap-2'>
        <h2 className='font-semibold text-4xl'>Update Profile</h2>
        <p className='font-light  tracking-wide'>This is Update Profile section</p>
      </div>
      <div className="relative">
        <img
          src={image || authUser.profilePic || 'https://preview.redd.it/high-resolution-remakes-of-the-old-default-youtube-avatar-v0-bgwxf7bec4ob1.png?width=640&crop=smart&auto=webp&s=99d5fec405e0c7fc05f94c1e1754f7dc29ccadbd'}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover my-6"
        />
        <label className="absolute bottom-0 right-0  p-2 rounded-full cursor-pointer">
          <Camera  size={24} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e)=>handleImageUpload(e)}
            disabled={isUpdateProfile}
          />
        </label>
      </div>
      <p className="mt-4 ">
        {isUpdateProfile ? 'Loading...' : 'Click the camera icon to upload your photo'}
      </p>
      
      <div className="w-full mt-8 ">
        <h3 className="text-2xl font-semibold mb-4">Account Information</h3>
        <div className="mb-4">
          <label className="block text-left ">Full Name</label>
          <input
            type="text"
            value={authUser?.fullName}
            readOnly
            className="input input-bordered w-full  "
          />
        </div>
        <div className="mb-4">
          <label className="block text-left ">Email</label>
          <input
            type="email"
            value={authUser?.email }
            readOnly
            className="input input-bordered w-full "
          />
        </div>
        <div className="flex justify-between items-center mb-4 mt-10 px-5">
          <div>
            <h4 className="text-lg font-semibold">Member Since</h4>
            <p>{authUser.createdAt?.split("T")[0] || 'N/A'}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Account Status</h4>
            <p className="text-green-600 font-bold">{authUser.email ? 'Active' : 'Offline'}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ProfilePage;