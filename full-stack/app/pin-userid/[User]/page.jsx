'use client'
import React, { useState,useEffect } from 'react'
import PinImage from '@/app/components/PinDetail/PinImage';
import PinInfo from '@/app/components/PinDetail/PinInfo';
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useRouter } from 'next/navigation';

  function page({params}) {
   
const router = useRouter();


      
     
      const [userInfo2 ,setUserInfo2]=useState();
        useEffect(()=>{
          if(params){
            async function getdata() {
              const data = await params;
              
            
              getuserPin(data.User);
            }
            getdata();
               
          }
    
        },[params])
    
    
    const getuserPin =async (email) =>{
    
      const res = await fetch(`https://saikingnext-git-main-saiprasads-projects-5a7842c7.vercel.app/api/userId/${email}`,{cache:"no-store"});
      const userPin = await res.json();
      if(userPin===null){
    
      }else{
        setUserInfo2(userPin.ok);
     
      }
     
    }
  return (<>
    {userInfo2? 
      <div className=' bg-white p-3 md:p-12 rounded-2xl md:px-24 lg:px-36'>
          <HiArrowSmallLeft className='text-[60px] font-bold ml-[-50px] 
          cursor-pointer hover:bg-gray-200 rounded-full p-2 '
          onClick={()=>router.back()}/>
         <div className='grid grid-cols-1 lg:grid-cols-2 md:gap-10 shadow-lg
         rounded-2xl p-3 md:p-7 lg:p-12 xl:pd-16 ' 
         >
        
           <PinImage pinDetail={userInfo2} />
           <div className="">
           <PinInfo pinDetail={userInfo2}/>
           </div>
           </div>
       </div>:null}</>
  )
}

export default page
