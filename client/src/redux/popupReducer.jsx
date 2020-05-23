import { SHOWPOPUP, HIDEPOPUP } from './types';

const initialState = {
	isTogglePopup: false,
}

export const popupReducer = (state = initialState, action ) => {

	switch (action.type) {
		case SHOWPOPUP:
			return {...state, isTogglePopup: true }
			break;
		case HIDEPOPUP:
			return {...state, isTogglePopup: false }
			break;	
		default:
			return state;
			break;
	}
}
