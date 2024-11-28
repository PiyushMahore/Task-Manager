import './App.css'
import Nav from './components/Nav'
import { Outlet } from 'react-router'

function App() {

  return (
    <div className='w-screen h-screen flex'>
      <div className='w-[20%] h-full bg-[#fcfaf8]'>
        <Nav />
      </div>
      <div className='w-[80%] h-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default App
