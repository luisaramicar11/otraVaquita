import Router from "express-promise-router";
import Controller from "../controllers/groups.controller.js"
import continuator from "../lib/continue.decorator.js";
import passport from "passport";
import "../lib/passport.config.js"

const expensesRouter = () =>{
  
    //Creo una instancia del enrutador express-promise-router llamado router
   const router=Router();
   const controller=Controller();


   //router.post("/groups/:id/expenses", passport.authenticate("jwt", { session: false }),continuator(controller.create));
   //router.get("/groups/:id/expenses", passport.authenticate("jwt", { session: false }),continuator(controller.create));
   return router
}

export default expensesRouter;