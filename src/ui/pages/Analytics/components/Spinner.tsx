import React from 'react';
import { SpinnerRoundFilled } from 'spinners-react';
const Spinner = (props) => {

	return (
		<div style={{position:"absolute", margin: "auto"}}>
			<SpinnerRoundFilled size={50} color="#ccc"/>
		</div>
	);

};

export default Spinner;
