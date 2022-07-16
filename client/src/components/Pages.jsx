import React from 'react';
import {PageItem, Pagination} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {deviceStore} from "../store/deviceStore";

const Pages = observer(() => {
	const pageCount = Math.ceil(deviceStore.totalCount / deviceStore.limit)
	
	if (pageCount <= 1) {
		return <></>
	}
	
	const pages = []
	
	for (let i = 0; i < pageCount; i++) {
		pages.push(i+1)
	}
	
	return (
		<Pagination className="mt-4">
			{pages.map(page =>
				<PageItem
					key={page}
					activeLabel=""
					active={page === deviceStore.page}
					onClick={() => {deviceStore.setPage(page)}}
				>
					{page.toString()}
				</PageItem>
			)}
		</Pagination>
	)
})

export default Pages;