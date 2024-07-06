import Router from "express-promise-router";
import Controller from "../controllers/users.controller.js"
import continuator from "../lib/continue.decorator.js";
import passport from "passport";
import "../lib/passport.config.js"

const usersRouter = () =>{

    //Creo una instancia del enrutador express-promise-router llamado router
   const router=Router();
   const controller=Controller();

   router.get("/users", passport.authenticate("jwt", { session: false }), continuator(controller.getAll));
   router.get("/friends", passport.authenticate("jwt", { session: false }), continuator(controller.getAllUsers));
   router.get("/users/:id", passport.authenticate("jwt", { session: false }), continuator(controller.getById));
   router.post("/users", continuator(controller.create));
   router.delete("/users/:id", passport.authenticate("jwt", { session: false }), continuator(controller.deleteById));
   router.put("/users/:id", continuator(controller.fullUpdateById));
   return router
}

export default usersRouter;