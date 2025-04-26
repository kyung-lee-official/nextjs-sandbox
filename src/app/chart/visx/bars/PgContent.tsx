"use client";

import { BarChart } from "./barchart/BarChart";

/* data order matters, it determines the order of the bars */
const data = [
	{ date: "Apr 01, 2025", salesVolume: 190 },
	{ date: "Apr 02, 2025", salesVolume: -50 },
	{ date: "Apr 03, 2025", salesVolume: 5 },
	{ date: "Apr 04, 2025", salesVolume: 200 },
];

const svgWidth = 900;
const svgHeight = 500;
const margin = { top: 80, right: 80, bottom: 80, left: 80 };

export const PgContent = () => {
	return (
		<div className="p-10">
			<BarChart
				data={data}
				svgWidth={svgWidth}
				svgHeight={svgHeight}
				margin={margin}
			/>
		</div>
	);
};
