import { useEffect,useState } from "react";
import React from "react";
import logoinsta from "../images/logoinsta.png";
import "../css/SignUp.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
  const navigate = useNavigate()
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [userName,setuserName] = useState("");


  //Toast functions

  const notifyA = (msg)=>toast.error(msg)
  const notifyB = (msg)=>toast.success(msg)

  const emailRegex = /^\w+([\.-]?\w)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@\$%\^&\*])(?=.{8,})/

  const postData = ()=>{

    //checking email
    if(!emailRegex.test(email))
    {
      notifyA("Invalid email")
      return
    }else if(!passRegex.test(password)){
      notifyA("Password must contain atleast 8 characters, including at least 1 number and one  uppcase and lowercase letters and special characters")
      return
    }
    

    //sending data to server
    fetch("/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
        userName:userName,
        password:password,
        email:email
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        notifyA(data.error)
      }
      else{
        notifyB(data.message)
        navigate("/signin")
      }
      
      console.log(data)})
  }
  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
          <img className="signUpLogo" src={logoinsta} alt="Signuplogo" />
          <p className="loginPara">
            Sign Up to see photos and videos <br /> from your friends
          </p>
          <div>
            <input type="email" name="email" value={email} id="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
          </div>
          <div>
            <input type="text" name="name" id="name" value={name} placeholder="Full Name" onChange={(e)=>{setName(e.target.value)}} />
          </div>
          <div>
            <input
              type="text"
              name="username"
              id="username"
              value={userName}
              placeholder="User Name"
              onChange={(e)=>{setuserName(e.target.value)}}
            />
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
          <p
            className="loginPara"
            style={{ fontSize: "12px", margin: "3px 0px" }}
          >
            By signing up, you agree to our Terms, <br /> privacy policy and
            cookies policy.
          </p>
          <input type="submit" value="Sign Up" id="submit-btn" 
            onClick={()=>{postData()}}
          />
        </div>
        <div className="form2">
            Already have an accout?
            <Link to="/signin">
            <span style={{color:'blue', cursor:'pointer'}}>  Sign In</span>
            </Link>
        </div>
      </div>
    </div>
  );
}
