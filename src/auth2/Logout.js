import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Logout=() => {
    
    const navigate =useNavigate();
    localStorage.clear();

useEffect(() => {

    navigate('/auth2');
},[]);
return (<div>Logging out</div>);
};
export default Logout;