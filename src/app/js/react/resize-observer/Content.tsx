"use client";

import { useRef } from "react";
import useResizeObserver from "./useResizeObserver";

export const Content = () => {
	const ref = useRef<HTMLDivElement>(null);
	const size = useResizeObserver(ref);

	return (
		<div
			ref={ref}
			className="flex justify-center items-center max-w-[1200px] m-4 aspect-video
			bg-red-500/30"
		>
			{size.width} * {size.height}
		</div>
	);
};
