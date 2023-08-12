import { useRef,useState,useEffect } from "react";
import { faCheck,faTimes,faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css';
import Login from "./Login";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import instance from "../api/axios";
import { Routes, Route, Navigate } from "react-router-dom";
import React from 'react'
import { Button } from "@mui/material";
const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'api/Authenticate/register';


const Register = (props) => {

    const userRef=useRef();
    const errRef=useRef();
    const [username,setUsername]=useState('');
    const [validName,setValidName]=useState('');
    const [usernameFocus,setUsernameFocus]=useState(false);



    const [email,setEmail]=useState('');
    const[validEmail,setValidEmail]=useState(false);
    const[emailFocus,setEmailFocus]=useState(false);

    const [password,setPassword]=useState('');
    const[validPassword,setValidPassword]=useState(false);
    const[paswordFocus,setPasswordFocus]=useState(false);

    const [matchPwd,setMatchPwd]=useState('');
    const[validMatch,setValidMatch]=useState(false);
    const[matchFocus,setMatchFocus]=useState(false);
   
    const [errMsg,setErrMsg]=useState('');
    const [success,setSuccess]=useState(false);


    useEffect(() => {
        userRef.current.focus();
    },[])
    useEffect(() => {
        const result =USERNAME_REGEX.test(username);
        console.log(result);
        console.log(username);
        setValidName(result);
    } ,[username])

    useEffect(() => {
        const result =EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    } ,[email])

    useEffect(() => {
        const result =PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match =password===matchPwd;
        setValidMatch(match);
    } ,[password,matchPwd])

    useEffect(() => {
        setErrMsg('');
    },[username,email,password,matchPwd])

    const handleSubmit = async (e)  => {
        e.preventDefault();
        const v1=USERNAME_REGEX.test(username);
        const v2=EMAIL_REGEX.test(email);
        const v3=PWD_REGEX.test(password);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
             return;
        }
        try {
            const response =await instance.post(REGISTER_URL,{username,email, password});
            console.log(JSON.stringify(response?.data))
            const roles=response?.data?.roles;
            setSuccess(true);
            setUsername('');
            setEmail('');
            setPassword('');
            setMatchPwd('');


        }catch (err)
        {if(!err?.response){
            setErrMsg('No Server Response');
        }else if(err.response?.status ===409){
            setErrMsg('Email Taken');
        }else {
            setErrMsg('Registration Failed');
        }
        errRef.current.focus();

        }
        
    }

  return (
    <>
         {success ?  (
            <section>
                <h1> Success ! </h1>
                <p>
                <Button onClick={props.toggle}>Sign In</Button>
                </p>  
                
            </section>
            ):(
   <section>

            <p ref={errRef} className={errMsg ? "errmsg" :
            "offscreen"} aria-live= "assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon ={faCheck} />
                    </span>
                    <span className={validName || !username ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
                />
                <p id="uidnote" className={usernameFocus && username && !validName ? "instructions":"offscreen"}>
                    <FontAwesomeIcon icon ={faInfoCircle} />
                    4 to 24 characters. <br />
                    Must begin with a letter. <br/>
                    Letters,numbers underscores,hyphens allowed.
                </p>



                <label htmlFor="email">
                    Email:
                    <span className={validEmail ? "valid" : "hide"}>
                        <FontAwesomeIcon icon ={faCheck} />
                    </span>
                    <span className={validEmail || !email ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input type="text"
                id="email"
                
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                />
                <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions":"offscreen"}>
                    <FontAwesomeIcon icon ={faInfoCircle} />
                    Email must contain @. <br />
                    Must begin with a letter. <br/>
                    Letters,numbers underscores,hyphens allowed.
                </p>


               < label htmlFor="Password">
                    Password:

                    <span className={validPassword ? "valid" : "hide"}>
                        <FontAwesomeIcon icon ={faCheck} />
                    </span>
                    <span className={validPassword || !password ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input type="password"
                id="password"
               
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                />

                <p id="pwdnote" className={paswordFocus && !validPassword ? "instructions" : 
                "offscreen"} >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br/>
                    Must include uppercase and lowercase letters,a number and a special 
                    character.<br/>
                    Allowed special characters:<span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                    <span aria-label ="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                </p>
                <label htmlFor="confirm_pwd">
                    Confirm Password:
                        <FontAwesomeIcon icon={faCheck} className={validMatch && !matchPwd ? "valid" :"hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />

                    
                </label>
                <input type="password"
                id="confirm_pwd"
               
                autoComplete="off"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions " : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first input field
                </p>
                <button disabled={!validName || !validEmail || !validPassword || !validMatch ? true:false}>sign Up</button>


            </form>
            <p> Already registred? <br />
            <span >
                
                <Button onClick={props.toggle}>Sign In</Button>
                </span>
                </p>

    </section>
    )}
    </>
  )
}

export default Register;