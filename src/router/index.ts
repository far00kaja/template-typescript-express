import globalAPI from "./globals/index";
import AuthAPI from "../modules/auths/router";
const ArticlesAPI = require("../modules/articles/router");

const router = require("express").Router();

router.use("/api", AuthAPI);
router.use("/api", ArticlesAPI);


export default {
  globalAPI,
  router,
};
