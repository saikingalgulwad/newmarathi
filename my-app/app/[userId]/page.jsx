'use client'
import React, { useEffect, useState } from 'react'
import UserInfo from '../components/UserInfo';
import PinList from '../components/pins/PinList';

function page({params}) {
  const [userId,setUserId]=useState(null)
  const [userInfo ,setUserInfo]=useState()
  const [userInfo2 ,setUserInfo2]=useState()
    useEffect(()=>{
      if(params){
        async function getdata() {
          const data = await params;
          getUserInfo(data.userId.replace('%40','@'));
        
          getuserPin(data.userId.replace('%40','@'));
        }
        getdata();
           
      }

    },[params])


const getuserPin =async (email) =>{

  const res = await fetch(`https://full-stack-v3px.vercel.app/api/usersPost?search=${email}`,{cache:"no-store"});
  const userPin = await res.json();
  if(userPin===null){

  }else{
    setUserInfo2(userPin.data);
  }
 
}

   const getUserInfo= async(email) =>{
   
   const res = await fetch(`http://localhost:3000/api/users/${email}`,{cache:"no-store"});
   const datauser = await res.json();
   if(datauser===null){
    
   }
   else{
    setUserInfo(datauser.ok);
   }
   }
 

  return (
    <div>
    {userInfo? <UserInfo userInfo={userInfo} />:null}
   {userInfo2?  <PinList userInfo2={userInfo2} />:null}
    </div>
  )
}

export default page
