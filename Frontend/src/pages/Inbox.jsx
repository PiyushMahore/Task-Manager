import React, { useEffect, useState } from 'react'
import { IoCalendarOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import DeleteTask from '../components/DeleteTask';
import { useTask } from '../context/TaskContextProvider';

function Inbox() {
    const useContext = useTask()
    const [deleteTask, setDeleteTask] = useState(false)
    const [deleteTaskId, setDeleteTaskId] = useState("")
    const [deleteTaskName, setDeleteTaskName] = useState("")

    useEffect(() => {
        const getAllTask = async () => {
            await useContext.getAllTasks()
        }
        getAllTask()
    }, [useContext.tasks])

    const handleDeleteForm = (taskId, taskName) => {
        setDeleteTask(!deleteTask)
        setDeleteTaskId(taskId)
        setDeleteTaskName(taskName)
    }

    const toggleTaskStatus = async (taskId) => {
        useContext.removeTask(taskId)
            .then(() => window.alert("Congrats For Task Completion"))
    }

    return (
        <div className='w-full h-full px-1 lg:px-[15%] py-[5%]'>
            <h1 className='text-3xl font-bold'>
                Inbox
            </h1>

            {
                useContext.tasks.data && useContext.tasks.data.map((task) => (
                    <span key={task._id}>
                        <div className='flex justify-between items-center'>
                            <div>
                                <div className='mt-4 px-2 flex gap-2'>
                                    <div className="checkbox-wrapper-18">
                                        <button onClick={() => toggleTaskStatus(task._id)} className='h-5 w-5 rounded-full border border-gray-500 hover:bg-blue-500'></button>
                                    </div>
                                    <div className='text-sm flex gap-1 flex-col text-gray-600'>
                                        <input className='text-lg text-gray-800 focus:outline-none' type='text' value={task.title} readOnly />
                                        <input className='focus:outline-none' type='text' value={task.description} readOnly />
                                        <div className='flex items-center gap-1'>
                                            <IoCalendarOutline color='purple' />
                                            <input className='focus:outline-none' type={'date'} value={task.dueDate.slice(0, 10)} readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <button><RiEditLine color='gray' size={20} /></button>
                                <button onClick={() => handleDeleteForm(task._id, task.title)}><MdDeleteOutline color='red' size={20} /></button>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <hr />
                        </div>
                    </span>
                ))
            }

            {deleteTask ? <DeleteTask setForm={setDeleteTask} taskId={deleteTaskId} taskName={deleteTaskName} /> : null}
        </div >
    )
}

export default Inbox