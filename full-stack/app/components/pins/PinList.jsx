import React from 'react'
import PinItem from './PinItem';

function PinList({userInfo2}) {
    
    
 
  return (
    <div className=' mt-7 px-2 md:px-5 columns-2 md:columns-3 lg:columns-3 xl:columns-4 space-y-6 mx-auto  '>
     {
       userInfo2.map((item,index)=>(
        <div key={index}>
         <PinItem pin={item} />
        </div>
       ))
     }
    </div>
  )
}

export default PinList
