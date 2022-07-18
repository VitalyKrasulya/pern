const Router = require("express")
const router = new Router()
const basketController = require("./../controllers/basketController")
const authMiddleware = require("./../middleware/AuthMiddleware");

//  /basket
router.post("/", [authMiddleware], basketController.addOne)
router.get("/", [authMiddleware], basketController.getAll)
router.delete("/:id", [authMiddleware], basketController.deleteOne)

module.exports = router