import React, { useContext, useRef, useState } from 'react'
import { FaFileUpload } from "react-icons/fa";
import { FaImages } from "react-icons/fa";
import { IoChatboxOutline } from "react-icons/io5";
import { dataContext, prevUser, user } from '../context/UserContext';
import { FaPlusCircle } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import Chat from './Chat';
import { generateResponse } from '../gemini';
import { query } from '../huggingFace';

function Home() {

    let {startRes,setStartRes,input,setInput,feature,setFeature,showResult,setShowResult} = useContext(dataContext)
    
    const textarea = useRef()
    const [show,setShow] = useState(false)
    const [src,setSrc] = useState("")
    

    const handleInput = ()=>{
        const el = textarea.current;
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px"
    }

    function handleImage(e){
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onload=(event)=>{
           let base64 = event.target.result.split(",")[1]
           user.data=base64
           user.mime_type = file.type
           user.imgUrl = `data:${user.mime_type};base64,${user.data}`
           setSrc(user.imgUrl)
        }
        reader.readAsDataURL(file)
    }

    async function handleSubmit(e){
        e.preventDefault()
        setStartRes(true)
        setShowResult("")
        prevUser.data = user.data
        prevUser.mime_type = user.mime_type
        prevUser.imgUrl = user.imgUrl
        prevUser.prompt = input
        let result = await generateResponse()
        setShowResult(result)
        setFeature("chat")
        setInput("")
        setSrc("")
        user.data=null
        user.mime_type = null
        user.imgUrl = null
    }

    async function handlegenImage() {
        setStartRes(true)
        setShowResult("Sorry! There is no such api that provides unlimited free service for text to image generation")
        prevUser.prompt=input
        setInput("")
        setFeature("chat")
    }

  return (
    <div className='w-full h-full bg-black text-white '> 
        <div className='w-full h-[100px] p-[20px]'>
            <div className='text-white font-semibold text-[30px] cursor-pointer'
            onClick={()=>{
                setStartRes(false)
                setFeature("chat")
            }}>AI bot with gemini API</div>
        </div>

        {!startRes?
            <div className='w-full md:h-[550px] h-[550px] flex flex-col items-center justify-center'>
                <div className='md:w-[500px] w-[300px] h-[70px] flex text-[30px]
                justify-center items-center mb-[20px] font-bold'>
                    What's on your mind?
                </div>
                <div className='w-full flex max-[600px]:flex-col items-center justify-center gap-[30px]'>
                    <div>
                        <span className='h-[50px] w-[200px] flex items-center justify-center cursor-pointer
                        border-2 border-white rounded-2xl gap-[10px] hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]
                        ' onClick={()=>{
                            setFeature("upImage")
                            document.getElementById('inputImg').click()
                        }}
                        ><span className='text-green-500'><FaFileUpload /></span>Upload Image</span>
                    </div>
                    <div>
                        <span className='h-[50px] w-[200px] flex items-center justify-center cursor-pointer
                        border-2 border-white rounded-2xl gap-[10px] hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]
                        ' onClick={()=>setFeature("genImage")}
                        ><span className='text-blue-500'><FaImages /></span>Generate Image</span>
                    </div>
                    <div>
                        <span className='h-[50px] w-[200px] flex items-center justify-center 
                        border-2 border-white rounded-2xl gap-[10px] hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]
                        ' onClick={()=>setFeature("chat")}
                        ><span className='text-orange-500'><IoChatboxOutline /></span>Chat</span>
                    </div>
                </div>
            </div>
            :
            <Chat/>
        }

        <div className='w-full md:h-[170px] h-[170px] flex items-center justify-center'>
            <input type="file" accept='image/*' hidden id='inputImg' onChange={handleImage}/>
            <form className='w-full h-full gap-[20px] flex items-center justify-center pt-[10px] relative'
            onSubmit={(e)=>{
                if(feature=="genImage"){
                    e.preventDefault()
                    handlegenImage()
                }else{
                    handleSubmit(e)
                }
                }}>
                <img src={src} alt="" className='w-[50px] left-[10px] top-[10px] md:left-[35%]
                absolute z-[50]' />
                <div className='relative'>
                    {show &&
                    <div className='w-[150px] h-[80px] absolute border-2 border-white bottom-[35px]
                    rounded-xl'>
                        <div>
                            <span className='h-[40px] w-[150px] flex items-center justify-center cursor-pointer
                            ' onClick={()=>{
                                document.getElementById('inputImg').click()
                                setFeature("upImage")
                                setShow(false)
                            }}
                            ><span className='text-green-500'><FaFileUpload /></span>Upload Image</span>
                        </div>
                        <div>
                            <span className='h-[40px] w-[150px] flex items-center justify-center cursor-pointer
                            ' onClick={()=>{
                                setFeature("genImage")
                                setShow(false)
                            }}
                            ><span className='text-blue-500'><FaImages /></span>Generate Image</span>
                        </div>
                    </div>}
                    {feature=="chat" &&
                    <FaPlusCircle className='w-[25px] h-[25px]' onClick={()=>setShow(prev=>!prev)}/>
                    }
                    {feature=="upImage" &&
                    <FaFileUpload className='w-[25px] h-[25px]' onClick={()=>setShow(prev=>!prev)}/>
                    }
                    {feature=="genImage" &&
                    <FaImages className='w-[25px] h-[25px]' onClick={()=>setShow(prev=>!prev)}/>
                    }
                </div>
                <textarea placeholder='Ask me question?'className='border-2 border-white p-2 rounded-xl
                md:w-[350px] w-[250px] overflow-hidden' rows={1} ref={textarea} onInput={handleInput}
                onChange={(e)=>setInput(e.target.value)} value={input}/>
                {input.trim() &&
                <button>
                    <IoSend className='w-[25px] h-[25px]'/>
                </button>
                }
            </form>
        </div>
    </div>
  )
}

export default Home