import { ADDORDER, REMOVEORDER, CLEARORDERARRAY, IMPORTORDERS } from './types';

const initialState = {
	ordersArray: [],
}

export const orderReducer = (state = initialState, action ) => {

	switch (action.type) {
		case ADDORDER:
				let ordersArray = JSON.parse(localStorage.getItem('orders'))
				if(ordersArray) {
					localStorage.setItem('orders', JSON.stringify(ordersArray.concat([action.order])))
				}
			return {...state, ordersArray: state.ordersArray.concat([action.order])}
			break;

		case REMOVEORDER:
				let orderArray = JSON.parse(localStorage.getItem('orders'))
				if(orderArray) {
					localStorage.setItem('orders', JSON.stringify(orderArray.filter(item => item.id !== action.orderId)))
				}
			return {...state, ordersArray: state.ordersArray.filter(item => item.id !== action.orderId)}
			break;

		case IMPORTORDERS:

			return {...state, ordersArray: state.ordersArray.concat([...action.orders])}
			break;	

		case CLEARORDERARRAY:
				localStorage.removeItem('orders');
			return {...state, ordersArray: []}
			break;	

		default:
			return state;
			break;
	}
}