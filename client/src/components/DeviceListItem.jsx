import React from 'react';
import {Col, Image} from "react-bootstrap";
import star from "./../assets/star.svg"
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";
import {useGetBrand} from "../hooks/useGetBrand";

const DeviceListItem = ({device}) => {
	const navigate = useNavigate()
	const {getBrandNameById} = useGetBrand()
	
	return (
		<Col md={4} lg={3}
			className="my-4 px-4"
			style={{cursor: "pointer"}}
			onClick={() => {
				navigate(DEVICE_ROUTE + "/" + device.id)
			}}
		>
			<div style={{width:"100%", height:"150px"}} className="d-flex justify-content-center align-items-center">
				<Image
					style={{maxWidth:"100%", maxHeight:"100%"}}
					src={process.env.REACT_APP_API_URL + device.img}
				/>
			</div>
				
			<div className="mt-1 d-flex justify-content-between">
				<div className="text-black-50 text-trim">
					{getBrandNameById(device.brandId)}
				</div>
				<div className="d-flex">
					{device.rating}
					<Image
						style={{marginLeft:4, marginTop:2}}
						width={18}
						height={18}
						src={star}
					/>
				</div>
			</div>
			<div className="text-trim">
				{device.name}
			</div>
			<div style={{fontSize:24}}>
				<b>{device.price}&nbsp;₽</b>
			</div>
		</Col>
	);
};

export default DeviceListItem;