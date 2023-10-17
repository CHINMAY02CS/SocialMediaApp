import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { LoginContext } from '../context/loginContext';
import '../css/SignIn.css'
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import logoinsta from "../images/logoinsta.png";


export default function SignIn() {
  const {setUserLogin} = useContext(LoginContext)
    const navigate = useNavigate()
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
  //Toast functions

  const notifyA = (msg)=>toast.error(msg)
  const notifyB = (msg)=>toast.success(msg)
  const emailRegex = /^\w+([\.-]?\w)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const postData = ()=>{

        //checking email
        if(!emailRegex.test(email))
        {
          notifyA("Invalid email")
          return
        }
        
    
        //sending data to server
        fetch("/signin",{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            password:password,
            email:email
          })
        }).then(res=>res.json())
        .then(data=>{
          if(data.error){
            notifyA(data.error)
          }
          else{
            notifyB("Signed in successfully")
            console.log(data)
            localStorage.setItem("jwt",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            setUserLogin(true)
            navigate("/")
          }
          
          console.log(data)})
      }

    return (
    
    <div className='signIn'>
    <div>
        <div className="loginForm">
            <img className="signUpLogo" src={logoinsta} alt="Signuplogo" />
            <div>
            <input type="email" name="email" value={email} id="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
            <input type="submit" value="Sign In" id='login-btn' onClick={()=>{postData()}}/>
        </div>
        <div className="loginForm2">
            Don't have an account?
            <Link to="/signup">
            <span style={{color:'blue', cursor:'pointer'}}>  Sign Up</span>
            </Link>
        </div>
    </div>      
    </div>
  )
}
