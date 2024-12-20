'use client'
import { CldUploadWidget } from 'next-cloudinary';
import React, { useState } from 'react'
import { HiArrowUpCircle } from "react-icons/hi2";
function UploadImage({setFile}) {
  


  return (
    <div className='h-[450px] bg-[#e9e9e9]
    rounded-lg'>
    
   <label className='m-5 flex flex-col justify-center items-center
        cursor-pointer h-[90%] 
        border-[2px] border-gray-300 border-dashed rounded-lg text-gray-600 '>
             
          <div className='flex items-center flex-col'>
           <HiArrowUpCircle className='text-[22px]'/>   
           <CldUploadWidget uploadPreset="u3i67quw" onSuccess={(result)=>setFile(result?.info?.url)}>{({ open }) => {
    return (
      <button onClick={() => open()}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>
            </div>
           
           
       
        
        </label>
    </div>
  )
}

export default UploadImage