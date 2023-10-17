import React from 'react'
import '../css/Profile.css'
import { useEffect } from 'react'
import { useState } from 'react'
import PostDetail from './PostDetail'
import { useParams } from 'react-router-dom'

export default function UserProfile() {
    const {userid} = useParams()
  
  const [user, setUser] = useState("");

  const [posts, setPosts] = useState([]);
  const [isFollow, setIsFollow] = useState(false)

  var piclink="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"

const followUser=(userId)=>{
fetch("/follow",{
    method:"put",
    headers: {
        "Content-Type":"application/json",
        Authorization: "Bearer "+ localStorage.getItem("jwt") 
      },
      body:JSON.stringify({
        followId:userId
      })

}).then((res)=>res.json())
.then((data)=>{
    console.log(data)
    setIsFollow(true)
})
}

const unfollowUser=(userId)=>{
    fetch("/unfollow",{
        method:"put",
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer "+ localStorage.getItem("jwt") 
          },
          body:JSON.stringify({
            followId:userId
          })
    
    }).then((res)=>{res.json()})
    .then((data)=>{
        console.log(data)
        setIsFollow(false)
    })
    }

  
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer "+ localStorage.getItem("jwt") 
      }
    })
    .then(res=>res.json())
    .then((result)=>{
        console.log(result)
      setUser(result.user)
      setPosts(result.post)
      if(result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)){
        setIsFollow(true)
      }
    })
  }, [isFollow]);
  
  return (
    <div className='profile'>

    {/* Profile Frame */}
    <div className="profile-frame">
    {/* Profile Pic */}
      <div className="profile-pic">
        <img src={user.Photo?user.Photo:piclink} alt="profilepic" />
      </div>
    {/* Profile Data */}
      <div className="profile-data">
      <div style={{display:"flex",alignItems:"center"}}>
      <h1>{user.name}</h1>
      <button className='followBtn' 
      
      onClick={()=>{
        if(isFollow){
            unfollowUser(user._id)
        }
        else{
            followUser(user._id)}}
        }
        >
        {isFollow? "Unfollow":"Follow"}
      </button>
      </div>
        
        <div className="profile-info" style={{display:"flex"}}>
          <p>{posts.length} posts</p>
          <p>{user.followers? user.followers.length:"0"} Followers</p>
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
      {posts.map((pics)=>{
        return <img key={pics._id} src={pics.photo} 
        // onClick={()=>{toggleDetails(pics)}}
        className='item' />
      })}
      </div>
      {/* {show &&
        <PostDetail item={posts} toggleDetails={toggleDetails} />
      } */}
      
    </div>
  )
}
