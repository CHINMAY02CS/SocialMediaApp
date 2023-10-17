import React from 'react'
import { useState, useEffect, useRef } from 'react'

export default function ProfilePic({changeprofile}) {
    
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    
    const hiddenFileIn = useRef(null)

    const postDetails = ()=>{
      
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
      console.log(url)

      
    }


    const postPic = ()=>{
    
      fetch("/uploadProfilePic",{
        method:"put",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
         pic:url
        })
      }).then((res)=>res.json())
      .then((data)=>{
        console.log(data)
        changeprofile()
        window.location.reload()
    })
      .catch(err=>console.log(err))
    }
    
    
    
    const handleClick = ()=>{
        hiddenFileIn.current.click()
    }

    useEffect(() => {
        if(image){
            postDetails()
        }
       
    }, [image]);

    useEffect(() => {
        if(url){
            postPic()
        }
       
    }, [url]);
  
    return (
    <div className='profilePic darkBg'>
      <div className="changePic centered">
        <div>
            <h3>Change Profile Photo</h3>
        </div>
        <div style={{borderTop:" 1px solid #00000030"}}>
            <button className="upload-btn" style={{color:"#0095F6"}} onClick={handleClick}>Upload Photo</button>
            <input type="file" ref={hiddenFileIn} accept='image/*' style={{display:"none"}}  onChange={(e)=>{setImage(e.target.files[0])}} />
        </div>
        <div  style={{borderTop:" 1px solid #00000030"}}>
            <button className='upload-btn' style={{color:"#ED4956"}}
            onClick={()=>{
                setUrl(null)
                postPic() 

            }}
            >Remove current Photo</button>
        </div>
        <div  style={{borderTop:" 1px solid #00000030"}}>
            <button onClick={changeprofile}  style={{background:"none", border:"none",cursor:"pointer",fontSize:"15px", color:"Black"}} >Cancel</button>
        </div>
      </div>
    </div>
  )
}
