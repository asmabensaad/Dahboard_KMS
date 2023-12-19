import React, { useEffect, useState } from "react";
import { useUser } from "./UserProvider";
import { useLocation } from 'react-router-dom';
import './profile.css';
import Avatar from '@mui/material/Avatar';
const UserProfile =() => {
    const Location=useLocation();
    const userData=Location.state;
   return (
    
    <div className='upc'>
      
      <h2>User Information</h2>
      <div className="gradiant"> 

      <p>Name: {userData.userName}</p>
      </div>
     
     <div className="profile-down">
      <p>Email: {userData.email}</p>
      </div>

      <div className="gradiant"> 

      <p>Id:{userData.userId}</p>
      </div>

      <div className="profile-down">
      
      <p>Phone Number:{userData.phoneNumber}</p>
      </div>


      
         
         <div className='upc'>
         <p>
         <div className="profile-description">
          <h2> </h2>
          </div>
  
         </p>
         </div>
      </div>

      
     
  
  );
};

export default UserProfile;

