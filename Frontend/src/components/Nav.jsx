import React, { useState } from 'react'
import { IoIosArrowForward, IoIosSearch } from "react-icons/io";
import { PiSlidersLight } from "react-icons/pi";
import { IoAddCircle, IoCalendarOutline } from "react-icons/io5";
import { GoInbox } from "react-icons/go";
import { BsCalendarDate } from "react-icons/bs";
import AddTask from './AddTask';
import { NavLink } from 'react-router';

function Nav({ setNav }) {
    const [addTaskForm, setAddTaskForm] = useState(false)

    const toggleTaskForm = () => {
        setAddTaskForm(!addTaskForm)
    }

    const [userMenu, setUserMenu] = useState(false)

    const toggleUserMenu = () => {
        setUserMenu(!userMenu)
    }

    return (
        <div className='w-full bg-[#fcfaf8] py-3 px-5 grid gap-4 justify-items-start'>
            <div className='w-full flex items-center justify-between'>
                <div onClick={toggleUserMenu} className='flex items-center gap-1 text-sm cursor-pointer'>
                    <p>Piyush</p>
                    <IoIosArrowForward className='rotate-90' />
                </div>
                <div className={`fixed w-full bg-white top-10 ${userMenu ? "flex" : "hidden"} flex-col justify-center items-center gap-2 py-4`}>
                    <button className='bg-red-500 px-2 py-1 rounded text-[#fff] hover:bg-red-600'>Log Out</button>
                </div>
                <div className='cursor-pointer'>
                    <PiSlidersLight onClick={() => setNav(false)} size={25} />
                </div>
            </div>
            <div onClick={toggleTaskForm} className='w-full flex gap-2 cursor-pointer hover:bg-gray-300 p-1 rounded transition duration-200'>
                <IoAddCircle size={25} color='#dc4c3e' />
                <p className='text-[#a81f00] font-semibold'>Add task</p>
            </div>
            <div className='flex flex-col gap-3 text-sm text-gray-600 w-full'>
                <NavLink to='search' className={({ isActive }) => `w-full flex gap-2 cursor-pointer  px-1.5 py-1.5 rounded transition duration-200 ${isActive ? "bg-[#ffefe5] text-[#a81f00]" : "hover:bg-gray-100"}`}>
                    <IoIosSearch size={20} />
                    <p>Search</p>
                </NavLink>
                <NavLink to='inbox' className={({ isActive }) => `w-full flex gap-2 cursor-pointer  px-1.5 py-1.5 rounded transition duration-200 ${isActive ? "bg-[#ffefe5] text-[#a81f00]" : "hover:bg-gray-100"}`}>
                    <GoInbox size={20} />
                    <p>Inbox</p>
                </NavLink>
                <NavLink to='today' className={({ isActive }) => `w-full flex gap-2 cursor-pointer  px-1.5 py-1.5 rounded transition duration-200 ${isActive ? "bg-[#ffefe5] text-[#a81f00]" : "hover:bg-gray-100"}`}>
                    <BsCalendarDate size={20} />
                    <p>Today</p>
                </NavLink>
                <NavLink to='upcoming' className={({ isActive }) => `w-full flex gap-2 cursor-pointer  px-1.5 py-1.5 rounded transition duration-200 ${isActive ? "bg-[#ffefe5] text-[#a81f00]" : "hover:bg-gray-100"}`}>
                    <IoCalendarOutline size={20} />
                    <p>Upcoming</p>
                </NavLink>
            </div>
            {addTaskForm ? <AddTask setForm={setAddTaskForm} /> : null}
        </div>
    )
}

export default Nav