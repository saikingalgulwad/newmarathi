
import Image from 'next/image'


import React from 'react'


function Listes({card}) {


  return (

          
       
           <div
         
              className="bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 hover:scale-105 transform"
            >
              <Image
                src={card.file}
                alt={card.songName}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-center text-white">{card.songName}</h2>
              </div>
            </div>


      
    
  )
}

export default Listes
