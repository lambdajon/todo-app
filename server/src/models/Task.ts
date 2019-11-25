import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
    title?: string,
    description?: string,
    color?: string,
    important?: boolean,
    order_id: number,
    group?: any
}

const TaskSchema = new Schema({
    title: {
        type: String,
        required: "title is required",
        index: true,
    },
    order_id: {
        type: Number,
        default: 1,
    },
    status: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        required: "description is required",
    },
    color: {
        type: String,
        required: false,
    },
    important: {
        type: Boolean,
        default: false,
    },
    group_id: {
        type: Schema.Types.ObjectId,
        ref: "Group"
    }

},
    {
        versionKey: false,
        timestamps: true
    }
);

const TaskModel = mongoose.model<ITask>("Task", TaskSchema);

export default TaskModel;