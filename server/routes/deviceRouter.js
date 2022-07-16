const Router = require("express")
const router = new Router()
const deviceController = require("./../controllers/deviceController")
const authMiddleware = require("./../middleware/AuthMiddleware");
const checkRoleMiddleware = require("./../middleware/CheckRoleMiddleware");

//  /device
router.post("/", [authMiddleware, checkRoleMiddleware("ADMIN")], deviceController.create)
router.get("/", deviceController.getAll)
router.get("/:id", deviceController.getOne)

module.exports = router