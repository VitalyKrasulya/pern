import {$authHost} from "./index";

export const getBasket = async () => {
	const {data} = await $authHost.get("api/basket/")
	return data
}

export const addDeviceToBasket = async (device) => {
	const {data} = await $authHost.post(`api/basket/`, {id:device.id})
	return data
}

export const deleteFromBasket = async (basketItem) => {
	const {data} = await $authHost.delete(`api/basket/${basketItem.id}`)
	return data
}