import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
    return (
        <TaskContext.Provider value={{}}>
            {children}
        </TaskContext.Provider>
    )
}

const useTask = () => useContext(TaskContext)

export { useTask, TaskContextProvider }