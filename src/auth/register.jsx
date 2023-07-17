import React ,{Component}from 'react';
import './style.scss';
import axios from "axios"
import loginImg from './loginImg.svg';
export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state={
      username:"",
      email:"",
      password:""
    }
  
     }
    componentDidMount() {
      const headers={
        'Authorization':'Bearer my-token',
        'My-Custom-Header':'foobar'
      }
    axios.post("https://localhost:7271/register",{headers}).then(response => {
   this.setState({id:response.data.id})
      
     });
  
 
    }
  

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">

          <div>
        <span>{this.state.username} - {this.state.email}</span>
      </div>


            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input   type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input  type="email" name="email" placeholder="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input  type="text" name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            Register
          </button>
        </div>
      </div>
    );
  }
}
