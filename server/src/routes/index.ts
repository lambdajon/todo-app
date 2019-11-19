import { Router, Request, Response } from "express";
import { TasksCtrl } from "../controllers"


const TaskController = new TasksCtrl();

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

    return router;
}
export default createRouter;