import { Request, Response } from "express";
import { TaskModel } from "../models";

class TaskController {

    public create = async (req: Request, res: Response) => {

        const task = {
            title: req.body.title,
            description: req.body.description,
            color: req.body.color,
            important: req.body.important
        }

        try {
            const NewTask = new TaskModel(task);
            const savedTask = await NewTask.save();

            res.json(savedTask);
        }
        catch (err) {
            res.json(err);
        }
    }
    public find = async (req: Request, res: Response) => {

        try {
            const tasks = await TaskModel.find();
            res.json(tasks);
        }
        catch (err) {
            res.json(err)
        }
    }
    public show = async (req: Request, res: Response) => {
        const id: string = req.params.id;

        try {
            const task = await TaskModel.findById(id);
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
            res.json(err)
        }
    }
    public setDone = async (req:Request,res:Response) => {
        const id: string = req.params.id;
        try {
            if(req.body.status){
                const updated = await TaskModel.findByIdAndUpdate(id,{status: true});
                res.json(updated);
            }
        }
        catch (err) {
            res.json(err)
        }
    }
}

export default TaskController;