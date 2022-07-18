const {Basket, BasketDevice} = require("./../models/models")
const ApiError = require("./../error/ApiError")
const {Device} = require("../models/models")
const sequelize = require("sequelize");

class BasketController {
	async addOne(req, res, next) {
		console.log("addOne")
		const basket = await Basket.findOne({where: {id: req.user.id}})
		if (!basket) {
			return next(ApiError.notFound("Basket not found"))
		}
		let {id} = req.body
		const device = await Device.findOne({where: {id: id}})
		if (!device) {
			return next(ApiError.notFound("Device not found"))
		}
		await BasketDevice.create({basketId: basket.id, deviceId: device.id})
		
		const basketDevices = await BasketDevice.findAll({
			where: {basketId: basket.id},
			order: sequelize.literal("id"),
			include: [{model: Device, as: "device"}]
		})
		return res.status(201).json(basketDevices)
	}
	
	async deleteOne(req, res, next) {
		const basket = await Basket.findOne({where: {id: req.user.id}})
		if (!basket) {
			return next(ApiError.notFound("Basket not found"))
		}
		
		const id = req.params.id
		if (!id) {
			return next(ApiError.badRequest("No id"))
		}
		
		const result = await BasketDevice.destroy({where: {id}})
		if (result <= 0) {
			return next(ApiError.notFound("Device not found"))
		}
		
		const basketDevices = await BasketDevice.findAll({
			where: {basketId: basket.id},
			order: sequelize.literal("id"),
			include: [{model: Device, as: "device"}]
		})
		return res.json(basketDevices)
	}
	
	async getAll(req, res) {
		let basket = await Basket.findOne({where: {id: req.user.id}})
		if (!basket) {
			await Basket.create()
			return res.json([])
		}
		
		const basketDevices = await BasketDevice.findAll({
			where: {basketId: basket.id},
			order: sequelize.literal("id"),
			include: [{model: Device, as: "device"}]
		})
		return res.json(basketDevices)
	}
}

module.exports = new BasketController()