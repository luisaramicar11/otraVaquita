import Router from "express-promise-router";

const GroupsRouter = () =>{

    //Creo una instancia del enrutador express-promise-router llamado router
   const router=Router();

   router.get('/groups', (req, res, next)=>{res.end(); next()});
   return router
}


export default GroupsRouter;