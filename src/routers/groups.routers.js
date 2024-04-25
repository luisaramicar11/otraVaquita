import Router from "express-promise-router";
import Controller from "../controllers/groups.controller.js"
import continuator from "../lib/continue.decorator.js";


const GroupsRouter = () =>{

    //Creo una instancia del enrutador express-promise-router llamado router
   const router=Router();
   const controller=Controller();

   router.get("/groups", continuator(controller.getAll));
   router.get("/groups/:id", continuator(controller.getById));
   router.post("/groups", continuator(controller.create));
   router.delete("/groups/:id", continuator(controller.deleteById));
   return router
}

export default GroupsRouter;