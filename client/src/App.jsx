import React from 'react';
import { HashRouter,  Switch, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { OrderWindow } from './pages/OrderWindow/OrderWindow';


function App() {
	return (
		<HashRouter>
			<Switch>
				<Route path="/" exact>
					<MainPage />
				</Route>
				<Route path="/order" exact>
					<OrderWindow />
				</Route>
			</Switch>
		</HashRouter>
	);
}

export default App;
