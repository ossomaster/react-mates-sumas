import React, { useEffect, useRef } from "react";
import "./Button.scss";

const Button = ({ children, full = false, action = false, calcWidth = false, ...rest }) => {
	const buttonRef = useRef();

	useEffect(() => {
		if (!calcWidth) return;

		const height = buttonRef.current.clientHeight;
		buttonRef.current.style.width = `${height}px`;
	}, [calcWidth, buttonRef]);

	let className = "button";

	if (action) {
		className += " button--action";
	}

	if (full) {
		className += " button--full";
	}

	return (
		<button ref={buttonRef} className={className} {...rest}>
			{children}
		</button>
	);
};

export default Button;
