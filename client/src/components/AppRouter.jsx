import React from 'react';
import {authRoutes, publicRoutes} from "../routes";
import {Route, Routes, Navigate} from "react-router-dom";
import {userStore} from "../store/userStore";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
	return (
		<Routes>
			{userStore.isAuth &&
				authRoutes.map(({path, Component}) =>
					<Route key={path} path={path} element={Component}/>
				)
			}
			{publicRoutes.map(({path, Component}) =>
				<Route key={path} path={path} element={Component}/>
			)}
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	)
})

export default AppRouter;