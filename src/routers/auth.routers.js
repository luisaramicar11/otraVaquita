import Router from "express-promise-router";
import ControllerAuth from "../controllers/auth.controller.js"
import continuator from "../lib/continue.decorator.js";


const AuthRouter = () =>{

    //Creo una instancia del enrutador express-promise-router llamado router
   const router=Router();
   const controllerAuth=Controller();


   router.post("/auth", continuator(controllerAuth.create));
   
   return router
}

export default AuthRouter;