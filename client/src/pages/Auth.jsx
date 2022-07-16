import React, {useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {userStore} from "../store/userStore";

const Auth = () => {
	const location = useLocation()
	const isLogin = location.pathname === LOGIN_ROUTE
	
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()
	
	const click = async (e) => {
		e.preventDefault()
		try {
			let user
			if (isLogin) {
				user = await login(email, password)
			} else {
				user = await registration(email, password)
			}
			userStore.setUser(user)
			navigate(SHOP_ROUTE)
		}catch (e) {
			alert(e.response.data.message)
		}
	}
	
	return (
		<Container
			className="d-flex justify-content-center align-items-center"
			style={{height: window.innerHeight - 60, maxHeight:700}}
		>
			<Card style={{width:500, backgroundColor:"#EEEEEE"}} className="px-5 py-4">
				<h2 className="m-auto">
					{isLogin ? "Авторизация" : "Регистрация"}
				</h2>
				<Form className="d-flex flex-column" onSubmit={click}>
					<Form.Control
						className="mt-4"
						placeholder="Введите email..."
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Form.Control
						className="mt-3"
						placeholder="Введите пароль..."
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						className="ml-auto mt-3 px-4"
						variant="outline-success"
						onClick={click}
						type={"submit"}
						disabled={!email || !password}
					>
						{isLogin ? "Войти" : "Регистрация"}
					</Button>
					<div className="mr-auto mt-4">
						{isLogin ?
							<div>
								Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Регистрация!</NavLink>
							</div>
							:
							<div>
								Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти!</NavLink>
							</div>
						}
					</div>
				</Form>
			</Card>
		</Container>
	)
}

export default Auth;