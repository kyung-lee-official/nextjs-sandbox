"use client";

import { BarChart } from "./barchart/BarChart";
import { convertNumberToHumanReadable } from "num-guru";

/* data order matters, it determines the order of the bars */
const dateSalesVolume = [
	{ date: "Apr 01, 2025", salesVolume: 190 },
	{ date: "Apr 02, 2025", salesVolume: -50 },
	{ date: "Apr 03, 2025", salesVolume: 5 },
	{ date: "Apr 04, 2025", salesVolume: 200 },
];
const inStock = [
	{ date: "Shanghai", salesVolume: 190 },
	{ date: "Shenzhen", salesVolume: 50 },
	{ date: "Guangzhou", salesVolume: 200 },
];
const dateGmv = [
	{ date: "Apr 01, 2025", Gmv: 41906600 },
	{ date: "Apr 02, 2025", Gmv: 30040600 },
	{ date: "Apr 03, 2025", Gmv: 50000880 },
	{ date: "Apr 04, 2025", Gmv: 20005400 },
];

const svgWidth = 900;
const svgHeight = 500;
const margin = { top: 80, right: 80, bottom: 80, left: 80 };

export const PgContent = () => {
	return (
		<div className="p-10 space-y-10">
			<BarChart
				data={dateSalesVolume}
				svgWidth={svgWidth}
				svgHeight={svgHeight}
				margin={margin}
			/>
			<BarChart
				data={inStock}
				svgWidth={svgWidth}
				svgHeight={svgHeight}
				margin={margin}
			/>
			<BarChart
				data={dateGmv}
				svgWidth={svgWidth}
				svgHeight={svgHeight}
				margin={margin}
				textFormatter={(v) => {
					return `¥ ${convertNumberToHumanReadable(v)}`;
				}}
				axisLeftTickFormatter={(v) => {
					return `¥ ${convertNumberToHumanReadable(v)}`;
				}}
			/>
		</div>
	);
};
