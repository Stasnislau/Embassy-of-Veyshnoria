import VisitController from "../Controllers/visit.controller";
import authMiddleware from "../MiddleWares/auth-middleware";

const Router = require("express").Router;
const visitRouter = new Router();


visitRouter.get("/specific/:id", authMiddleware, VisitController.getVisitById);

visitRouter.get("/users", authMiddleware, VisitController.getVisitsByUser);

visitRouter.post("/create", authMiddleware, VisitController.createVisit);

visitRouter.put("/update/:id", authMiddleware, VisitController.updateVisit);

visitRouter.delete("/delete/:id", authMiddleware, VisitController.deleteVisit);

export default visitRouter;
