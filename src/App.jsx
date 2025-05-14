import Footer from './components/navigation/Footer'
import Header from './components/navigation/Header'

import Main from './components/pages/Main'
import History from './components/pages/History'
import Info from './components/pages/Info'

import { useState } from 'react'
import { Routes, Route } from "react-router";

export default function App() {
  if (!localStorage.getItem("poemus-lang")) localStorage.setItem("poemus-lang", "en")

  const [isEn, setIsEn] = useState(localStorage.getItem("poemus-lang") === "en")
  return (
    <>
      <div className="wrapper flex flex-col justify-center items-center min-h-[100%] flex-grow">
        <Header isEn={isEn} setIsEn={setIsEn}/>
        <div className="flex-grow mt-[150px]">
          <Routes>
            <Route path="/" element={<Main isEn={isEn}/>} />
            <Route path="/history" element={<History isEn={isEn}/>} />
            <Route path="/info" element={<Info isEn={isEn}/>} />
          </Routes>
        </div>
        <Footer isEn={isEn}/>
      </div>
    </>
  )
}
