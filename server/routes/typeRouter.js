const Router = require("express")
const router = new Router()
const typeController = require("./../controllers/typeController")
const checkRoleMiddleware = require("./../middleware/CheckRoleMiddleware")
const authMiddleware = require("./../middleware/AuthMiddleware")

//  /type
router.post("/", [authMiddleware, checkRoleMiddleware("ADMIN")], typeController.create)
router.get("/", typeController.getAll)

module.exports = router