'use client'
import React, { useState } from 'react'  
  import { CldUploadWidget } from 'next-cloudinary';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation'



function UploadFile() {
  const [file,setFile]=useState();
  const [song,setSong]=useState();
  const [songName,setSongName]=useState();
  const router=useRouter();



  const onSave=()=>{
      
 
    uploadFile();


 }

 const uploadFile=async()=>{
 
   let req= await fetch("https://marathi-rap-git-main-saiprasads-projects-5a7842c7.vercel.app/api/usersPost",{
      method:"POST",
      body: JSON.stringify({ file:file,songName:songName,song:song }),
    })
   if(req=='ok'){ router.push('/');}
    
   
   
  }

  return (
             
      <div className='flex flex-col gap-5 justify-center items-center'>
        {
          file? <h1>{file}</h1>:<h1>it is not file</h1>
        }
        {
          song? <h1>{song}</h1>:<h1>it is not song</h1>
        }
        {
          songName? <h1>{songName}</h1>:<h1>it is not song</h1>
        }
         <CldUploadWidget uploadPreset="marathi" onSuccess={(result)=>setFile(result?.info?.url)}>{({ open }) => {
    return (
      <button className='bg-gray-950 border text-gray-50 rounded-lg' onClick={() => open()}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget><br/>
         <CldUploadWidget uploadPreset="musicFile" onSuccess={(result)=>setSong(result?.info?.url)}>{({ open }) => {
    return (
      <button className='bg-gray-950 border text-gray-50 rounded-lg' onClick={() => open()}>
        Upload an Song
      </button>
    );
  }}
</CldUploadWidget>
<input type="text" placeholder='Add your title'
            onChange={(e)=>setSongName(e.target.value)}
        className='text-[35px] outline-none font-bold w-[40%]
        border-b-[2px] border-gray-400 placeholder-gray-400'/>

        <Button onClick={()=>onSave()}>Save</Button>


    </div>
  )
}

export default UploadFile
