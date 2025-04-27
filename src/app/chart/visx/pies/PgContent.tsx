"use client";

import { PieChart } from "./piechart/PieChart";

const inStock = [
	{ label: "Zhuhai", value: 1 },
	{ label: "Guangzhou", value: 50 },
	{ label: "Shenzhen", value: 70 },
	{ label: "Shanghai", value: 100 },
];

const svgWidth = 1200;
const svgHeight = 500;
const margin = { top: 80, right: 80, bottom: 80, left: 80 };

export const PgContent = () => {
	return (
		<div className="p-10 space-y-10">
			<PieChart
				data={inStock}
				svgWidth={svgWidth}
				svgHeight={svgHeight}
				margin={margin}
			/>
		</div>
	);
};
