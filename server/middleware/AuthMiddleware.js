const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
	if (req.method === "OPTIONS") {
		return next()
	}
	try {
		const token = req.headers.authorization.split(" ")[1] // Bearer token
		if (!token) {
			return res.status(401).json({message:"Auth: No token found"})
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY, null, null)
		if (!decoded) {
			return res.status(401).json({message:"Auth: Token not decoded"})
		}
		req.user = decoded
		next()
		
	}catch (e) {
		res.status(401).json({message:"Auth: No authorized", error:e.message})
	}
}