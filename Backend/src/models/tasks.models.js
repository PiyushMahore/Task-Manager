import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
}, {
    timestamps: true
})

export const Task = mongoose.model('Task', tasksSchema)
