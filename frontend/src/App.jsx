import React, { useContext, useState } from 'react'
import Allroutes from './component/Allroutes'
import Navbar from './component/Navbar'
import { AuthContext } from './context/AuthContextProvider'

function App() {
  const {isLogin}=useContext(AuthContext)
  return (
    <>
    {isLogin&&<Navbar/>}
    <Allroutes/>
    </>
  )
}

export default App
