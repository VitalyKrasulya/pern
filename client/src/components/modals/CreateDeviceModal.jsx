import React, {useCallback, useEffect, useState} from 'react';
import {Button, ButtonGroup, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {deviceStore} from "../../store/deviceStore";
import {observer} from "mobx-react-lite";
import {createDevice, fetchBrands, fetchTypes} from "../../http/deviceAPI";

const CreateDeviceModal = observer(({show, onHide}) => {
	const [info, setInfo] = useState([])
	
	const [name, setName] = useState("")
	const [price, setPrice] = useState(0)
	const [file, setFile] = useState(null)
	const [brand, setBrand] = useState(null)
	const [type, setType] = useState(null)
	
	const addInfo = () => {
		setInfo([...info, {title:"", description:"", id:Date.now()}])
	}
	const removeInfo = (date) => {
		setInfo(info.filter(i => i.id !== date))
	}
	const changeInfo = (id, key, value) => {
		setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i))
	}
	
	const addDevice = () => {
		const formData = new FormData()
		formData.append("name", name)
		formData.append("price", `${price}`)
		formData.append("img", file)
		formData.append("brandId", brand.id)
		formData.append("typeId", type.id)
		formData.append("info", JSON.stringify(info))
		createDevice(formData).then(data => onHide())
	}
	
	const canAddDevice = useCallback(() => {
		return !name || !price || !brand || !type
	}, [name, price, brand, type])
	
	useEffect(() => {
		fetchTypes().then(data => deviceStore.setTypes(data))
		fetchBrands().then(data => deviceStore.setBrands(data))
	}, [])
	
	useEffect(() => {
		if (!show) {
			setName("")
			setPrice(0)
			setFile(null)
			setBrand(null)
			setType(null)
			setInfo([])
		}
	}, [show])
	
	
	
	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Добавить устройство
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={e => {e.preventDefault()}}>
					<Dropdown as={ButtonGroup}>
						<Dropdown.Toggle>{type ? type.name : "Выберите тип"}</Dropdown.Toggle>
						<Dropdown.Menu>
							{deviceStore.types.map(
								(type) =>
									<Dropdown.Item
										key={type.id}
										onClick={() => setType(type)}
									>{type.name}</Dropdown.Item>
							)}
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown as={ButtonGroup} className="ml-3">
						<Dropdown.Toggle>{brand ? brand.name : "Выберите бренд"}</Dropdown.Toggle>
						<Dropdown.Menu>
							{deviceStore.brands.map(
								(brand) =>
									<Dropdown.Item
										key={brand.id}
										onClick={() => setBrand(brand)}
									>{brand.name}</Dropdown.Item>
							)}
						</Dropdown.Menu>
					</Dropdown>
					<Form.Control
						className="mt-3"
						placeholder="Введите название устройства"
						value={name}
						onChange={e => {setName(e.target.value)}}
					/>
					<Form.Control
						className="mt-3"
						placeholder="Введите стоимость устройства"
						type="number"
						value={price}
						onChange={e => {setPrice(Number(e.target.value))}}
					/>
					<Form.Control
						className="mt-3"
						type="file"
						onChange={e => {setFile(e.target.files[0] || null)}}
					/>
					
					<hr/>
					
					{info.map(i =>
						<Row className="mt-2" key={i.id}>
							<Col md={4}>
								<Form.Control
									placeholder="Введите название"
									value={i.title}
									onChange={e => {changeInfo(i.id, "title", e.target.value)}}
								/>
							</Col>
							<Col md={6}>
								<Form.Control
									placeholder="Введите описание"
									value={i.description}
									onChange={e => {changeInfo(i.id, "description", e.target.value)}}
								/>
							</Col>
							<Col className="text-right">
								<Button
									variant="outline-danger"
									onClick={() => removeInfo(i.id)}
								>
									&times;
								</Button>
							</Col>
						</Row>
					)}
					
					<Button
						className="mt-4"
						variant={"outline-success"}
						onClick={addInfo}
					>
						Добавить характеристику
					</Button>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button disabled={canAddDevice()} variant={"outline-success"} onClick={addDevice}>Добавить</Button>
				<Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default CreateDeviceModal;