import './style.scss';
import loginImg from './loginImg.svg';
import { useNavigate } from 'react-router-dom';
import React from 'react'

function Login(props) {
  const navigate = useNavigate();
  const navigateToDashboard = ()=>{
    navigate('/',{
      replace:true,
    })
  }
  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" />
          </div>
        </div>
      </div>
      <div className="footer">
      
        <button onClick={navigateToDashboard} type="submit" className="btn"  >
           
          Login
        </button>
      
      </div>
    </div>
  );
}

export default Login