import React, { useState, useEffect } from 'react';
import './ErrorBox.scss';

export const ErrorBox = (props) => {
	const [animation, setAnimation] = useState(['hid']);

	useEffect(() => {
		setAnimation(['errorBox']);
		setTimeout(() => {
			setAnimation(['hide']);
		}, 2950)
	},[])

	return (
		<div className={animation.join(' ')}>
			{props.children}
		</div>
	);
}