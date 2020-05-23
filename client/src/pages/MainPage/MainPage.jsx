import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MainPage.scss';
import { Header } from '../../components/Header/Header';
import { Preview } from '../../components/Preview/Preview';
import { Popup } from '../../components/Popup/Popup';
import { BoardOfGoods } from '../../components/BoardOfGoods/BoardOfGoods';
import { Footer } from '../../components/Footer/Footer';
import { Basket } from '../../components/Basket/Basket';
import { importOrders } from '../../redux/actions';


export const MainPage = () => {
	const dispatch = useDispatch();
	const orders = useSelector(state => state.orders.ordersArray);
	const isTogglePopup = useSelector((state) => state.popup.isTogglePopup);

	useEffect(() => {
		if(!localStorage.getItem('orders')) {
			localStorage.setItem('orders', JSON.stringify([]))
		} else if(orders.length === 0) {
			let ordersArray = JSON.parse(localStorage.getItem('orders'))
			if(ordersArray) {
				dispatch(importOrders(ordersArray))
			}
		}
		
	}, [])

	const usePopup = () => {

		return (
			<Popup>
				<p>Тел: +380943388539</p>
				<p>Адрес: вул.Героїв Майдану 10</p>
				<p>Власник: Генадій Пупкін</p>
			</Popup>
		);
	}

	return (
		<div className="mainPage">
			{isTogglePopup && usePopup()}
			<Basket />
			<Header />
			<div className="container">
				<div className="content">
					<Preview />
					<BoardOfGoods />
				</div>
			</div>
			<Footer />
		</div>
	);
}