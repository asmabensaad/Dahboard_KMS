import Login from "./Login";
import Register from "./Register";
import { Routes, Route, Navigate } from "react-router-dom";
import  './index.css';
import { useState } from "react";
function Source() {
    const [isLogin, setIsLogin] = useState(true);
    const [logout,setLogout]=useState(false);

    const toggleIsLogin = ()=>{
        setIsLogin(prevState=>!prevState)
    }
    return(
    <main className="App">
        {isLogin ?<Login toggle={toggleIsLogin}/> : <Register toggle={toggleIsLogin}/>}
    </main>
    );
}
export default Source;