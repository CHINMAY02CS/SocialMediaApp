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

  const loginStatusMobile = ()=>{
    const token = localStorage.getItem("jwt")
    if(login||token){
      return [
        <>
        <Link to="/">
            <li><span class="material-symbols-outlined">
home
</span></li>
        </Link>
          <Link to ="/profile"><li><span class="material-symbols-outlined">
account_circle
</span></li></Link>     
          <Link to ="/createPost"><li><span class="material-symbols-outlined">
add_box
</span></li></Link>     
          <Link to ="/followingpost"><li><span class="material-symbols-outlined">
explore
</span></li></Link>     
          <Link to ={""}> <li  onClick={()=>setmodalOpen(true)}>
          <span class="material-symbols-outlined">
logout
</span>
          </li> </Link>     
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
        <img 
        id='insta-logo'
        src={logoinsta} alt="" onClick={()=> {navigate("/")}} />
        <ul className='nav-menu'>
            {loginStatus()}
         </ul>
        <ul className='nav-mobile'>
            {loginStatusMobile()}
         </ul>
    </div>
  )
}

