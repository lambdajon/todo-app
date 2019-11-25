import { Router, Request, Response } from "express";
import { TasksCtrl, GroupCtrl } from "../controllers"


const TaskController = new TasksCtrl();
const GroupController = new GroupCtrl();
const createRouter = (router: Router) => {
    router.get("/", (req: Request, res: Response) => {
        res.json({
            msg: "hello"
        })
    });

    router.post("/tasks/create", TaskController.create);
    router.get("/tasks/list", TaskController.find);
    router.get("/tasks/show/:id", TaskController.show);
    router.delete("/tasks/delete/:id", TaskController.delete);
    router.patch("/tasks/done/:id", TaskController.setDone);
    router.patch("/tasks/change_order", TaskController.changeOrder)
    router.get("/groups/list", GroupController.find);
    router.post("/groups/create", GroupController.create);
    router.patch("/groups/change_order", GroupController.changeOrder);

    return router;
}
export default createRouter;