import { createContext, useContext, useState } from "react";
import axios from "axios";

const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])

    const addTask = async (title, description, dueDate) => {
        try {
            const result = await axios.post("http://localhost:8000/api/task/add-task", {
                title: title,
                description: description,
                dueDate: dueDate
            }, {
                withCredentials: true
            });
            return result.data
        } catch (error) {
            console.log("Failed to add task", error)
        }
    }

    const removeTask = async (taskId) => {
        try {
            const result = await axios.delete(`http://localhost:8000/api/task/remove-task/${taskId}`)
            return result.data
        } catch (error) {
            console.log("Failed to remove task", error)
        }
    }

    const toggleTaskStatus = async (taskId) => {
        try {
            const result = await axios.patch(`http://localhost:8000/api/task/toggle-task-status/${taskId}`)
            return result.data
        } catch (error) {
            console.log("Failed to update task status", error)
        }
    }

    const updateTaskDtl = async (taskId, title, description, dueDate) => {
        try {
            const result = await axios.patch(`http://localhost:8000/api/task/update-task/${taskId}`, {
                title: title,
                description: description,
                dueDate: dueDate
            });
            return result.data
        } catch (error) {
            console.log("Failed to update task", error)
        }
    }

    const getAllTasks = async (page, limit) => {
        try {
            const result = await axios.get(`http://localhost:8000/api/task/get-all-tasks`, {
                params: {
                    page: page,
                    limit: limit
                },
                withCredentials: true
            })
            setTasks(result.data)
            return result.data
        } catch (error) {
            console.log("Failed to fetch tasks", error)
        }
    }

    return (
        <TaskContext.Provider value={{ addTask, removeTask, toggleTaskStatus, updateTaskDtl, getAllTasks, tasks }}>
            {children}
        </TaskContext.Provider>
    )
}

const useTask = () => useContext(TaskContext)

export { useTask, TaskContextProvider }
