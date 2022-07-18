const {Brand} = require("./../models/models")
const ApiError = require("./../error/ApiError")
const sequelize = require("sequelize")

class BrandController {
	async create(req, res, next) {
		const {name} = req.body
		const candidate = await Brand.findOne({where: {name}})
		if (candidate) {
			return next(ApiError.forbidden("Brand with same name already exist"))
		}
		const brand = await Brand.create({name})
		return res.status(201).json(brand)
	}
	
	
	async getAll(req, res) {
		const brands = await Brand.findAll({order: sequelize.literal('name')})
		return res.json(brands)
	}
}

module.exports = new BrandController()