import React, { useContext, useEffect } from "react";

import "./Game.scss";

import Board from "./Board";
import Problem from "./Problem";
import GameContext from "../context/GameContext";
import { sonidoDeFondo } from "../gameHelpers";
import NewGame from "./NewGame";

const Game = () => {
	const { game } = useContext(GameContext);

	const { jugando } = game;

	useEffect(() => {
		if (jugando) {
			sonidoDeFondo.play();
		} else {
			sonidoDeFondo.stop();
		}
	}, [jugando]);

	if (!jugando) return <NewGame></NewGame>;

	return (
		<div className='game'>
			<Problem></Problem>
			<Board></Board>
		</div>
	);
};

export default Game;
