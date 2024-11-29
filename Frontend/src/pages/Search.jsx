import React, { useState, useEffect } from 'react'
import { IoCalendarOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import DeleteTask from '../components/DeleteTask';
import { useTask } from '../context/TaskContextProvider';

function Search() {
    const useContext = useTask()
    const [deleteTask, setDeleteTask] = useState(false)
    const [deleteTaskId, setDeleteTaskId] = useState("")
    const [searchTasks, setSearchTasks] = useState([])
    const [deleteTaskName, setDeleteTaskName] = useState("")
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        const getAllTask = async () => {
            const tasks = await useContext.getAllTasks();
            const filteredTasks = tasks.data.filter((task) => task.title.includes(searchInput))
            setSearchTasks(filteredTasks)
        }
        getAllTask()
    }, [searchInput, useContext.tasks])

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
                Search
            </h1>
            <div class="max-w-md mx-auto mt-10">
                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="search"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                    placeholder="Search..."
                />
            </div>
            {
                searchTasks && searchTasks.map((task) => (
                    <span key={task._id}>
                        <div className='flex justify-between items-center'>
                            <div>
                                <div className='mt-4 px-2 flex gap-2'>
                                    <div className="checkbox-wrapper-18">
                                        <button onClick={() => toggleTaskStatus(task._id)} className='h-5 w-5 rounded-full border border-gray-500 hover:bg-blue-500'></button>
                                    </div>
                                    <div className='text-sm flex gap-1 flex-col text-gray-600'>
                                        <h5 className='text-lg text-gray-800'>{task.title}</h5>
                                        <p>{task.description}</p>
                                        <p className='text-purple-600 flex gap-1'><IoCalendarOutline /> {task.dueDate.slice(0, 10)}</p>
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

export default Search