import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './OrderWindow.scss';
import { removeOrder, showPopup, hidePopup, clearOrderArray, importOrders } from '../../redux/actions';
import { ErrorBox } from '../../components/ErrorBox/ErrorBox';
import { Popup } from '../../components/Popup/Popup';
import { Loader } from '../../components/Loader/Loader';

export const OrderWindow = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const orders = useSelector(state => state.orders.ordersArray);
	const [stylesBackground, setstylesBackground] = useState({height: '100vh'})
	const [allMount, setAllmount] = useState({allCost: 0, itemCost:0})

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

	useEffect(() => {
		let elem = document.querySelector('.orderWindow_content');
		let contentHeight = elem.getBoundingClientRect().height;
		if(window.innerHeight < contentHeight) {
			setstylesBackground({height: 'auto'})
		}
	}, [])

	useEffect(() => {
		//setAllmount({...allMount, allCost: orders.reduce((count, item) => count + item.cost, 0)}) 
		let elem = document.querySelector('.orderWindow_userOrders');
		let countd = 0;	

		if(elem.children[0].localName !== "h2") {
			for(let item of elem.children) {
				countd += parseInt(item.children[4].innerText)
			}
		}
				setAllmount({...allMount, allCost: countd}) 
	},[orders, allMount.itemCost])

	const setAllmountHandler = (sum) => {
		setAllmount({...allMount, itemCost: allMount.itemCost + sum})
	}

	return (
		<div className="orderWindow" style={stylesBackground}>
			<div className="orderWindow_content" >
				<div onClick={() => history.push('/')} className="closeBtn">&#10799;</div>
				<h2 className="orderWindow_title">Ваше замовлення</h2>
				<hr/>
				<div className="orderWindow_userOrders">
					{orders.length === 0? <h2>Замовлень немає.</h2>: 
						orders.map(item => {
							return <UserOrdersItem item={item} key={item.id} setAllmountHandler={setAllmountHandler}/>
						})
					}

				</div>
				<hr/>
				<div className="orderWindow_allSumMoney">Загальна сума: {allMount.allCost}грн</div>
				<Form />
			</div>
		</div>
	);
}


const UserOrdersItem = ({ item, setAllmountHandler }) => {
	const dispatch = useDispatch();

	 const [sum, setSum] = useState(1);
	
	const minusSum = () => {
		if(sum > 1) {
			setSum( sum - 1 );

		}
								}

	const plusSum = () => {
		setSum( sum + 1 );
	}

	return (
		<div className="orderWindow_userOrders_item">
			<div className="orderWindow_userOrders_item_title">
				<h3>{item.name}</h3>
			</div>
			<div onClick={() => {
				minusSum();
				setAllmountHandler(1);
			}}  className="orderWindow_userOrders_item_minus"><span className="icon-minus"></span></div>
			<div className="orderWindow_userOrders_item_sum">{sum}</div>
			<div onClick={() => {
				plusSum();
				setAllmountHandler(1);
			}} className="orderWindow_userOrders_item_plus"><span className="icon-plus"></span></div>
			<div className="orderWindow_userOrders_item_allAmount">{item.cost * sum}грн</div>
			<button onClick={() => dispatch(removeOrder(item.id))} className="orderWindow_userOrders_item_removeBtn">Видалити</button>
		</div>
	);
}

const Form = () => {
	const history = useHistory();
	const orders = useSelector(state => state.orders.ordersArray);
	const [formData, setFormData] = useState({name: '',  phone: '380', adress: ''});
	const formDataHandler = (event) => {
		setFormData({...formData, [event.target.name]: event.target.value})
	}
	const [error, serError] = useState(null);
	const [popup, setPopup] = useState(null);
	const isTogglePopup = useSelector((state) => state.popup.isTogglePopup);
	const dispatch = useDispatch();
	const [loader, setLoader] = useState(false);	

	const useErrorBox = (text) => {
		serError(<ErrorBox><p>{text}</p></ErrorBox>);
		setTimeout(() => {
			serError(null);
		}, 2950)
	}

	const usePopup = (text) => {
		const styles = {
			text: {
				height: '100%',
				marginTop: '30px',
				textAlign: 'center',
				fontWeigth: 'bold',
			},
			button: {
			    padding: '10px 25px',
			    bordeRadius: '5px',
			    outline: 'none',
			    border: 'none',
			    fontSize: '1.3em',
			    background: '#c80505',
			    cursor: 'pointer',
			    transition: 'all .2s',
			    display:'block',
			    margin: '0 auto',
			    position: 'absolute',
			    bottom: '15px'
			}
		}

		return (
			<Popup>
				<p style={styles.text}>{text}</p>
				<button style={styles.button} onClick={() => {
					history.push('/');
					dispatch(hidePopup())
				}}>На головну сторінку</button>
			</Popup>
		);
	}

	const sendOrder = async () => {
		if(orders.length === 0) {
			useErrorBox('Ви ще не зробили жодного замовлення')
		} else if(formData.name.trim().length < 1) {
			useErrorBox("Ім'я занадто коротке")
			let elem = document.querySelector('input[name="name"]');
			console.dir(elem)
			elem.style.boxShadow = '0 0 10px red';
			elem.style.border = '1px solid red';
		} else if(formData.phone.trim().length !== 12) {
			useErrorBox("Довжина телефону повинна бути 12 цифер")
				let elem = document.querySelector('input[name="phone"]');
			elem.style.boxShadow = '0 0 10px red';
			elem.style.border = '1px solid red';
		} else if(formData.adress.trim().length === 0) {
			useErrorBox("Введіть будьласка вашу адресу")
				let elem = document.querySelector('input[name="adress"]');
			elem.style.boxShadow = '0 0 10px red';
			elem.style.border = '1px solid red';
		} else {
			let elem = document.querySelector('.orderWindow_userOrders');
			let arrOrders = []

			for(let i of elem.children) {
				console.dir(i.children)
				let title = i.children[0].innerText;
				let sum = i.children[2].innerText;
				let allCost = parseInt(i.children[4].innerText)
				arrOrders.push({title, sum, allCost});
			}

			console.log(arrOrders)
			console.log(`
            Ім'я: ${formData.name.trim()}
            Телефот:${formData.phone.trim()}
            Адресса:${formData.adress.trim()}
				`)

			const headers = {
				"Content-Type": "application/json"
			}

			const body = {
				orders: arrOrders,
				name:formData.name.trim(),
				phone:formData.phone.trim(),
				adress:formData.adress.trim()
			}
			setLoader(true);
            let response = await fetch('/api/send/email', {
            	method: 'POST',
				headers: headers,
				body: JSON.stringify(body)
            })
			setLoader(false);	 
            let data = await response.json();

			dispatch(clearOrderArray());

            console.log('response: ',data);	

   			setPopup(usePopup(data.message));
   			dispatch(showPopup());
           }
		}

	

	return (
		<form className="orderWindow_form">
			{error}
			{isTogglePopup && popup}
			{loader && <Loader />}
			<h2>Вкажіть ваші данні</h2>
			<div className="orderWindow_form_name">
				<p>Ім'я</p>

				<input type="text" name="name" onChange={formDataHandler}
				 value={formData.name} 
				 onFocus={() => {
					let elem = document.querySelector('input[name="name"]');
					elem.placeholder="";
					elem.style.boxShadow = '0 0 10px black';
					elem.style.border = '1px solid black';
				 }} 
				 placeholder="Петя Пупкін"/>
				
			</div>
			<div className="orderWindow_form_phone">
				<p>Телефот</p>
				<input type="number" 
					 onFocus={() => {
						let elem = document.querySelector('input[name="phone"]');
						elem.style.boxShadow = '0 0 10px black';
						elem.style.border = '1px solid black';
					 }} 
					name="phone" 
					onChange={formDataHandler} 
					value={formData.phone}/>
			</div>
			<div className="orderWindow_form_adress">
				<p>Адресса</p>
				<input type="text" name="adress"
					onFocus={() => {
						let elem = document.querySelector('input[name="adress"]');
						elem.placeholder="";
						elem.style.boxShadow = '0 0 10px black';
						elem.style.border = '1px solid black';
					}}
					onChange={formDataHandler} value={formData.adress}
					placeholder="вул.Героїв Майдану 10"/>
			</div>
		
			<input onClick={sendOrder} type="button" className="orderWindow_form_sendOrderBtn" value="Надіслати замовлення"/>	
			<input onClick={() => history.push('/')} type="button" className="orderWindow_form_comeBackBtn" value="Повернутись на головну сторінку" />	

		</form>
	);
}