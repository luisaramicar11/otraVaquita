import Router from "express-promise-router";
import Controller from "../controllers/groups_users.controller.js"
import continuator from "../lib/continue.decorator.js";
import passport from "passport";
import "../lib/passport.config.js"

const groupUsersRouter = () =>{
  
    //Creo una instancia del enrutador express-promise-router llamado router
   const router=Router();
   const controller=Controller();

   router.post("/groups/users", passport.authenticate("jwt", { session: false }),continuator(controller.create));
 
   return router
}

export default groupUsersRouter;