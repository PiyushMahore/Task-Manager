import React, { useState } from 'react'
import { IoIosArrowForward, IoIosSearch } from "react-icons/io";
import { PiSlidersLight } from "react-icons/pi";
import { IoAddCircle, IoCalendarOutline } from "react-icons/io5";
import { GoInbox } from "react-icons/go";
import { BsCalendarDate } from "react-icons/bs";
import AddTask from './AddTask';

function Nav() {
    const [addTaskForm, setAddTaskForm] = useState(false)

    const toggleTaskForm = () => {
        setAddTaskForm(!addTaskForm)
    }

    return (
        <div className='w-full bg-[#fcfaf8] py-3 px-5 grid gap-4 justify-items-start'>
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center gap-1 text-sm cursor-pointer'>
                    <p>Piyush</p>
                    <IoIosArrowForward className='rotate-90' />
                </div>
                <div className='cursor-pointer'>
                    <PiSlidersLight size={25} />
                </div>
            </div>
            <div onClick={toggleTaskForm} className='w-full flex gap-2 cursor-pointer hover:bg-gray-300 p-1 rounded transition duration-200'>
                <IoAddCircle size={25} color='#dc4c3e' />
                <p className='text-[#a81f00] font-semibold'>Add task</p>
            </div>
            <div className='flex flex-col gap-3 px-1 text-sm text-gray-600 w-full'>
                <div className='w-full flex gap-2 cursor-pointer hover:bg-gray-300 p-1 rounded transition duration-200'>
                    <IoIosSearch size={20} />
                    <p>Search</p>
                </div>
                <div className='w-full flex gap-2 cursor-pointer hover:bg-gray-300 p-1 rounded transition duration-200'>
                    <GoInbox size={20} />
                    <p>Inbox</p>
                </div>
                <div className='w-full flex gap-2 cursor-pointer hover:bg-gray-300 p-1 rounded transition duration-200'>
                    <BsCalendarDate size={20} />
                    <p>Today</p>
                </div>
                <div className='w-full flex gap-2 cursor-pointer hover:bg-gray-300 p-1 rounded transition duration-200'>
                    <IoCalendarOutline size={20} />
                    <p>Upcoming</p>
                </div>
            </div>
            {addTaskForm ? <AddTask setForm={setAddTaskForm} /> : null}
        </div>
    )
}

export default Nav