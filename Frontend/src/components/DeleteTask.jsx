import React from 'react'
import { useTask } from '../context/TaskContextProvider'

function DeleteTask({ setForm, taskId, taskName }) {
    const useContext = useTask()
    const removeTask = async () => {
        await useContext.removeTask(taskId)
        setForm(false)
    }
    return (
        <div className='h-[130px] lg:w-[450px] w-[350px] absolute top-1/2 left-1/2 bg-[#ffffff] lg:-translate-x-1/2 -translate-x-[50%] -translate-y-1/2 rounded-lg shadow-xl shadow-gray-500 border border-gray-400 px-4 py-3'>
            <div className='grid gap-1'>
                <h5>Delete Task?</h5>
                <p>The <span className='font-semibold'>{taskName}</span> task will be permanently deleted.</p>
            </div>
            <div className='flex justify-end mt-4 gap-2'>
                <button onClick={() => setForm(false)} className='bg-gray-100 px-2 py-1 rounded text-gray-800 hover:bg-gray-300'>Cancel</button>
                <button onClick={removeTask} className='bg-red-500 px-2 py-1 rounded text-[#fff] hover:bg-red-600'>Delete</button>
            </div>
        </div>
    )
}

export default DeleteTask