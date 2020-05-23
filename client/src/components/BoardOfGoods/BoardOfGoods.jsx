import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './BoardOfGoods.scss';
import { bigPizzaData } from '../../data/bigPizzaData';
import { smallPizzaData } from '../../data/smallPizzaData';
import { saladsData } from '../../data/saladsData';
import { dessertsData } from '../../data/dessertsData';
import { winesData } from '../../data/winesData';
import { addOrder, removeOrder } from '../../redux/actions';


export const BoardOfGoods = () => {
	const [goodsData, setGoodsData] = useState({
		products:bigPizzaData, 
		title: 'Піца',
		isActive: { pizza:true, salads:false, drinks:false, desserts:false, big:true, small:false }

	});

	function goodsDataHandler(event) {
		if(event) {
			event.persist();
			switch (event.target.dataset.name) {
				case 'pizza':
					setGoodsData({
						products:bigPizzaData, 
						title: 'Піца',
						isActive: { pizza:true, salads:false, drinks:false, desserts:false, big:true, small:false }
					})
					break;
				case 'salads':
					setGoodsData({
						products:saladsData, 
						title: 'Салати',
						isActive: { pizza:false, salads:true, drinks:false, desserts:false, big:true, small:false }
					})
					break;
				case 'drinks':
					setGoodsData({
						products:winesData, 
						title: 'Напої',
						isActive: { pizza:false, salads:false, drinks:true, desserts:false, big:true, small:false }
					})
					break;
				case 'desserts':
					setGoodsData({
						products:dessertsData, 
						title: 'Десерти',
						isActive: { pizza:false, salads:false, drinks:false, desserts:true, big:true, small:false }
					})
					break;
				case 'big':
					setGoodsData({
						products:bigPizzaData, 
						title: 'Піца',
						isActive: { pizza:true, salads:false, drinks:false, desserts:false, big:true, small:false }
					})
					break;
				case 'small':
					setGoodsData({
						products:smallPizzaData, 
						title: 'Піца',
						isActive: { pizza:true, salads:false, drinks:false, desserts:false, big:false, small:true }
					})
					break;							
			}
		}
	}

	return (
		<div className="boardOfGoods">
			<div className="board_nav">

				<div onClick = {goodsDataHandler}
					style={goodsData.isActive.pizza? {background: 'rgba(255, 255, 255, 0.6)'}: null}
					className="board_nav_tab" data-name="pizza"
					>Піца
				</div>

				<div onClick = {goodsDataHandler}
					style={goodsData.isActive.salads? {background: 'rgba(255, 255, 255, 0.6)'}: null} 
					className="board_nav_tab" 
					data-name="salads"
					>Салати
				</div>

				<div onClick = {goodsDataHandler}
					style={goodsData.isActive.drinks? {background: 'rgba(255, 255, 255, 0.6)'}: null} 
					className="board_nav_tab" 
					data-name="drinks"
					>Напої

				</div>

				<div onClick = {goodsDataHandler}
					style={goodsData.isActive.desserts? {background: 'rgba(255, 255, 255, 0.6)'}: null}
					className="board_nav_tab" 
					data-name="desserts"
					>Десерти

				</div>
			</div>
			<Goods goodsData={goodsData} goodsDataHandler={goodsDataHandler}/>
		</div>
	);
}

const Goods = ({ goodsData, goodsDataHandler }) => {
	return (
		<div className="goods">
			<div className="goods_title">
				{goodsData.title}
			</div>
			
			{goodsData.title === 'Піца'? 
				(<div>
					<span
						onClick={goodsDataHandler}
						style={goodsData.isActive.big? {background: '#b4674a'}: null} 
						className="goods_bigPizzaBtn" 
						data-name="big"
						>Велика</span>
					<span
						onClick={goodsDataHandler}
						style={goodsData.isActive.small? {background: '#b4674a'}: null}  
						className="goods_smallPizzaBtn" 
						data-name="small"
						>Мала</span>
				</div>)
				:null}

			<hr/>
			
			{goodsData.products.map(item => {
				return (
					<GoodsItem item={item} key={item.id}/>
				);
			})}

		</div>
	);
}


const GoodsItem = ({ item }) => {
	const ordersArray = useSelector(state => state.orders.ordersArray);
	const [isToggleBlock, setIsToggleBlock] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if(ordersArray.length === 0) setIsToggleBlock(false);
			else {
				setIsToggleBlock(ordersArray.some(i => i.id === item.id))

			}
	},[ordersArray])

	return (
		<div className="goods_item">
		{isToggleBlock? <div className="goods_item_block"> 
				<span className="goods_item_block_ordered">В корзині.</span>
				<span onClick={() => {
					dispatch(removeOrder(item.id))
				}} className="goods_item_block_cancel">відмінити</span>
			</div> : null}

			<div className="goods_item_title">
				<h3>{item.name}</h3>
				<p><span>Інгрідієнти:</span> {item.ingredients} </p>
			</div>
			<div className="goods_item_cost">
				{item.cost}грн
			</div>
			<button onClick={() => {
				dispatch(addOrder(item));
			}} className="goods_item_addToCart">Добавити в корзину</button>
		</div>
	);
}