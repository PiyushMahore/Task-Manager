import { Task } from "../models/tasks.models.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";

const addTask = asyncHandler(async (req, res) => {
    const { title, description, dueDate, status } = req.body;

    if ([title, description, dueDate].some((value) => value?.trim() === "")) {
        throw new apiError(400, "All Fields Are Required");
    }

    const isTitleAlreadyExist = await Task.findOne({ title: title, userId: req.user._id })

    if (isTitleAlreadyExist) {
        throw new apiError(400, "Title Alreay Exist")
    }

    const task = await Task.create({ title: title, description: description, dueDate: dueDate, userId: req.user._id });

    if (!task) {
        throw new apiError(500, "Somthing Went Wrong While Adding Task");
    }

    if (status) {
        task.status = status;
    }

    return res
        .status(200)
        .json(new apiResponse(200, task, "Task Added Successfully"));
});

const removeTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params

    if (!taskId) {
        throw new apiError(400, "Invalid Task Id")
    }

    const removedTask = await Task.findByIdAndDelete(taskId)

    if (!removedTask) {
        throw new apiError(500, "Failed To Remove Task")
    }

    return res
        .status(200)
        .json(new apiResponse(200, [], "Task Removed Successfully"))
})

const toggleTaskStatus = asyncHandler(async (req, res) => {
    const { taskId } = req.params

    if (!taskId) {
        throw new apiError(400, "Invalid Task Id")
    }

    const task = await Task.findById(taskId);

    if (!task) {
        throw new apiError(404, "Task Not Found")
    }

    task.status === "completed" ? task.status = "pending" : task.status = "completed";

    task.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new apiResponse(200, task, "Task Status Updated Successfully"))
});

const updateTaskDetails = asyncHandler(async (req, res) => {
    const { title, description, dueDate } = req.body;
    const { taskId } = req.params

    if (!taskId) {
        throw new apiError(400, "Invalid Task Id")
    }

    if ([title, description, dueDate].some((value) => value?.trim() === "")) {
        return res
            .status(200)
            .json(new apiResponse(200, {}, "Nothing To Update"))
    }

    const task = await Task.findById(taskId);

    if (!task) {
        throw new apiError(404, "Task Not Found")
    }

    if (title) {
        const isTitleAlreadyExist = await Task.findOne({ title: title, userId: task.userId })
        if (isTitleAlreadyExist) {
            throw new apiError(400, "Task With This Title Already Exist")
        }
        task.title = title
    }

    if (description) {
        task.description = description
    }

    if (dueDate) {
        task.dueDate = dueDate
    }

    await task.save()

    return res
        .status(200)
        .json(new apiResponse(200, task, "Task Updated Successfully"))
})

const getAllTasks = asyncHandler(async (req, res) => {
    let { page, limit } = req.query

    page = parseInt(page, 10)
    limit = parseInt(limit, 10)

    const pipeline = [{
        $match: {
            userId: new mongoose.Types.ObjectId(req.user._id)
        }
    }]

    pipeline.push({
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userInfo",
            pipeline: [
                {
                    $project: {
                        firstName: 1,
                        lastName: 1,
                        userName: 1,
                        email: 1
                    }
                }
            ]
        }
    })

    if (page && limit) {
        pipeline.push({
            $skip: (page - 1) * limit
        }, {
            $limit: limit
        })
    }

    const tasks = await Task.aggregate(pipeline)

    return res
        .status(200)
        .json(new apiResponse(200, tasks, "All Tasks Fetched Successfully"))
})

export { addTask, removeTask, toggleTaskStatus, updateTaskDetails, getAllTasks }