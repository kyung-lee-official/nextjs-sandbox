"use client";

import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { useEffect, useState } from "react";

/* helper function to generate colors */
const getColor = (index: number) => {
	const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
	return colors[index % colors.length];
};

type PieChartProps = {
	/* data array with label and value */
	data: { label: string; value: number }[];
	/* width of the SVG */
	svgWidth: number;
	/* height of the SVG */
	svgHeight: number;
	/* margins */
	margin: { top: number; right: number; bottom: number; left: number };
};

export const PieChart = ({
	data,
	svgWidth,
	svgHeight,
	margin,
}: PieChartProps) => {
	const innerWidth = svgWidth - margin.left - margin.right;
	const innerHeight = svgHeight - margin.top - margin.bottom;
	const radius = Math.min(innerWidth, innerHeight) / 2;
	const labelOffset = 30; /* offset distance for the labels */

	/* state to control client-side rendering */
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		/**
		 * enable rendering on the client
		 * the pie rendering uses cos and sin functions and floating-point arithmetic,
		 * these calculations can produce slightly different results on the server and client.
		 */
		setIsClient(true);
	}, []);

	if (!isClient) {
		/* render a placeholder or nothing on the server */
		return <svg width={svgWidth} height={svgHeight}></svg>;
	}

	return (
		<svg width={svgWidth} height={svgHeight}>
			<rect
				width={svgWidth}
				height={svgHeight}
				className="fill-neutral-900"
				rx={10}
			/>
			<Group top={svgHeight / 2} left={svgWidth / 4}>
				<Pie
					data={data}
					pieValue={(d) => d.value}
					outerRadius={radius}
					innerRadius={
						radius * 0.7
					} /* set to 0 for a full pie chart */
					cornerRadius={3}
					padAngle={0.02} /* space between slices */
				>
					{(pie) =>
						pie.arcs.map((arc, index) => {
							const { startAngle, endAngle } = arc;
							const path = pie.path(arc);
							const midAngle = (startAngle + endAngle) / 2;
							const labelX =
								Math.cos(midAngle) * (radius + labelOffset);
							const labelY =
								Math.sin(midAngle) * (radius + labelOffset);

							return (
								<g key={`arc-${index}`}>
									<path
										d={path || ""}
										fill={getColor(index)}
									/>
									<text
										x={labelX}
										y={labelY}
										fill="white"
										fontSize={12}
										textAnchor="middle"
									>
										{arc.data.label}
									</text>
								</g>
							);
						})
					}
				</Pie>
			</Group>
		</svg>
	);
};
