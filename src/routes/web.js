import express from "express";
import { handleCreateNewUser, handleDeleteUser, handlehelloworld, handleUserPage } from "../controller/homeController";
const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", handlehelloworld);
  router.get("/user", handleUserPage);
  router.post("/users/create-user", handleCreateNewUser);
  router.post("/delete-user/:id", handleDeleteUser);
  app.use("/", router);

  return app;
};

export default initWebRoutes;
