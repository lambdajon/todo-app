import { Request, Response } from "express";

import { GroupModel,IGroup } from "../models";

class GroupController {
    public create = async (req: Request, res: Response) => {
        const group = {
            name:req.body.name
        };
        try {
            
            const last: IGroup | null = await GroupModel.findOne().sort("-order_id");
            if(!last) {
                const new_group = new GroupModel(group);
                const savedGroup = await new_group.save();
                res.json(savedGroup);
            }
            else{
                const new_group = new GroupModel({ ...group, order_id: last.order_id + 1 });
                const savedGroup = await new_group.save();
                res.json(savedGroup);
            }
        }
        catch (err) {
            res.json(err);
        }
    }
    public find = async (req: Request, res: Response) => {
        try{
            const groups = await GroupModel.find({}).sort("order_id").populate("tasks","title description order_id group_id", {}, {sort:["order_id"]});

            res.json(groups);
        }
        catch(err){

        }
    }
    public changeOrder = async (req:Request, res:Response) => {

        try{
            if(req.body && req.body.data){
                const updatedGroups:[] = req.body.data;

                const updated = await updatedGroups.map(async (group:any) => {
                    try{
                        const updatedTask = await GroupModel.findByIdAndUpdate(group._id, {order_id:group.order_id});
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
        catch(err){
            res.json(err);
        }
    }
}

export default GroupController;