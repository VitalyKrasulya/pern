import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrandModal from "../components/modals/CreateBrandModal";
import CreateTypeModal from "../components/modals/CreateTypeModal";
import CreateDeviceModal from "../components/modals/CreateDeviceModal";

const Admin = () => {
	const [brandVisible, setBrandVisible] = useState(false)
	const [typeVisible, setTypeVisible] = useState(false)
	const [deviceVisible, setDeviceVisible] = useState(false)
	
	
	return (
		<Container className="d-flex flex-column">
			<Button
				variant={"outline-dark"}
				className="mt-3 p-2"
				onClick={() => setTypeVisible(true)}
			>
				Добавить тип
			</Button>
			<Button
				variant={"outline-dark"}
				className="mt-3 p-2"
				onClick={() => setBrandVisible(true)}
			>
				Добавить бренд
			</Button>
			<Button
				variant={"outline-dark"}
				className="mt-3 p-2"
				onClick={() => setDeviceVisible(true)}
			>
				Добавить устройство
			</Button>
			
			<CreateBrandModal show={brandVisible} onHide={() => setBrandVisible(false)} />
			<CreateTypeModal show={typeVisible} onHide={() => setTypeVisible(false)} />
			<CreateDeviceModal show={deviceVisible} onHide={() => setDeviceVisible(false)} />
		</Container>
	);
};

export default Admin;