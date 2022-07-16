import {makeAutoObservable} from "mobx";
import {basketStore} from "./basketStore";
import {getBasket} from "../http/basketApi";

export const userStore = makeAutoObservable({
	setIsAuth: (value) => {
		userStore.isAuth = value
	},
	isAuth: false,
	
	
	setUser: (value) => {
		userStore.setIsAuth(Boolean(value))
		userStore.user = value
		basketStore.basket = []
		if (userStore.isAuth) {
			getBasket().then(data => basketStore.setBasket(data))
		}
	},
	user: null
})