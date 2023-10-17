import React from 'react'
import { useState,useEffect } from 'react'
import '../css/CreatePost.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const notifyA = (msg)=>toast.error(msg)
  const notifyB = (msg)=>toast.success(msg)

export default function CreatePost() {

    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const navigate = useNavigate()
    
    useEffect(() => {
      //saving post to mongoDB
      if(url){
      fetch("/createPost",{
        method:"post",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          body,
          pic:url
        })
      }).then(res=>res.json())
      .then(data=>{if(data.error){
        notifyA(data.error)
      }else{
        notifyB("Successfully posted ")
        navigate("/")
      }})
      .catch(err=>console.log(err))
    }
  }, [url]);

    //posting image to cloudinary
    const postDetails = ()=>{
      console.log(body,image)
      const data = new FormData()
      data.append("file",image)
      data.append("upload_preset","insta-clone")
      data.append("cloud_name","chinmaycloud")
      fetch("https://api.cloudinary.com/v1_1/chinmaycloud/image/upload",{
        method:"post",
        body:data
      }).then(res=>res.json())
      .then(data=>setUrl(data.url))
      .catch(err=>console.log(err))

      
    }

    const loadfile =(event)=>{
        var output = document.getElementById('output')
        output.src = URL.createObjectURL(event.target.files[0])
        output.onload =function(){
            URL.revokeObjectURL(output.src)
        }
    }
  
    return (
    <div className='createPost'>
    {/* header */}
      <div className="post-header">
        <h4 style={{margin:"3px auto"}}>Create a new post</h4>
        <button id='post-btn' onClick={()=>{postDetails()}}>Share</button>
      </div>
      {/* image preview */}
      <div className="main-div">
      <img id='output' src='https://png.pngtree.com/png-vector/20190330/ourmid/pngtree-vector-picture-icon-png-image_890152.jpg' />
        <input type="file"  accept='image/*' onChange={(event)=>{
            loadfile(event)
            setImage(event.target.files[0])
        }}/>
      </div>
    {/* details */}
    <div className="details">
        <div className="card-header">
            <div className="card-pic">
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
            </div>
        <h5>Chinmay</h5>
        </div>
        <textarea value={body} onChange={(e)=>{
          setBody(e.target.value)
        }} type="text" placeholder='Write a caption'></textarea>
    </div>

    </div>
  )
}
