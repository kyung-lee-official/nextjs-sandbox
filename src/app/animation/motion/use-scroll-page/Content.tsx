"use client";

import {
	motion,
	useMotionValueEvent,
	useScroll,
	useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export const Content = () => {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["end end", "start start"],
	});
	const [mapped, setMapped] = useState(0);
	const xShift = useTransform(scrollYProgress, [0, 1], [0, 50], {
		clamp: false,
	});
	useMotionValueEvent(xShift, "change", (latest) => {
		setMapped(latest);
	});

	/* only for logging the value of scrollYProgress */
	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		console.log(latest);
	});

	return (
		<div className="p-60">
			<div
				className="w-60 h-60
				bg-cyan-300"
			></div>
			<div
				className="w-60 h-60
				bg-lime-300"
			></div>
			<div
				className="w-60 h-60
				bg-emerald-300"
			></div>
			<div
				className="w-60 h-60
				bg-amber-300"
			></div>
			<motion.div
				ref={ref}
				style={{ x: xShift }}
				className="flex justify-center items-center w-60 h-32
				text-red-600
				bg-red-300
				border-dashed border-red-500 border-4"
			>
				mapped: {mapped.toFixed(2)}
			</motion.div>
			<div
				className="w-60 h-60
				bg-cyan-300"
			></div>
			<div
				className="w-60 h-60
				bg-lime-300"
			></div>
			<div
				className="w-60 h-60
				bg-emerald-300"
			></div>
			<div
				className="w-60 h-60
				bg-amber-300"
			></div>
		</div>
	);
};
