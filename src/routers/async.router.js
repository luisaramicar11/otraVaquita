import Router from 'express-promise-router';
import {connectDatabase,
    commitDatabase,
    rollbackDatabase} from "../lib/database.midleware.js";
import groupRouter from './groups.routers.js';    

const AsyncRouter=()=>{

const router=Router();

router.use(connectDatabase);
router.use('/groups', groupRouter());
router.use(commitDatabase);
router.use(rollbackDatabase)
return router;
}

export default AsyncRouter;
