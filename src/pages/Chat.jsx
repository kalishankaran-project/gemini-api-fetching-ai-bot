import React, { useContext } from 'react'
import { dataContext, prevUser } from '../context/UserContext'

function Chat() {

  let {feature,setFeature,showResult,setShowResult} = useContext(dataContext)

  return (
    <div className='w-full flex flex-col md:h-[550px] h-[550px] p-[20px] gap-[15px] overflow-auto'>
        <div className='w-full border-2 border-white rounded-xl p-[5px]'>
            <img src={prevUser.imgUrl} alt="" className='w-[150px] rounded-xl' />
            <span>{prevUser.prompt}</span>
        </div>
        <div className='w-full border-2 border-gray-700 shadow-gray-700 shadow-[0_0_20px] rounded-xl p-[5px]'>
            
            {showResult ? 
            <span>
            <span>{showResult}</span>
            </span>
            :<span>Loading...</span>}
        </div>
        
    </div>
  )
}

export default Chat 