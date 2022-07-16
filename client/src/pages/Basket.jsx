import React, {useCallback} from 'react';
import {Button, Col, Container, Offcanvas, Row} from "react-bootstrap";
import {basketStore} from "../store/basketStore";
import {observer} from "mobx-react-lite";
import BasketItem from "../components/BasketItem";


const Basket = observer(() => {
	const basketTotalPrice = useCallback(() => {
		const price = basketStore.basket.reduce((prev, cur) => {
			return prev + cur.device.price
		}, 0)
		return price
	}, [basketStore.basket])
	
	return (
		<Container className="mb-5">
			<h1 className="my-3">Корзина</h1>
			{basketStore.basket.length === 0
				?
				<p>Корзина пуста</p>
				:
				<>
					{basketStore.basket.map((item, index) =>
						<BasketItem
							key={item.id}
							item={item}
							index={index}
						/>
					)}
					<hr></hr>
					<Row className="justify-content-end">
						<h2>Итого:&nbsp;<b>{basketTotalPrice()}&nbsp;₽</b></h2>
					</Row>
					<Row className="justify-content-end mt-3">
						<Button variant="success">
							Оформить заказ
						</Button>
					</Row>
				</>
			}
		</Container>
	)
})

export default Basket;