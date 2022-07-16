const ApiError = require("./../error/ApiError")

module.exports = function (err, req, res, next) {
	if (req.method === "OPTIONS") {
		return next()
	}
	
	if (err instanceof ApiError) {
		return res.status(err.status).json({message: err.message})
	}
	
	return res.status(500).json({message:"Unexpected error"})
}