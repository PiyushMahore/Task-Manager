import './App.css'
import Nav from './components/Nav'
import { Outlet } from 'react-router'
import { PiSlidersLight } from "react-icons/pi";
import { useState } from 'react';

function App() {
  const [nav, setNav] = useState(false)

  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <div className='w-screen h-screen flex lg:flex-row flex-col'>
      <div className={`lg:w-[20%] w-[300px] lg:translate-x-0 ${nav ? "translate-x-0 z-50" : "-translate-x-full"} absolute lg:static h-full bg-[#fcfaf8] transition-all duration-500 ease-in-out`}>
        <Nav setNav={setNav} />
      </div>
      <div className='cursor-pointer lg:hidden m-4'>
        <PiSlidersLight onClick={handleNav} size={25} />
      </div>
      <div className='w-full h-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default App
