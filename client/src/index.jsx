import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import { rootReducer } from './redux/rootReducer';

const store = createStore(rootReducer, compose(
	applyMiddleware(thunk),
	//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));


ReactDOM.render((
	<Provider store={store}>
	   <App />
	 </Provider>
	), document.getElementById('root'));

