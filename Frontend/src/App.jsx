import './App.css'
import Nav from './components/Nav'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { PiSlidersLight } from "react-icons/pi";
import { useEffect, useState } from 'react';
import { useUserAuth } from './context/UserContextProvider';

function App() {
  const navigate = useNavigate()
  const useAuth = useUserAuth()
  const location = useLocation()
  const [isAuthPage, setIsAuthPage] = useState(false)
  const [nav, setNav] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      if (useAuth.user) {
        navigate('/')
      }
      useAuth.getCurrentUser()
        .then((user) => {
          if (user?.data._id) {
            navigate('/')
          } else {
            navigate('login')
          }
        })
    }
    checkUser()
  }, [])

  const handleNav = () => {
    setNav(!nav)
  }

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/signup') {
      setIsAuthPage(true)
    } else {
      setIsAuthPage(false)
    }
  }, [location])

  return (
    <div className='w-screen h-screen flex lg:flex-row flex-col'>
      <div className={`${isAuthPage ? "hidden" : "visible"} lg:w-[20%] w-[300px] lg:translate-x-0 ${nav ? "translate-x-0 z-50" : "-translate-x-full"} absolute lg:static h-full bg-[#fcfaf8] transition-all duration-500 ease-in-out`}>
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
