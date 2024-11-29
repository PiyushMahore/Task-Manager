import React, { useState } from 'react'
import { useTask } from '../context/TaskContextProvider'

function AddTask({ setForm }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const useContext = useTask()

    const addTask = async () => {
        await useContext.addTask(title, description, dueDate)
        await useContext.getAllTasks()
        setForm(false)
    }

    return (
        <div className='h-[200px] lg:w-[500px] w-[300px] absolute top-1/2 left-1/2 bg-[#ffffff] lg:translate-x-2/3 -translate-x-1/3 -translate-y-1/2 rounded shadow-xl shadow-gray-500 border border-gray-400 px-1 py-3'>
            <div className='flex flex-col gap-3'>
                <div className='text-xl w-full'>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className='w-full focus:outline-none px-2' type="text" name="title" placeholder='Task Name' />
                </div>
                <div className='w-full'>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} className='w-full focus:outline-none px-2' type="text" name="desc" placeholder='Description' />
                </div>
                <div className='w-full text-center'>
                    <input value={dueDate} onChange={(e) => setDueDate(e.target.value)} type="date" name="dueDate" />
                </div>
                <hr className='h-0.5 bg-gray-200' />
                <div className='w-full px-4 flex gap-3 justify-end'>
                    <button onClick={() => setForm(false)} className='bg-gray-100 px-2 py-1 rounded text-gray-800 hover:bg-gray-300'>Cancel</button>
                    <button onClick={addTask} className='bg-red-500 px-2 py-1 rounded text-[#fff] hover:bg-red-600'>Add Task</button>
                </div>
            </div>
        </div>
    )
}

export default AddTask