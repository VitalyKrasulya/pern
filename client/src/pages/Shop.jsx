import React, {useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import {Container} from "react-bootstrap";
import TypeSideBar from "../components/TypeSideBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import {deviceStore} from "../store/deviceStore";
import {observer} from "mobx-react-lite";
import Pages from "../components/Pages";

const Shop = observer(() => {
	useEffect(() => {
		fetchDevices(deviceStore.selectedType.id, deviceStore.selectedBrand.id, deviceStore.page, deviceStore.limit)
			.then(data => {
				deviceStore.setDevices(data.rows)
				deviceStore.setTotalCount(data.count)
			})
	}, [deviceStore.selectedType, deviceStore.selectedBrand, deviceStore.page, deviceStore.limit])
	
	return (
		<Container
			className="mt-4 d-flex flex-column justify-content-between"
			style={{minHeight: window.innerHeight - 100}}
		>
			<Row>
				<Col md={3}>
					<TypeSideBar />
				</Col>
				<Col md={9}>
					<BrandBar />
					<DeviceList />
					
				</Col>
			</Row>
			<div className="align-self-center">
				<Pages/>
			</div>
		</Container>
	)
})

export default Shop;