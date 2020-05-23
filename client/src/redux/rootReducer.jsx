import { combineReducers } from 'redux';
import { popupReducer } from './popupReducer';
import { orderReducer } from './orderReducer';

const initialState = {
	isToggleName: false,
	sum: null
}

export const rootReducer = combineReducers({
	popup: popupReducer,
	orders: orderReducer
})


// import { combineReducers } from 'redux';
// import { nameReducer } from './nameReducer';
// import { getUsersReducer } from './getUserReducer';


// export const rootReducer  = combineReducers({
// 	name: nameReducer,
// 	users: getUsersReducer
// })