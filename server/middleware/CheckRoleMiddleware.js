const jwt = require("jsonwebtoken")
const ApiError = require("./../error/ApiError")

module.exports = function (role) {
	return async function (req, res, next){
		if (req.method === "OPTIONS") {
			return next()
		}
		try {
			if (req.user.role !== role) {
				return next(ApiError.forbidden("Wrong role"))
			}
			next()
			
		}catch (e) {
			res.status(401).json({message:"Role error", error:e.message})
		}
	}
}