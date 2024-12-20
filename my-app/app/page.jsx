"use client"



import React, { useEffect, useState } from 'react'

import PinList from './components/pins/PinList'




function page() {
const [userInfo2 ,setUserInfo2]=useState(null)

     useEffect(()=>{
        
          async function getdata() {
           
          
          
            getuserPin();
         
             
        }
  
          getdata();
      },[])

  const getuserPin =async () =>{

    const res = await fetch(`https://full-stack-v3px.vercel.app/api/usersPost/Post`,{cache:"no-store"});
    const userPin = await res.json();
    if(userPin===null){
  
    }else{
      setUserInfo2(userPin.data);
    }
   
  }

  return (
    <div>
     {userInfo2?  <PinList userInfo2={userInfo2} />:null}
    </div>
  )
}

export default page
