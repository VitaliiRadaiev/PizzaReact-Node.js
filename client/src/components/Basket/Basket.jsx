import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Basket.scss';

export const Basket = () => {
	const history = useHistory();
	const [classList, setClassList] = useState(['basket']);
	const [isToggleBasket, setIsToggleBasket] = useState(false);
	const orders = useSelector(state => state.orders.ordersArray);

	useEffect(() => {
		if(isToggleBasket) {
			setClassList(['basket', 'showBasket'])
		} else if(!isToggleBasket) {
			setClassList(['basket', 'hidBasket'])
		}
	}, [isToggleBasket])

	const basketHandler = () => {
		setIsToggleBasket(!isToggleBasket)
	}

	return(
		<div className={classList.join(' ')}>
			<div onClick={basketHandler} className="basket_previewBtn">
				{isToggleBasket? <span className="icon-chevron-right"></span> : <span className="icon-chevron-left"></span>}
			</div>
			<button onClick={() => history.push('/order')} className="basket_orderBtn">Замовити</button>
			<div className="basket_numberOfGoods">{orders.length}</div>
		</div>
	);
}