import React, { useReducer } from "react";

import Game from "./components/Game";
import GameContext from "./context/GameContext";
import gameReducer from "./reducers/gameReducer";

export default function App() {
	const [game, dispatch] = useReducer(gameReducer, {
		jugando: false,
	});

	return (
		<GameContext.Provider
			value={{
				game,
				dispatch,
			}}
		>
			<Game></Game>
		</GameContext.Provider>
	);
}
