import React, { useState } from 'react'
import TipTap from './components/TipTap'
import './App.css'
import MultiEditor from './components/MultiEditor'
// import Image from './components/Image'
import parser from "html-react-parser"

const App = () => {
  const [desc, setDesc] = useState("");
  return (
    <div>
      <TipTap setDesc={setDesc}/>
      <div className='ProseMirror'>
        {parser(desc)}
      </div>
      {/* <MultiEditor/> */}
    </div>
  )
}

export default App
