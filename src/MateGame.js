function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

class MateGame {
	constructor(preguntas = 10, signo = "+") {
		this.x = null;
		this.y = null;
		this.signo = signo;
		this.preguntasRestantes = 0;
		this.preguntasTotales = preguntas;

		this.jugando = false;
	}

	getProblem() {
		return { x: this.x, y: this.y };
	}

	getOperaciones() {
		return {
			"+": (x, y) => x + y,
			"-": (x, y) => x - y,
			"*": (x, y) => x * y,
			"/": (x, y) => x / y,
		};
	}

	getOperacionPorSigno() {
		const operacion = this.getOperaciones()[this.signo];

		return operacion(this.x, this.y);
	}

	getRespuestaCorrecta() {
		return this.getOperacionPorSigno();
	}

	getPreguntasRestantes() {
		return this.preguntasRestantes;
	}

	comenzar() {
		this.jugando = true;
		this.preguntasRestantes = this.preguntasTotales;
		this.x = getRandomInt(1, 10);
		this.y = getRandomInt(1, 10);
	}

	restarPregunta() {
		this.preguntasRestantes--;
	}

	revisarRespuesta(respuesta) {
		return Number(respuesta) === this.getRespuestaCorrecta();
	}

	jugarDeNuevo() {
		this.preguntasRestantes = this.preguntasTotales;
	}

	estaJugando() {
		return this.jugando === true;
	}

	hayMasPreguntas() {
		return this.preguntasRestantes > 0;
	}

	terminar() {
		this.jugando = false;
		this.preguntasRestantes = 0;
		this.x = null;
		this.y = null;
	}
}

export default MateGame;
