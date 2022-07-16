import {makeAutoObservable} from "mobx";

export const basketStore = makeAutoObservable({
	setBasket: (value) => {
		basketStore.basket = value
	},
	basket: []
})