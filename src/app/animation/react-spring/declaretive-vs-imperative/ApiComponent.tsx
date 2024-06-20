"use client";

import { useSpring, useSpringRef, animated } from "@react-spring/web";
import { Container } from "./Container";

const ApiComponent = () => {
	const api = useSpringRef();
	const springs = useSpring({
		ref: api,
		from: { x: 0 },
	});

	const handleClick = () => {
		api.start({
			to: {
				x: springs.x.get() === 100 ? 0 : 100,
			},
		});
	};

	return (
		<Container>
			<animated.div
				onClick={handleClick}
				className={"w-20 h-20 bg-red-500 rounded-2xl"}
				style={{
					...springs,
				}}
			/>
			<span>Render ID - {Math.random()}</span>
		</Container>
	);
};

export default ApiComponent;
