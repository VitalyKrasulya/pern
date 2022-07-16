import React from "react"
import {deviceStore} from "../store/deviceStore";

export function useGetType() {
	return {
		getTypeNameById:
			(id) => {
				const types = deviceStore.types
				for (let i = 0; i < types.length; i++) {
					if (types[i].id === id) {
						return types[i].name
					}
				}
				return ""
			},
		
		setSelectedTypeById:
			(id) => {
				if (id === null) {
					return
				}
				id = Number(id)
				if (deviceStore.selectedType.id !== id) {
					const types = deviceStore.types
					for (let i = 0; i < types.length; i++) {
						if (types[i].id === id) {
							deviceStore.setSelectedType(types[i])
							break;
						}
					}
				}
			},
	}
}