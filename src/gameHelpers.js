import { Howl } from "howler";
import Swal from "sweetalert2";

export const ALERT_TIMER = 1500;
export const ALERT_IMAGES = 4;
export const PROBLEM_LIMIT = 10;

export const sonidoDeFondo = new Howl({
	src: ["/sounds/background.ogg"],
	volume: 0.3,
	loop: true,
});

export const sonidoRespuestaCorrecta = new Howl({
	src: ["/sounds/success.wav"],
});

export const sonidoRespuestaIncorrecta = new Howl({
	src: ["/sounds/wrong.wav"],
});

export const gameAlert = Swal.mixin({
	timer: ALERT_TIMER,
	showConfirmButton: false,
	allowEscapeKey: false,
	allowOutsideClick: false,
});

export function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

export function getProblem() {
	return {
		x: getRandomInt(1, PROBLEM_LIMIT),
		y: getRandomInt(1, PROBLEM_LIMIT),
	};
}

export const getOperacionesPorSigno = () => ({
	"+": (x, y) => x + y,
	"-": (x, y) => x - y,
	"*": (x, y) => x * y,
	"/": (x, y) => x / y,
});

export const getOperacion = (signo) => getOperacionesPorSigno()[signo];

export const getRespuestaCorrecta = (game) => {
	const operacion = getOperacion(game.signo);
	return operacion(game.x, game.y);
};

export const isCorrectAnswer = (game) => {
	return getRespuestaCorrecta(game) === Number(game.input);
};

export const getRandomImage = (path) => {
	return `${path}/${getRandomInt(1, ALERT_IMAGES)}.png`;
};

export const mostrarAlertaRespuestaExitosa = async () => {
	await gameAlert.fire({
		html: "¡Bien hecho!",
		imageUrl: getRandomImage("/images/success"),
	});
};

export const mostrarAlertaRespuestaIncorrecta = async () => {
	await gameAlert.fire({
		html: "Intenta de nuevo",
		imageUrl: getRandomImage("/images/wrong"),
	});
};
