const Router = require("express")
const router = new Router()
const brandController = require("./../controllers/brandController")
const authMiddleware = require("./../middleware/AuthMiddleware");
const checkRoleMiddleware = require("./../middleware/CheckRoleMiddleware");

//  /brand
router.post("/", [authMiddleware, checkRoleMiddleware("ADMIN")], brandController.create)
router.get("/", brandController.getAll)

module.exports = router