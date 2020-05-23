import { SHOWPOPUP, HIDEPOPUP, ADDORDER, REMOVEORDER, CLEARORDERARRAY, IMPORTORDERS } from './types';

export function showPopup() {
	return {
		type: SHOWPOPUP
	}
}

export function hidePopup() {
	return {
		type: HIDEPOPUP
	}
}

export function addOrder(order) {
	return {
		type: ADDORDER,
		order: order,
	}
}

export function removeOrder(orderId) {
	return {
		type: REMOVEORDER,
		orderId,
	}
}

export function importOrders(orders) {
	return {
		type: IMPORTORDERS,
		orders: orders
	}
}

export function clearOrderArray() {
	return {
		type: CLEARORDERARRAY
	}
}