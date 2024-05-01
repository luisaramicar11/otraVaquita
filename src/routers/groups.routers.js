import Router from "express-promise-router";
import Controller from "../controllers/groups.controller.js"
import continuator from "../lib/continue.decorator.js";
import passport from "passport";
import "../lib/passport.config.js"

const GroupsRouter = () =>{
  
    //Creo una instancia del enrutador express-promise-router llamado router
   const router=Router();
   const controller=Controller();

   router.get("/groups",  passport.authenticate("jwt", { session: false }), continuator(controller.getAll));
   router.get("/groups/:id", passport.authenticate("jwt", { session: false }), continuator(controller.getById));
   router.post("/groups", passport.authenticate("jwt", { session: false }),continuator(controller.create));
   router.delete("/groups/:id", passport.authenticate("jwt", { session: false }), continuator(controller.deleteById));
   router.put("/groups/:id", passport.authenticate("jwt", { session: false }),continuator(controller.fullUpdateById));
   return router
}

export default GroupsRouter;