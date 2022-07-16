import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand} from "../../http/deviceAPI";

const CreateBrandModal = ({show, onHide}) => {
	const [brand, setBrand] = useState("")
	
	const addBrand = (e) => {
		if (e) {
			e.preventDefault()
		}
		createBrand({name:brand})
			.then(() => {
				setBrand("")
				onHide()
			})
	}
	
	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Добавить бренд
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={addBrand}>
					<Form.Control
						value={brand}
						onChange={e => {setBrand(e.target.value)}}
						placeholder={"Введите название бренда"}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button disabled={!brand} variant={"outline-success"} onClick={addBrand}>Добавить</Button>
				<Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateBrandModal;