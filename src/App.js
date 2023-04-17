import React, { useState } from 'react'
import TipTap from './components/TipTap'
import './App.css'
// import Image from './components/Image'
import parser from "html-react-parser"

const App = () => {
  const [desc, setDesc] = useState("");
  return (
    <div>
      <TipTap setDesc={setDesc}/>
      {/* <Image/> */}
      <div className='ProseMirror'>
        {parser(desc)}
      </div>
    </div>
  )
}

export default App
