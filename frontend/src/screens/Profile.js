import React from 'react'
import '../css/Profile.css'
import { useEffect } from 'react'
import { useState } from 'react'
import PostDetail from '../components/PostDetail'
import ProfilePic from '../components/ProfilePic'

export default function Profile() {
  var piclink="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [changePic, setChangePic] = useState(false);
  const [user, setUser] = useState("");
  const toggleDetails = (posts)=>{
    if(show){
      setShow(false)
    }
    else
    setShow(true)
   setPosts(posts)    
  }

  const changeprofile = ()=>{
    if(changePic){
      setChangePic(false)
    }
    else
    setChangePic(true)
      
  }



  
  useEffect(() => {
    fetch(`/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
      headers: {
        Authorization: "Bearer "+ localStorage.getItem("jwt") 
      }
    })
    .then(res=>res.json())
    .then((result)=>{
      console.log(result)
      setPic(result.post)
      setUser(result.user)
      console.log(pic)
    })
  }, []);
  
  return (
    <div className='profile'>

    {/* Profile Frame */}
    <div className="profile-frame">
    {/* Profile Pic */}
      <div className="profile-pic">
        <img 
        onClick={changeprofile}
        src={user.Photo?user.Photo:piclink} />
      </div>
    {/* Profile Data */}
      <div className="profile-data">
        <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
        <div className="profile-info" style={{display:"flex"}}>
          <p>{pic?pic.length:"0"} posts</p>
          <p>{user.followers?user.followers.length:"0"} Followers</p>
          <p>{user.following?user.following.length:"0"} Following</p>
        </div>
      </div>
    </div>
    <hr style={{
      width:"90%",
      margin:"auto",
      opacity:"0.8",
      margin:"25px auto"
    }} />
    {/* Profile Gallery */}
    <div className="gallery">
      {pic.map((pics)=>{
        return <img key={pics._id} src={pics.photo} 
        onClick={()=>{toggleDetails(pics)}}
        className='item' />
      })}
      </div>
      {show &&
        <PostDetail item={posts} toggleDetails={toggleDetails} />
      }
      {
        changePic && 
        <ProfilePic changeprofile={changeprofile} />
      }
      
    </div>
  )
}
