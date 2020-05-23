import React from 'react';
import './Footer.scss';

export const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer_wrapper">
					<div className="footer_copyright">
						<p>Oazis</p>
						<p>Copyright right reserved &#169;</p>
					</div>
					<div className="footer_adress">
						<p>Кам'янка Черкаська.обл</p>
						<p>Індекс: 20801</p>
						<p>вул.Героїв Майдану 10</p>
					</div>
					<div className="footer_contacts">
						<p>тел: 380632290322</p>
						<p>Петя Сергійович Пупкін</p>
					</div>
				</div>
			</div>
		</footer>
	);
}