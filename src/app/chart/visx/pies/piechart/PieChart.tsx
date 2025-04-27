"use client";

import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { useEffect, useState } from "react";

/* helper function to generate colors */
const getColor = (index: number): string => {
	const colors = [
		// "#36A2EB",
		// "#FFCE56",
		// "#4BC0C0",
		// "#9966FF",
		// "#FF6384",
		// "#FF9F40",
		"white",
	];
	const colorCount = colors.length;
	/* ensure adjacent arcs don't use the same color */
	const adjustedIndex = (index + Math.floor(index / colorCount)) % colorCount;
	return colors[adjustedIndex];
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
	onMouseEnter?: (
		index: number,
		data: { label: string; value: number }
	) => void /* callback for hover */;
	onMouseOut?: (
		index: number,
		data: { label: string; value: number }
	) => void /* callback for mouse leave */;
};

export const PieChart = ({
	data,
	svgWidth,
	svgHeight,
	margin,
	onMouseEnter,
	onMouseOut,
}: PieChartProps) => {
	const innerWidth = svgWidth - margin.left - margin.right;
	const innerHeight = svgHeight - margin.top - margin.bottom;
	const radius = Math.min(innerWidth, innerHeight) / 2;
	const labelOffset = 30; /* offset distance for the labels */

	/* state to control client-side rendering */
	const [isClient, setIsClient] = useState(false);

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
					padAngle={0.015} /* space between slices */
				>
					{(pie) =>
						pie.arcs.map((arc, index) => {
							const { startAngle, endAngle } = arc;

							/* align the arc's angle system with Math's angle system */
							const adjustedStartAngle = startAngle - Math.PI / 2;
							const adjustedEndAngle = endAngle - Math.PI / 2;
							const midAngle =
								(adjustedStartAngle + adjustedEndAngle) / 2;

							/* for debugging */
							// console.log(
							// 	arc.data.label,
							// 	radToDeg(startAngle),
							// 	radToDeg(endAngle)
							// );

							const path = pie.path(arc);

							/* calculate label positions relative to the pie chart's center */
							const labelX =
								Math.cos(midAngle) * (radius + labelOffset);
							const labelY =
								Math.sin(midAngle) * (radius + labelOffset);

							return (
								<g
									key={`arc-${index}`}
									onMouseEnter={() => {
										setHoveredIndex(index);
										if (onMouseEnter) {
											onMouseEnter(index, arc.data);
										}
									}}
									onMouseLeave={() => {
										setHoveredIndex(null);
										if (onMouseOut) {
											onMouseOut(index, arc.data);
										}
									}}
								>
									<path
										d={path || ""}
										fill={getColor(index)}
										style={{
											transform:
												hoveredIndex === index
													? "scale(1.02)"
													: "scale(1)",
											transformOrigin: "0 0",
											transition: "0.2s ease",
										}}
										className="opacity-40 hover:opacity-100 transition-opacity duration-200"
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

const radToDeg = (rad: number): number => (rad * 180) / Math.PI;
