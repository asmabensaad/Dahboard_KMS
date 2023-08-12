import React, { useEffect, useState } from "react";
import { useUser } from "./UserProvider";
import { useLocation } from 'react-router-dom';
const UserProfile =() => {
    const Location=useLocation();
    const userData=Location.state;
   return (
    <div>
      <h2>User Profile</h2>
      <p>Id:{userData.Id}</p>
      <p>Name: {userData.userName}</p>
      <p>Email: {userData.email}</p>
      
      <p>contact Number:{userData.PhoneNumber}</p>
    </div>
  );
};

export default UserProfile;

