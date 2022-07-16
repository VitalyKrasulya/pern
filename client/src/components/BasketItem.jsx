import React, {useCallback} from 'react';
import {Col, Row, Image, Button} from "react-bootstrap";
import {basketStore} from "../store/basketStore";
import {deleteFromBasket} from "../http/basketApi";
import {useGetBrand} from "../hooks/useGetBrand";
import {observer} from "mobx-react-lite";
import {deviceStore} from "../store/deviceStore";

const BasketItem = observer(({item, index}) => {
	const {device} = item
	const {getBrandNameById} = useGetBrand()
	
	const deleteClick = (e) => {
		deleteFromBasket(item).then(data => basketStore.setBasket(data))
	}
	
	
	return (
		<Row style={{backgroundColor: (index%2 === 0 ? "#DDDDDD" : "transparent")}} className="mt-2">
			<Col md={3} style={{height:"100px"}} className="d-flex justify-content-center align-items-center">
				<Image
					src={process.env.REACT_APP_API_URL + device.img}
					style={{maxWidth:"100%", maxHeight:"100%"}}
				/>
			</Col>
			<Col md={8} style={{fontSize:18}} className="p-1 d-flex align-items-center">
				<span>
					<b>{getBrandNameById(device.brandId)}</b> {device.name}
					<br/>
					<b>{device.price}&nbsp;₽</b>
				</span>
			</Col>
			<Col md={1} className=" d-flex justify-content-end align-items-center">
				<Button variant={"danger"} onClick={deleteClick}>
					&times;
				</Button>
			</Col>
		</Row>
	)
})

export default BasketItem;