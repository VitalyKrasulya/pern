import React, {useRef, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createType} from "../../http/deviceAPI";

const CreateTypeModal = ({show, onHide}) => {
	const [type, setType] = useState("")
	
	const addType = (e) => {
		if (e) {
			e.preventDefault()
		}
		createType({name:type})
			.then(() => {
				setType("")
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
					Добавить тип
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={addType}>
					<Form.Control
						value={type}
						onChange={e => {setType(e.target.value)}}
						placeholder={"Введите название типа"}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button disabled={!type} variant={"outline-success"} onClick={addType}>Добавить</Button>
				<Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateTypeModal;