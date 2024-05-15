import Router from "express-promise-router";
import ControllerAuth from "../controllers/auth.controller.js"
import continuator from "../lib/continue.decorator.js";


const AuthRouter = () =>{

    //Creo una instancia del enrutador express-promise-router llamado router
   const router=Router();
   const controllerAuth=ControllerAuth();

   router.post("/auth/login", continuator(controllerAuth.login));
   //router.get("/auth/health", (req, res)=>{res.status(200).json()})
   router.post("/auth/create", continuator(controllerAuth.create));
   console.log("********************************")
   
   return router
}

export default AuthRouter;