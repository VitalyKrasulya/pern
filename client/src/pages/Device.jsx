import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row, Spinner} from "react-bootstrap";
import star from "./../assets/star-fill.svg"
import { useParams} from "react-router-dom";
import {fetchDevice} from "../http/deviceAPI";
import {useGetBrand} from "../hooks/useGetBrand";
import {addDeviceToBasket} from "../http/basketApi";
import {basketStore} from "../store/basketStore";
import {observer} from "mobx-react-lite";
import {userStore} from "../store/userStore";

const Device = observer(() => {
	const [device, setDevice] = useState(null)
	const {getBrandNameById} = useGetBrand()
	const {id} = useParams()
	
	useEffect(() => {
		fetchDevice(id).then(d => setDevice(d)).catch(() => {})
	}, [])
	
	const addToBasket = (device) => {
		addDeviceToBasket(device).then(data => basketStore.setBasket(data))
	}
	
	if (!device) {
		return (
			<div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
				<Spinner animation="border" variant="primary" />
			</div>
		)
	}
	
	return (
		<Container className="mt-3">
			<Row>
				<Col md={4} style={{height:"300px"}} className="d-flex justify-content-center align-items-center">
						<Image
							src={process.env.REACT_APP_API_URL + device.img}
							style={{maxWidth:"100%", maxHeight:"100%"}}
						/>
				</Col>
				
				<Col md={4}>
					<div className="d-flex flex-column align-items-center">
						<h3>{getBrandNameById(device.brandId)} {device.name}</h3>
						<div
							className="d-flex align-items-center justify-content-center"
							style={{background: `url(${star}) no-repeat center center`, backgroundSize:"contain", height:240, width:"100%", fontSize:64}}
						>
							{device.rating}
						</div>
					</div>
				</Col>
				
				<Col md={4}>
					<Card
						className="d-flex flex-column justify-content-around align-items-center"
						style={{width:"100%", height:300, fontSize:32, border:"2px solid #DDDDDD"}}
					>
						<h3>{device.price}&nbsp;₽</h3>
						
						{userStore.isAuth &&
						<Button
							variant={"outline-dark"}
							onClick={addToBasket.bind(null, device)}
						>
							Добавить в корзину
						</Button>
						}
					</Card>
				</Col>
			</Row>
			{device.info && device.info.length > 0 &&
				<Row className="d-flex flex-column mt-5" style={{fontSize:18}}>
					<h2>Характеристики</h2>
					{device.info.map(
						(info, index) =>
							<Row
								key={info.id}
								style={{backgroundColor: (index%2 === 0 ? "#DDDDDD" : "transparent")}}
								className="p-2"
							>
								<b>{info.title}:</b>&nbsp;{info.description}
							</Row>
					)}
				</Row>
			}
		</Container>
	)
})

export default Device;