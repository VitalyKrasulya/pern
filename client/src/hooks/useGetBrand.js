import React from "react"
import {deviceStore} from "../store/deviceStore";

export function useGetBrand() {
	return {
		getBrandNameById:
			(id) => {
				const brands = deviceStore.brands
				for (let i = 0; i < brands.length; i++) {
					if (brands[i].id === id) {
						return brands[i].name
					}
				}
				return ""
			},
		
		setSelectedBrandById:
			(id) => {
				if (id === null) {
					return
				}
				id = Number(id)
				if (deviceStore.selectedBrand.id !== id) {
					const brands = deviceStore.brands
					for (let i = 0; i < brands.length; i++) {
						if (brands[i].id === id) {
							deviceStore.setSelectedBrand(brands[i])
							break;
						}
					}
				}
			},
	}
}