import React, {useEffect, useState} from "react"
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {auth} from "./http/userAPI";
import {userStore} from "./store/userStore";
import {Spinner} from "react-bootstrap";
import {fetchBrands, fetchTypes} from "./http/deviceAPI";
import {deviceStore} from "./store/deviceStore";

console.log("REACT_APP_API_URL", process.env.REACT_APP_API_URL)

const App = () => {
	const [loading, setLoading] = useState(true)
	
	useEffect(() => {
		auth()
			.then(res => {
				userStore.setUser(res)
			})
			.finally(() => setLoading(false))
	}, [])
	
	useEffect(() => {
		fetchTypes().then(data => deviceStore.setTypes(data))
		fetchBrands().then(data => deviceStore.setBrands(data))
	}, [])
	
	if (loading) {
		return (
			<div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
				<Spinner animation="border" variant="primary" />
			</div>
		)
	}
	
	return (
		<BrowserRouter>
			<NavBar/>
			<AppRouter/>
		</BrowserRouter>
	)
}

export default App;
