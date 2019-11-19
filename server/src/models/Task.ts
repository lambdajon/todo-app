import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
    title?: string,
    description?: string,
    color?: string,
    important?: boolean,
}

const TaskSchema = new Schema({
    title: {
        type: String,
        required: "title is required",
        index: true,
    },
    status:{
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        required: "description is required",
    },
    color: {
        type: String,
        required: "color is required",
    },
    important: {
        type: Boolean,
        default: false,
    },
},
    {
        versionKey: false,
        timestamps: true
    }
);

const TaskModel = mongoose.model<ITask>("Task", TaskSchema);

export default TaskModel;