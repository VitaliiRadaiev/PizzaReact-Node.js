import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Preview.scss';
import { showPopup } from '../../redux/actions';


export const Preview = () => {
	const dispatch = useDispatch();

	return (
		<div className="preview">
			<h2 className="preview_title">Хто ми?</h2>
			<p className="preview_text" >
				Наш заклад відкрився в 2006 році в місті Кам'янка Черкаської області. З того часу ми завоювали в нашому місті дуже добру репутацію, де можна було придбати смачну піцу. І в даний момент ми хочемо завоювати нову репутацію для нашого закладу, як найшвидша і найвигодніша доставка піци до вашого дому. Замовити яку ви можете на цьому сайті.
			</p>
				<button    
					onClick={()=> dispatch(showPopup())}
					 className="btn_ourContacts">Наші контакти</button>
					}
			<p className="preview_arrow"><span className="icon-long-arrow-down"></span></p>
		</div>
	);
}