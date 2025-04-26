"use client";

import { AxisBottom, AxisLeft } from "@visx/axis";
import { Grid } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { Text } from "@visx/text";
import dayjs from "dayjs";

const data = [
	{ date: "Apr 01, 2025", salesVolume: 190 },
	{ date: "Apr 02, 2025", salesVolume: -50 },
	{ date: "Apr 03, 2025", salesVolume: 5 },
	{ date: "Apr 04, 2025", salesVolume: 200 },
];

const svgWidth = 900;
const svgHeight = 500;
const margin = { top: 80, right: 80, bottom: 80, left: 80 };

/**
 * https://airbnb.io/visx/docs/scale
 * https://d3js.org/d3-scale/band
 */
const dateScale = scaleBand({
	domain: data.map((d) => dayjs(d.date).toDate()),
	range: [0, svgWidth - margin.left - margin.right],
	padding: 0.6,
});

const salesVolumeScale = scaleLinear({
	domain: [
		Math.min(...data.map((d) => d.salesVolume), 0) /* minimum value or 0 */,
		Math.max(...data.map((d) => d.salesVolume), 0) /* maximum value or 0 */,
	],
	range: [svgHeight - margin.top - margin.bottom, 0] /* top to bottom */,
});

export const PgContent = () => {
	return (
		<div className="p-10">
			<svg width={svgWidth} height={svgHeight}>
				<rect
					width={svgWidth}
					height={svgHeight}
					className="fill-neutral-900"
					rx={10}
				/>
				{/* https://airbnb.io/visx/docs/group */}
				<Group top={margin.top} left={margin.left}>
					<Grid
						top={0} /* it's already inside the Group */
						left={0} /* it's already inside the Group */
						xScale={dateScale}
						yScale={salesVolumeScale}
						width={svgWidth - margin.left - margin.right}
						height={svgHeight - margin.top - margin.bottom}
						stroke="white"
						strokeOpacity={0.3}
					/>
					{data.map((d) => {
						const barWidth = dateScale.bandwidth();
						const barX = dateScale(dayjs(d.date).toDate()) ?? 0;

						/* calculate the y position and height dynamically based on whether the value is positive or negative. */
						const barY0 = salesVolumeScale(0);
						const barHeight = Math.abs(
							barY0 - salesVolumeScale(d.salesVolume)
						);
						const barY =
							d.salesVolume > 0 ? barY0 - barHeight : barY0;
						// console.log(
						// 	"salesVolume",
						// 	d.salesVolume,
						// 	"barY0",
						// 	barY0,
						// 	"barY",
						// 	barY,
						// 	"barHeight",
						// 	barHeight
						// );

						/* calculate the position for the text */
						/* adjust offset for positive/negative bars */
						const textY =
							d.salesVolume > 0
								? barY - 5
								: barY + barHeight + 15;
						/* center the text horizontally */
						const textX = barX + barWidth / 2;

						return (
							<g key={`bar-group-${dayjs(d.date).toDate()}`}>
								<Bar
									x={barX}
									width={barWidth}
									y={barY}
									height={barHeight}
									className={
										d.salesVolume > 0
											? "fill-neutral-400"
											: "fill-neutral-600"
									}
								/>
								<Text
									x={textX}
									y={textY}
									/* center the text horizontally */
									textAnchor="middle"
									/* text color */
									fill="white"
									/* adjust font size as needed */
									fontSize={12}
								>
									{d.salesVolume}
								</Text>
							</g>
						);
					})}
					<AxisLeft
						left={0} /* it's already inside the Group */
						/* use the salesVolumeScale for the y-axis */
						scale={salesVolumeScale}
						/* axis line color */
						stroke="white"
						/* tick color */
						tickStroke="white"
						/* format the tick values */
						tickFormat={(d) => d.toString()}
						tickLabelProps={() => ({
							/* tick label color */
							fill: "white",
							/* font size for tick labels */
							fontSize: 12,
							/* align the labels to the right */
							textAnchor: "end",
							/* move the labels slightly to the left */
							dx: -5,
						})}
					/>
					<AxisBottom
						/* position the axis at the bottom of the chart */
						top={salesVolumeScale(
							Math.min(...data.map((d) => d.salesVolume))
						)}
						left={0} /* it's already inside the Group */
						/* use the dateScale for the x-axis */
						scale={dateScale}
						/* axis line color */
						stroke="white"
						/* tick color */
						tickStroke="white"
						/* map the date to desired format */
						tickFormat={(d) => {
							return dayjs(d).format("MMM DD, YYYY");
						}}
						tickLabelProps={() => ({
							/* tick label color */
							fill: "white",
							/* font size for tick labels */
							fontSize: 12,
							/* center the labels */
							textAnchor: "middle",
							/* move the labels down */
							dy: 10,
						})}
					/>
				</Group>
			</svg>
		</div>
	);
};
