import Router from "express-promise-router";
import Controller from "../controllers/users.controller.js"
import continuator from "../lib/continue.decorator.js";


const usersRouter = () =>{

    //Creo una instancia del enrutador express-promise-router llamado router
   const router=Router();
   const controller=Controller();

   router.get("/users", continuator(controller.getAll));
   router.get("/users/:id", continuator(controller.getById));
   router.post("/users", continuator(controller.create));
   router.delete("/users/:id", continuator(controller.deleteById));
   router.put("/users/:id", continuator(controller.fullUpdateById));
   return router
}

export default usersRouter;