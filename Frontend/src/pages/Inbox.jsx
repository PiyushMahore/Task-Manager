import React, { useState } from 'react'
import { IoCalendarOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import DeleteTask from '../components/DeleteTask';

function Inbox() {
    const [deleteTask, setDeleteTask] = useState(false)

    const handleDeleteForm = () => {
        setDeleteTask(!deleteTask)
    }

    return (
        <div className='w-full h-full px-[15%] py-[5%]'>
            <h1 className='text-3xl font-bold'>
                Inbox
            </h1>
            <div className='flex justify-between items-center'>
                <div>
                    <div className='mt-4 px-2 flex gap-2'>
                        <div class="checkbox-wrapper-18">
                            <div class="round">
                                <input type="checkbox" id="checkbox-18" />
                                <label for="checkbox-18"></label>
                            </div>
                        </div>
                        <div className='text-sm flex gap-1 flex-col text-gray-600'>
                            <h5 className='text-lg text-gray-800'>Title</h5>
                            <p>Description of this task</p>
                            <p className='text-purple-600 flex gap-1'><IoCalendarOutline /> Sunday</p>
                        </div>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <button><RiEditLine color='gray' size={20} /></button>
                    <button onClick={handleDeleteForm}><MdDeleteOutline color='red' size={20} /></button>
                </div>
            </div>
            <div className='mt-2'>
                <hr />
            </div>
            {deleteTask ? <DeleteTask setForm={setDeleteTask} /> : null}
        </div>
    )
}

export default Inbox