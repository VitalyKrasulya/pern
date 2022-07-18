const {Type} = require("./../models/models")
const ApiError = require("./../error/ApiError")
const sequelize = require("sequelize");

class TypeController {
	async create(req, res, next) {
		const {name} = req.body
		const candidate = await Type.findOne({where: {name}})
		if (candidate) {
			return next(ApiError.forbidden("Type with same name already exist"))
		}
		const type = await Type.create({name})
		return res.status(201).json(type)
	}
	
	
	async getAll(req, res) {
		const types = await Type.findAll({order: sequelize.literal('name')})
		return res.json(types)
	}
}

module.exports = new TypeController()