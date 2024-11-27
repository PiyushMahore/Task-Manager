import { Router } from "express"
import { varifyJwt } from "../middlewares/verifyJwt.middleware.js"
import { addTask, getAllTasks, removeTask, toggleTaskStatus, updateTaskDetails } from "../controllers/task.controller.js"

export const taskRoute = Router()

taskRoute.route('/add-task').post(varifyJwt, addTask);

taskRoute.route('/remove-task/:taskId').delete(removeTask);

taskRoute.route('/toggle-task-status/:taskId').patch(toggleTaskStatus);

taskRoute.route('/update-task/:taskId').patch(updateTaskDetails);

taskRoute.route('/get-all-tasks').get(varifyJwt, getAllTasks);
