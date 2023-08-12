import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
//import axios from "../api/axios";
import Register from "./Register";
import { Button } from "@mui/material";
import Dashboard from "../scenes/dashboard/index.jsx";
//import Dashboard from "./Dashboard/Dashboard.jsx";
import './index.css';
import * as yup from "yup";
//import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import instance from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import { UserProvider,useUser } from "../scenes/Profile/UserProvider";
import axios from "axios";

const LOGIN_URL = 'api/Authenticate/login';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


const Login = (props) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const {setUser}=useUser();

    const usenavigate = useNavigate();
    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);

    }, [email])


    useEffect(() => {
        userRef.current.focus();
    }, [])
    useEffect(() => {
        setErrMsg('');
    }, [email, password])
    const handleSubmit = async (e) => {

        e.preventDefault();

        let inputobj = { "email": email, "password": password };
        try {
            const response = await instance.post(LOGIN_URL, {
                email,
                password
            }, {
                headers: { 
                'content-type': 'application/json',
                 Authorization:`Bearer ${localStorage.getItem("token")}`
                 },
                body: JSON.stringify(inputobj)

            });
            if (response.status === 200) {
                setSuccess(true);
                localStorage.setItem('token',response.data.data.access_token);
            localStorage.setItem('refresh',response.data.data.refresh_token);


            const userDataRsponse=await fetchUserData();
            if(userDataRsponse) {
               setUser(userDataRsponse);
            }
                usenavigate('/');

            }

            
           
            const roles = response?.data?.roles;
            setAuth({ email, password, roles, accessToken:response.data.data.accessToken });
            setEmail('');
            setPassword('');
            setSuccess(true);

        } catch (err) {
            if (!err?.response) {
                setErrMsg('NO server response');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();

        }




    }
    const fetchUserData= async() => {
        try {
            const response =await axios.get('http://localhost:2023/api/Users/getCurrentUser' , {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                },
            });
            if(response.status===200)
            {
                const {email ,userName,Id,contactNumber}=response.data;
                return{email,userName,Id,contactNumber};
            }
            else{
                console.error('failed to fetch user data');
                return null;
            }
        }catch(error){
            console.error('Error fetching user data', error);
            return null;
        }
    };

    return (

        <> {success ? (
            <section>
                <h1> You are loged in?</h1>
                <p>
                    <Link to="/">Go To Home</Link>
                </p>
            </section>
        ) : (


            <section>
                <p ref={errRef} className={errMsg ? "errmsg" :
                    "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>





                <form onSubmit={handleSubmit}

                >
                    <label htmlFor="email">email:</label>
                    <input type="email" id="email" ref={userRef} autoComplete="off" onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required />


                    <label htmlFor="password">Password:</label>


                    <input type="password" id="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required />
                    <button>Sign In</button>

                </form>

                <p>
                    Need an Account ? <br />
                    <span className="line">
                        <Button onClick={props.toggle} >Sign Up</Button>
                    </span>
                </p>



                <p>

                    Forgot Password ? <br />
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