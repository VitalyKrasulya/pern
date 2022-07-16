import React from 'react';
import {observer} from "mobx-react-lite";
import {Card, Row} from "react-bootstrap";
import {deviceStore} from "../store/deviceStore";

const BrandBar = observer(() => {
	const click = (brand) => {
		deviceStore.setSelectedBrand(deviceStore.selectedBrand === brand ? {} : brand)
	}
	
	return (
		<Row className={"d-flex"}>
			{deviceStore.brands.map(
				(brand) =>
					<Card
						className="px-4 py-2"
						key={brand.id}
						style={{cursor:"pointer"}}
						border={brand.id === deviceStore.selectedBrand.id ? "primary" : "light"}
						onClick={click.bind(null, brand)}
					>
						{brand.name}
					</Card>
				)
			}
		</Row>
	);
});

export default BrandBar;