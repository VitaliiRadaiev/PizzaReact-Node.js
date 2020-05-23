import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Popup.scss';
import { hidePopup } from '../../redux/actions';


export const Popup = (props) => {
	const dispatch = useDispatch();

	return (
		<div className="popup">
			<div className="popup_content">
				<div onClick={()=> dispatch(hidePopup())} className="closeBtn">&#10799;</div>
				{props.children}
			</div>
		</div>
	);
}