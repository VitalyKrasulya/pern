const {Device, DeviceInfo} = require("./../models/models")
const ApiError = require("./../error/ApiError")
const uuid = require("uuid")
const path = require("path")
const sequelize = require("sequelize")

class DeviceController {
	async create(req, res, next) {
		try {
			let {name, price, brandId, typeId, info} = req.body
			const {img} = req.files
			
			let ext = img.name.length > 3 ? img.name.substr(img.name.lastIndexOf(".") + 1) : "jpg"
			if (ext.length < 3 || ext.length > 4) {
				ext = "jpg"
			}
			
			const fileName = uuid.v4() + "." + ext
			img.mv(path.resolve(__dirname, "..", "static", fileName))
			
			const device = await Device.create({name, price, brandId, typeId, img: fileName})
			
			if (info) {
				info = JSON.parse(info)
				info.forEach(i =>
					DeviceInfo.create({
						title: i.title,
						description: i.description,
						deviceId: device.id
					})
				)
			}
			
			
			return res.status(201).json(device)
		} catch (e) {
			next(ApiError.internal(e.message))
		}
	}
	
	
	async getAll(req, res) {
		let {brandId, typeId, limit, page} = req.query
		
		brandId = parseInt(brandId) || 0
		typeId = parseInt(typeId) || 0
		page = Math.max(parseInt(page) || 1, 1)
		limit = Math.max(parseInt(limit) || 100, 1)
		
		let offset = (page - 1) * limit
		let devices;
		
		if (!brandId && !typeId) {
			devices = await Device.findAndCountAll({limit, offset, order: sequelize.literal('price')})
		} else if (brandId && !typeId) {
			devices = await Device.findAndCountAll({where: {brandId}, limit, offset, order: sequelize.literal('price')})
		} else if (!brandId && typeId) {
			devices = await Device.findAndCountAll({where: {typeId}, limit, offset, order: sequelize.literal('price')})
		} else if (brandId && typeId) {
			devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset, order: sequelize.literal('price')})
		}
		
		res.json(devices)
	}
	
	
	async getOne(req, res, next) {
		const {id} = req.params
		const device = await Device.findOne({
			where:{id},
			include: [{model: DeviceInfo, as: "info"}]
		})
		if (device) {
			return res.json(device)
		}
		
		return next(ApiError.notFound(`Device not found by name ${id}`))
	}
}

module.exports = new DeviceController()