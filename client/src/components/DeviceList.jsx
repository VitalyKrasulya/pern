import React from 'react';
import {observer} from "mobx-react-lite";
import {deviceStore} from "../store/deviceStore";
import DeviceListItem from "./DeviceListItem";
import {Row} from "react-bootstrap";

const DeviceList = observer(() => {
	return (
		<Row className="d-flex">
			{deviceStore.devices.map(
				(device) =>
					<DeviceListItem
						key={device.id}
						device={device}
					/>
				)
			}
		</Row>
	);
});

export default DeviceList;