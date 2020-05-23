const { Router } = require('express');
const nodemailer = require('nodemailer');
const mailer = require('../nodemailer/nodemailer')

const router = Router();

// /api/auth/register
router.post('/email', async (req, res) => {
	try {
		console.log(req.body)

   	const message = {
   		to: 'bibicon.shop@gmail.com',
   		subject: 'Congratulations! Comrade.',
   		html: `
			<h2>Замовлення</h2>
			<table>
				${req.body.orders.map(item => {
					return `<tr>
					<td>
						<b style="padding: 0 5px">${item.title }</b>
						<span style="padding: 0 5px">Кількість: <b style="padding: 0 5px">${item.sum }</b></span>
						<span style="padding: 0 5px">Ціна за одиницю: <b style="padding: 0 5px">${item.allCost / item.sum}</b></span>
						<span style="padding: 0 5px">Загальна ціна: <b style="padding: 0 5px">${item.allCost}</b></span>
					</td>	
					</tr>`
				})}
			</table> 
			<span style="display: block">Сума всього замовлення: <b style="padding: 0 5px">${req.body.orders.reduce((count,item)=> count + parseInt(item.allCost), 0)}</b></span>
   			<span style="display: block">Ім'я: <b>${req.body.name}</b> </b>
   			<span style="display: block">Телефон: <b>${req.body.phone}</b> </b>
   			<span style="display: block">Адресса: <b>${req.body.adress}</b> </b>
   		`
   	}

	await mailer(message);

	setTimeout(() => {

	res.status(201).json({message: 'Відправлено. Дякуємо за замовлення.'})
	}, 2000)


	} catch(e) {
		res.status(500).json({message: 'Трапилось щось не заплановане, невдалось відправити замовлення, спробуйте ще раз.'})
	}
})


module.exports = router