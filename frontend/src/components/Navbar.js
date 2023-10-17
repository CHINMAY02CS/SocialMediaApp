import React from 'react'
import { useContext } from 'react'
import { LoginContext } from '../context/loginContext'
import logoinsta from '../images/logoinsta.png'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Navbar({login}) {
  const navigate= useNavigate()
  const {setmodalOpen} = useContext(LoginContext)
  const loginStatus = ()=>{
    const token = localStorage.getItem("jwt")
    if(login||token){
      return [
        <>
          <Link to ="/profile"><li>Profile</li></Link>     
          <Link to ="/createPost"><li>Create Post</li></Link>     
          <Link to ="/followingpost"><li>My Following Posts</li></Link>     
          <Link to ={""}> <button className="primaryBtn" onClick={()=>setmodalOpen(true)}>
            LogOut
          </button> </Link>     
        </>
      ]
    }
    else{
      return [
        <>
          <Link to ="/signup"><li>Sign Up</li></Link>
            <Link to ="/signin"><li>Sign In</li></Link>
            
        </>
      ]
    }
  }
  
   
  return (
    <div className='navbar'>
        <img src={logoinsta} alt="" onClick={()=> {navigate("/")}} />
        <ul className='nav-menu'>
            {loginStatus()}
         </ul>
    </div>
  )
}

