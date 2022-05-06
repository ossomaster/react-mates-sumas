import { getProblem } from "../gameHelpers";
import types from "../types/types";

export const comenzar = ({ preguntas, signo }) => {
	const { x, y } = getProblem();

	return {
		type: types.comenzar,
		payload: {
			preguntas,
			signo,
			x,
			y,
			tiempoInicio: new Date().getTime(),
		},
	};
};

export const jugarDeNuevo = () => {
	const { x, y } = getProblem();
	return {
		type: types.jugarDeNuevo,
		payload: {
			tiempoInicio: new Date().getTime(),
			x,
			y,
		},
	};
};

export const clearInput = () => {
	return {
		type: types.clearInput,
	};
};

export const writeInput = (input) => {
	return {
		type: types.writeInput,
		payload: input,
	};
};

export const sumarIncorrecto = () => {
	return {
		type: types.sumarIncorrecto,
	};
};

export const generateProblem = () => {
	return {
		type: types.generateProblem,
		payload: getProblem(),
	};
};

export const subtractQuestion = () => {
	return {
		type: types.subtractQuestion,
	};
};

export const terminar = () => {
	return {
		type: types.terminar,
	};
};
