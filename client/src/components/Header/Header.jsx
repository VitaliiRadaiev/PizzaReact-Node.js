import React from 'react';
import './Header.scss';

export const Header = () => {
	return (
		<div className="header">
			<div className="header_wrapper">
				<div className="header_logo">
				<span>О</span>
				<span>а</span>
				<span>з</span>
				<span>и</span>
				<span>с</span>
				</div>

				<div className="container">
					<h1 className="header_title">Кам'янка</h1>
					<p className="header_subtitle">Швидка доставка до вашого дому.</p>
				</div>
			</div>
		</div>
	);
}