import Router from "express-promise-router";
import {
  connectDatabase,
  commitDatabase,
  rollbackDatabase,
} from "../lib/database.midleware.js";
import groupRouter from "./groups.routers.js";
import usersRouter from "./users.routers.js";
import authRouter from "./auth.routers.js";
import groupUsersRouter from "./groups_users.routers.js"
//import expensesRouter from "./expenses.routers.js"

const AsyncRouter = () => {
  const router = Router();

  router.use(connectDatabase);
  //router.use("/auth", groupRouter());
  router.use("/", groupRouter());
  router.use("/", usersRouter());
  router.use("/", authRouter());
  router.use("/", groupUsersRouter());
 //router.use("/", expensesRouter()); 
  router.use(commitDatabase);
  router.use(rollbackDatabase);
  return router;
};

export default AsyncRouter;
