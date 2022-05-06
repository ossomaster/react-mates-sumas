import React, { useContext } from "react";
import { clearInput, generateProblem, jugarDeNuevo, subtractQuestion, sumarIncorrecto, terminar, writeInput } from "../actions/gameActions";
import GameContext from "../context/GameContext";
import { ALERT_TIMER, gameAlert, isCorrectAnswer, mostrarAlertaRespuestaExitosa, mostrarAlertaRespuestaIncorrecta, sonidoRespuestaCorrecta, sonidoRespuestaIncorrecta } from "../gameHelpers";

import "./Board.scss";

import Button from "./Button";

const generateNumbers = (limit = 9) => {
	const numbers = [];

	for (let i = 1; i <= limit; i++) {
		numbers.push(i);
	}

	numbers.push(0);

	return numbers;
};

const Board = () => {
	const { game, dispatch } = useContext(GameContext);

	const { input, preguntasRestantes, preguntasTotales, incorrectos, tiempoInicio } = game;

	const limpiarEntrada = () => {
		dispatch(clearInput());
	};

	const handleInput = (number) => {
		if (input.length >= 3) return;
		dispatch(writeInput(number));
	};

	const renderNumbers = () =>
		generateNumbers().map((number) => (
			<Button key={number} onClick={() => handleInput(number)}>
				{number}
			</Button>
		));

	const generarOtroProblema = () => {
		dispatch(generateProblem());
	};

	const restarPregunta = () => {
		dispatch(subtractQuestion());
	};

	const esGameOver = () => {
		return preguntasRestantes - 1 < 1;
	};

	const getTiempoJuego = () => {
		const tiempoActual = new Date().getTime();
		const tiempoNoContable = (+preguntasTotales + +incorrectos) * ALERT_TIMER;

		return ((tiempoActual - tiempoInicio - tiempoNoContable) / 1000).toFixed(1);
	};

	const handleGameOver = async () => {
		const html = `
			<h3>¡Felicidades!</h3>
			<p>Terminaste el juego en</p>
			<h5>${getTiempoJuego()} seg</h5>
			<p>Fallaste</p>
			<h5>${incorrectos} veces</h5>
		`;

		const { isConfirmed } = await gameAlert.fire({
			icon: "success",
			html: html,
			timer: false,
			showConfirmButton: true,
			confirmButtonText: "Jugar de nuevo",
			showCancelButton: true,
			cancelButtonText: "Salir",
		});

		if (isConfirmed) {
			dispatch(jugarDeNuevo());
			generarOtroProblema();
			limpiarEntrada();
		} else {
			dispatch(terminar());
		}
	};

	const handleRespuestaCorrecta = async () => {
		sonidoRespuestaCorrecta.play();
		restarPregunta();
		await mostrarAlertaRespuestaExitosa();

		if (esGameOver()) {
			handleGameOver();
		} else {
			generarOtroProblema();
			limpiarEntrada();
		}
	};

	const handleRespuestaIncorrecta = async () => {
		sonidoRespuestaIncorrecta.play();
		limpiarEntrada();
		dispatch(sumarIncorrecto());
		await mostrarAlertaRespuestaIncorrecta();
	};

	const revisarRespuesta = async () => {
		if (isCorrectAnswer(game)) {
			handleRespuestaCorrecta();
		} else {
			handleRespuestaIncorrecta();
		}
	};

	return (
		<div className='board'>
			<div className='board__actions'>
				<Button calcWidth action onClick={limpiarEntrada}>
					<i className='las la-trash-alt'></i>
				</Button>
				<Button calcWidth action onClick={generarOtroProblema}>
					<i className='las la-redo-alt'></i>
				</Button>
				<Button calcWidth action onClick={revisarRespuesta}>
					<i className='las la-paper-plane'></i>
				</Button>
			</div>
			<div className='board__numbers'>{renderNumbers()}</div>
		</div>
	);
};

export default Board;
