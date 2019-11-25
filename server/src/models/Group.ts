import mongoose, { Schema, Document } from "mongoose";

export interface IGroup extends Document {
    name?: string,
    order_id: number,
    tasks?: any
}

const GroupSchema = new Schema({
    name: {
        type: String,
        required: "title is required",
        index: true,
    },
    order_id: {
        type: Number,
        default: 1,
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task',
        }
    ]
},
    {
        versionKey: false,
        timestamps: true
    }
);

const GroupModel = mongoose.model<IGroup>("Group", GroupSchema);

export default GroupModel;