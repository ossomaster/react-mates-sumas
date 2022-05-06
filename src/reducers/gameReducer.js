import types from "../types/types";

// const initialState = {
// 	x: null,
// 	y: null,
// 	signo: "+",
// 	preguntasRestantes: 0,
// 	preguntasTotales: 10,
// 	jugando: false,
// 	input: "",
// };

const gameReducer = (state, action) => {
	switch (action.type) {
		case types.comenzar:
			return {
				...state,
				jugando: true,
				signo: action.payload.signo,
				preguntasRestantes: action.payload.preguntas,
				preguntasTotales: action.payload.preguntas,
				incorrectos: 0,
				tiempoInicio: action.payload.tiempoInicio,
				x: action.payload.x,
				y: action.payload.y,
				input: "",
			};

		case types.jugarDeNuevo:
			return {
				...state,
				preguntasRestantes: state.preguntasTotales,
				tiempoInicio: action.payload.tiempoInicio,
				incorrectos: 0,
			};

		case types.clearInput:
			return {
				...state,
				input: "",
			};
		case types.writeInput:
			return {
				...state,
				input: String(state.input).concat(action.payload),
			};

		case types.sumarIncorrecto:
			return {
				...state,
				incorrectos: state.incorrectos + 1,
			};

		case types.generateProblem:
			return {
				...state,
				x: action.payload.x,
				y: action.payload.y,
			};
		case types.subtractQuestion:
			return {
				...state,
				preguntasRestantes: state.preguntasRestantes - 1,
			};

		case types.terminar:
			return {
				jugando: false,
			};
		default:
			return state;
	}
};

export default gameReducer;
