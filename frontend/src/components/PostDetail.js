import React from 'react'
import '../css/PostDetail.css'

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
export default function PostDetail({item, toggleDetails}) {
  
  const notifyA= (msg) =>toast.error(msg)
  const notifyB= (msg) =>toast.success(msg)
    const navigate= useNavigate()
  const removePost =(postId)=>{
    console.log(postId)
    if(window.confirm("Are you sure you want to delete this post")){
        fetch(`/deletePost/${postId}`,{
        method:"delete",
        headers:{
        "Content-Type":"application/json",
        Authorization:"Bearer "+localStorage.getItem("jwt")
      }
    })
    .then((res)=>res.json())
    .then((result)=>{
        console.log(result)
        toggleDetails()
        navigate("/")
        notifyB(result.message)
    })
}
  }
  
    return (
    <div className="showComment">
      <div className="container">
        <div className="postPic">
          <img src={item.photo} alt="pic" />
        </div>

        <div className="details">
        <div className="card-header" style={{borderBottom:"1px solid #00000029"}}>
        <div className="card-pic">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="pp" />
        </div>
        <h5>{item.postedBy.name}</h5>
        <div className="deletePost" onClick={()=>{removePost(item._id)}}>
        <span className="material-symbols-outlined">
delete
</span>
        </div>
      </div>
      {/* commentSection */}
      <div className="comment-section" style={{borderBottom:"1px solid #00000029"}}>
        {
          item.comments.map((comment)=>{
           return( <p className="comm">
          <span className="commenter" style={{fontWeight:"bolder"}}>{comment.postedBy.name}{" "}  </span>
          <span className="commentText">{comment.comment}</span>
        </p>)
          })
        }
        
        <p className="comm">
          <span className="commenter" style={{fontWeight:"bolder"}}>Ramesh  </span>
          <span className="commentText">Awesome Pic</span>
        </p>
      </div>
      <div className="card-content">      
      
      <p>{item.likes.length} Likes</p>
      <p>{item.body}</p>
      </div>
      <div className="add-comment">
      <span className="material-symbols-outlined">mood</span>
      <input type="text" placeholder='Add a comment' 
    //   value={comment} onChange={(e)=>{setComment(e.target.value)}} 
    />
      <button className='comment' 
    //   onClick={()=>{makeComment(comment,item._id); toggleComment()}}  
      >Post</button>
      </div>

        </div>
      </div>
      <div className="close-comment" 
       onClick={()=>{toggleDetails()}}
      >
      <span className="material-symbols-outlined material-symbols-outlined-comment">
close
</span>
      </div>
    </div>
  )
}
