import React from 'react';
import {observer} from "mobx-react-lite";
import {ListGroup} from "react-bootstrap";
import {deviceStore} from "../store/deviceStore";

const TypeSideBar = observer(() => {
	const click = (type) => {
		deviceStore.setSelectedType(type)
	}
	
	return (
		<>
			<h3>Категории</h3>
			<ListGroup>
				{deviceStore.types.map(type =>
						<ListGroup.Item
							style={{cursor:"pointer"}}
							active={type.id === deviceStore.selectedType.id}
							onClick={click.bind(null, type)}
							key={type.id}
						>
							{type.name}
						</ListGroup.Item>
					)
				}
			</ListGroup>
		</>
	)
})

export default TypeSideBar;