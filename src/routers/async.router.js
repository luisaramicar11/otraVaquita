import Router from 'express-promise-router';
import {connectDatabase,
    commitDatabase,
    rollbackDatabase} from "../lib/database.midleware.js";
import groupRouter from './groups.routers.js'; 
import usersRouter from './users.routers.js';

const AsyncRouter=()=>{

const router=Router();

router.use(connectDatabase);
//router.use("/auth", groupRouter());
router.use("/", groupRouter());
router.use("/", usersRouter())
router.use(commitDatabase);
router.use(rollbackDatabase)
return router;
}

export default AsyncRouter;
