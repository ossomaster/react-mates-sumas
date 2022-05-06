import React, { useContext } from "react";
import GameContext from "../context/GameContext";

import "./Problem.scss";

const Problem = () => {
	const {
		game: { x, y, input },
	} = useContext(GameContext);

	return (
		<div className='problem'>
			<div className='problem__inner'>
				<div className='problem__statement'>
					<span>{x}</span>
					<span>+</span>
					<span>{y}</span>
				</div>
				<div className='problem__equal-sign'>=</div>
				<div>
					<div className='problem__result'>{input}</div>
				</div>
			</div>
		</div>
	);
};

export default Problem;
