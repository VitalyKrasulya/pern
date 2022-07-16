import {makeAutoObservable} from "mobx";

export const deviceStore = makeAutoObservable({
	setSelectedType: (value) => {
		deviceStore.selectedType = value
		deviceStore.setPage = 1
	},
	selectedType: {},
	
	
	setSelectedBrand: (value) => {
		deviceStore.selectedBrand = value
		deviceStore.setPage = 1
	},
	selectedBrand: {},
	
	
	setTypes: (value) => {
		if (value && value[0].id !== 0) {
			value.unshift({id:0, name:"Bce"})
		}
		if (value && value.length > 0 && deviceStore.types.length === 0) {
			deviceStore.selectedType = value[0]
		}
		deviceStore.types = value
	},
	types: [],
	
	
	setBrands: (value) => {
		deviceStore.brands = value
	},
	brands: [],
	
	
	setDevices: (value) => {
		deviceStore.devices = value
	},
	devices: [],
	
	
	setPage: (value) => {
		deviceStore.page = value
	},
	page: 1,
	
	
	setTotalCount: (value) => {
		deviceStore.totalCount = value
	},
	totalCount: 0,
	
	
	setLimit: (value) => {
		deviceStore.limit = value
	},
	limit: 12,
})