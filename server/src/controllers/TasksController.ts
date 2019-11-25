import { Request, Response } from "express";

import { TaskModel, ITask, GroupModel } from "../models";

class TaskController {

    public create = async (req: Request, res: Response) => {

        const task = {
            title: req.body.title,
            description: req.body.description,
            color: req.body.color,
            important: req.body.important,
            group_id: req.body.group_id
        }

        try {
            const last: ITask | null = await TaskModel.findOne({ group_id: task.group_id }).sort("-order_id");

            if (!last) {
                const NewTask = new TaskModel(task);
                const savedTask = await NewTask.save();
                const currentGroup: any = await GroupModel.findById(task.group_id);
                currentGroup.tasks.push(savedTask._id);
                await currentGroup.save();
                res.json(savedTask);

            }
            else {

                const NewTask = new TaskModel({ ...task, order_id: last.order_id + 1 });
                const savedTask = await NewTask.save();
                const currentGroup: any = await GroupModel.findById(task.group_id);
                currentGroup.tasks.push(savedTask._id);
                await currentGroup.save();

                res.json(savedTask);
            }
        }
        catch (err) {
            res.json(err);
        }
    }
    public find = async (req: Request, res: Response) => {

        try {
            const tasks: ITask[] = await TaskModel.find();

            res.json(tasks);
        }
        catch (err) {
            res.json(err);
        }
    }
    public show = async (req: Request, res: Response) => {
        const id: string = req.params.id;

        try {
            const task: ITask | null = await TaskModel.findById(id);
            res.json(task);
        }
        catch (err) {
            res.json(err);
        }
    }
    public delete = async (req: Request, res: Response) => {
        const id: string = req.params.id;
        try {
            const deleted = await TaskModel.findByIdAndDelete(id);
            res.json(deleted);
        }
        catch (err) {
            res.json(err);
        }
    }
    public setDone = async (req: Request, res: Response) => {
        const id: string = req.params.id;
        try {
            if (req.body.status) {
                const updated = await TaskModel.findByIdAndUpdate(id, { status: true });
                res.json(updated);
            }
        }
        catch (err) {
            res.json(err);
        }
    }
    public changeOrder = async (req: Request, res: Response) => {
        try {
            // const data = {
            //     to: req.body.to,
            //     from: req.body.from
            // }
            // const from: ITask | null = await TaskModel.findById(data.from);

            // const to: ITask | null = await TaskModel.findById(data.to);

            // if (from && to) {
            //     const to_OrderId = to.order_id;
            //     const from_OrderId = from.order_id;
            //     to.order_id = from_OrderId;
            //     from.order_id = to_OrderId;

            //     const savedFrom = await from.save();
            //     const savedTo = await to.save();

            //     
            // }
            // console.log("called")
            
            if(req.body && req.body.data){
                const updatedTasks:[] = req.body.data;
                const updated = await updatedTasks.map(async (task:any) => {
                    try{
                        const updatedTask = await TaskModel.findByIdAndUpdate(task._id, {order_id:task.order_id});
                        return Promise.resolve(true);
                    }
                    catch(err){
                        res.json(err);
                    }
                });

                const result = await Promise.all(updated);
                const resp = result.reduce((bool:any, item:any) => {
                    return bool && item;
                });
                
                if(resp){
                    res.json({ msg: "success" });
                }
                
            }
        }
        catch (err) {
            res.json(err);
        }
    }
}

export default TaskController;