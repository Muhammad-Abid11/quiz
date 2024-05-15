import React from 'react'

export default function Progress({score,color='red'}) {
  console.log("color",color)
  // color="red"
  return (
    <div>        
  
    <div class="w-full  rounded-full h-2.5 overflow-hidden border-solid border-2 border-black ">
      <div
        className={`bg-${color}-600 h-2.5 rounded-full `}
        
        style={{ width: `${score}%` }}
      ></div>
    </div>

    
    </div>
  )
}
