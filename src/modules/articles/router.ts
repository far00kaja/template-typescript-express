import auth from '../../middleware/auth'
const { save, getData } = require("./controller");
const { valPostArticle } = require("./validation");

const router = require("express").Router();

router.post("/articles", auth, valPostArticle, save);
router.get("/articles",  getData);

module.exports = router;
