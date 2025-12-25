import React, { createContext, useState } from 'react'

export const dataContext  = createContext()

export let user = {
    data:null,
    mime_type:null,
    imgUrl:null
}

export let prevUser = {
    data:null,
    mime_type:null,
    prompt:null,
    imgUrl:null
}

function UserContext({children}) {

    let [startRes,setStartRes] = useState(false)
    let [input,setInput] = useState("")
    let [feature,setFeature] = useState("chat")
    let [showResult,setShowResult] = useState("")

    let value={
        startRes,setStartRes,
        input,setInput,
        feature,setFeature,
        showResult,setShowResult
    }

  return (
    <div>
        <dataContext.Provider value={value}>
        {children}
        </dataContext.Provider>
    </div>
  )
}

export default UserContext