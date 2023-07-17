import { useRef,useState,useEffect,useContext } from "react";
import  AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import Register from "./Register";

import Dashboard from "../scenes/dashboard/index.jsx";
//import Dashboard from "./Dashboard/Dashboard.jsx";
import  './index.css';
import instance from "../api/axios";
import { Link } from "react-router-dom";
const LOGIN_URL = 'api/Authenticate/login';

const Login =() => {
    const { setAuth } = useContext(AuthContext);
    const userRef=useRef();
    const errRef=useRef();

    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const [errMsg,setErrMsg]=useState('');
    const [success,setSuccess]=useState(false);
    useEffect(() => {
        userRef.current.focus();
    },[])
    useEffect(() => {
        setErrMsg('');
    },[email,password])
    const handleSubmit =async(e) => {
        e.preventDefault();
        

        try {
            const response =await instance.post(LOGIN_URL,{
                email,
                password
            },{
                headers:{'content-type':'application/json'},
                
            });
            console.log(JSON.stringify(response?.data))
            const accessToken=response?.data?.accessToken;
            const roles=response?.data?.roles;
             setAuth ({email,password,roles,accessToken});
            setEmail('');
            setPassword('');
            setSuccess(true);

        }catch (err){
            if(!err?.response) {
               setErrMsg( 'NO server response');
            }else if(err.response?.status ===401) {
                setErrMsg('Unuathorized');

            }else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();

        }
        
    }
    return (
        <> {success ? (
            <section>
                <h1> You are loged in?</h1>
                <p>
                    <Link to="/">Go To Home</Link>
                </p>
            </section>
        ):(

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" :
            "offscreen"} aria-live= "assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor="email">email:</label>
            <input type ="text" id="email" ref={userRef} autoComplete="off" onChange={(e) => setEmail(e.target.value)}
            value={email}
            required/>
            <label htmlFor="password">Password:</label>
            <input type ="password" id="password"  autoComplete="off" onChange={(e) => setPassword(e.target.value)}
            value={password}
            required/>
        
            </form>
            <p>
                Need an Account ? <br/>
                <span className="line">
                    <Link to='Register'>Sign Up</Link>
                </span>
            </p>



            <p>
                
                Forgot Password ? <br/>
                <span className="line">
                    <a href="#">Reset Password</a>
                </span>
                
            </p>
        </section>
        )}
        </>
    )
}
export default Login;