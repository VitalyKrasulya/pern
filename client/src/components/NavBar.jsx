import React from 'react';
import {Badge, Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, BASKET_ROUTE} from "../utils/consts";
import {userStore} from "../store/userStore";
import {observer} from "mobx-react-lite";
import {basketStore} from "../store/basketStore";


const NavBar = observer(() => {
	const location = useLocation()
	const navigate = useNavigate()
	const isLoginRoute = location.pathname === REGISTRATION_ROUTE || location.pathname === LOGIN_ROUTE
	const isAdminRoute = location.pathname === ADMIN_ROUTE
	
	
	return (
		<Navbar bg="dark" variant="dark" style={{minHeight:54}}>
			<Container>
				<NavLink className={"text-white"} to={SHOP_ROUTE}>Купи хоть что-нибудь</NavLink>
				{userStore.isAuth && <Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						{userStore.user.email}
					</Navbar.Text>
					<Button variant="outline-light" className="ml-3" onClick={() => navigate(BASKET_ROUTE)}>
						Корзина <Badge bg="secondary">{basketStore.basket.length}</Badge>
					</Button>
				</Navbar.Collapse>}
				
				<Nav className="text-white ml-3">
					{userStore.isAuth && userStore.user.role === "ADMIN" && !isAdminRoute &&
						<Button
						variant={"outline-light"}
						onClick={() => navigate(ADMIN_ROUTE)}
						className={"mr-2"}
						>
						Админ панель
						</Button>
					}
					{userStore.isAuth &&
						<Button
							variant="outline-light"
							onClick={() => {
								localStorage.removeItem("token")
								userStore.setUser(null)
							}}
						>
							Выйти
						</Button>
					}
					{!isLoginRoute && !userStore.isAuth &&
						<Button
							variant="outline-light"
							onClick={() => navigate(LOGIN_ROUTE)}>
							Авторизация
						</Button>
					}
				</Nav>
			</Container>
		</Navbar>
	)
})

export default NavBar;