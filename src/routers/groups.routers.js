import Router from "express-promise-router";
import Controller from "../controllers/groups.controller.js"

const GroupsRouter = () =>{

    //Creo una instancia del enrutador express-promise-router llamado router
   const router=Router();

    const controller=Controller();
   router.get('/groups', controller.getAll);
   return router
}

export default GroupsRouter;