import React, { useContext, useState } from "react";
import Swal from "sweetalert2";

import { comenzar } from "../actions/gameActions";
import GameContext from "../context/GameContext";
import Button from "./Button";

import "./NewGame.scss";

const NewGame = () => {
	const { dispatch } = useContext(GameContext);

	const [formValues, setFormValues] = useState({
		preguntas: "10",
		operacion: "+",
	});

	const { preguntas, operacion } = formValues;

	const validateFormValues = () => {
		let error = false;

		if (Number(preguntas) < 1) {
			error = "Ingresa un número válido";
		}

		if (error) {
			Swal.fire({
				icon: "warning",
				text: error,
			});
		}

		return error.length ? false : true;
	};

	const handlePlay = () => {
		if (!validateFormValues()) {
			return;
		}

		dispatch(
			comenzar({
				preguntas: preguntas,
				signo: operacion,
			})
		);
	};

	const handleInputChange = (e) => {
		setFormValues((val) => {
			return {
				...val,
				[e.target.name]: e.target.value,
			};
		});
	};

	return (
		<div className='newGame'>
			<div className='newGame__inner'>
				<h1 className='newGame__title'>Nuevo Juego</h1>

				<div className='newGame__form-group'>
					<label htmlFor='' className='newGame__form-label'>
						Preguntas:
					</label>
					<input value={preguntas} onChange={handleInputChange} name='preguntas' type='number' className='newGame__form-control' />
				</div>

				{/* <div className='newGame__form-group'>
					<label htmlFor='' className='newGame__form-label'>
						Operación:
					</label>
					<select value={operacion} onChange={handleInputChange} className='newGame__form-control'>
						<option value='+'>+</option>
					</select>
				</div> */}

				<Button full onClick={handlePlay}>
					Jugar
				</Button>
			</div>
		</div>
	);
};

export default NewGame;
