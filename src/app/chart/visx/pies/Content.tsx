"use client";

/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from "react";
import Pie, { ProvidedProps, PieArcDatum } from "@visx/shape/lib/shapes/Pie";
import { scaleOrdinal } from "@visx/scale";
import { Group } from "@visx/group";
import { GradientPinkBlue } from "@visx/gradient";

import { animated, useTransition, interpolate } from "@react-spring/web";

type BrowserUsage = {
	label: string;
	usage: number;
};

type LetterFrequency = {
	letter: string;
	frequency: number;
};

const letters: LetterFrequency[] = [
	{
		letter: "A",
		frequency: 0.08167,
	},
	{
		letter: "B",
		frequency: 0.01492,
	},
	{
		letter: "C",
		frequency: 0.02782,
	},
	{
		letter: "D",
		frequency: 0.04253,
	},
];

const browsers: BrowserUsage[] = [
	{
		label: "Google Chrome",
		usage: 48.09,
	},
	{
		label: "Internet Explorer",
		usage: 24.14,
	},
	{
		label: "Firefox",
		usage: 18.82,
	},
	{
		label: "Safari",
		usage: 7.46,
	},
	{
		label: "Microsoft Edge",
		usage: 0.03,
	},
	{
		label: "Opera",
		usage: 1.32,
	},
	{
		label: "Mozilla",
		usage: 0.12,
	},
	{
		label: "Other/Unknown",
		usage: 0.01,
	},
];

// accessor functions
const usage = (d: BrowserUsage) => d.usage;
const frequency = (d: LetterFrequency) => d.frequency;

// color scales
const getBrowserColor = scaleOrdinal({
	domain: browsers.map((b) => b.label),
	range: [
		"rgba(255,255,255,0.7)",
		"rgba(255,255,255,0.6)",
		"rgba(255,255,255,0.5)",
		"rgba(255,255,255,0.4)",
		"rgba(255,255,255,0.3)",
		"rgba(255,255,255,0.2)",
		"rgba(255,255,255,0.1)",
	],
});
const getLetterFrequencyColor = scaleOrdinal({
	domain: letters.map((l) => l.letter),
	range: [
		"rgba(93,30,91,1)",
		"rgba(93,30,91,0.8)",
		"rgba(93,30,91,0.6)",
		"rgba(93,30,91,0.4)",
	],
});

export function Content() {
	const width = 1200;
	const height = 500;
	const animate = true;
	const margin = { top: 20, right: 20, bottom: 20, left: 20 };

	const [selectedBrowser, setSelectedBrowser] = useState<string | null>(null);
	const [selectedAlphabetLetter, setSelectedAlphabetLetter] = useState<
		string | null
	>(null);

	if (width < 10) return null;

	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	const radius = Math.min(innerWidth, innerHeight) / 2;
	const centerY = innerHeight / 2;
	const centerX = innerWidth / 2;
	const donutThickness = 50;

	return (
		<div className="p-10 space-y-10">
			https://airbnb.io/visx/pies
			<svg width={width} height={height}>
				<GradientPinkBlue id="visx-pie-gradient" />
				<rect
					rx={14}
					width={width}
					height={height}
					fill="url('#visx-pie-gradient')"
				/>
				<Group top={centerY + margin.top} left={centerX - radius}>
					<Pie
						data={
							selectedBrowser
								? browsers.filter(
										({ label }) => label === selectedBrowser
								  )
								: browsers
						}
						pieValue={usage}
						outerRadius={radius}
						innerRadius={radius - donutThickness}
						cornerRadius={3}
						padAngle={0.005}
					>
						{(pie) => (
							<AnimatedPie<BrowserUsage>
								{...pie}
								animate={animate}
								getKey={(arc) => arc.data.label}
								onClickDatum={({ data: { label } }) =>
									animate &&
									setSelectedBrowser(
										selectedBrowser &&
											selectedBrowser === label
											? null
											: label
									)
								}
								getColor={(arc) =>
									getBrowserColor(arc.data.label)
								}
							/>
						)}
					</Pie>
				</Group>
				<Group top={centerY + margin.top} left={centerX + radius}>
					<Pie
						data={
							selectedAlphabetLetter
								? letters.filter(
										({ letter }) =>
											letter === selectedAlphabetLetter
								  )
								: letters
						}
						pieValue={frequency}
						pieSortValues={() => -1}
						outerRadius={radius - donutThickness * 1.3}
					>
						{(pie) => (
							<AnimatedPie<LetterFrequency>
								{...pie}
								animate={animate}
								getKey={({ data: { letter } }) => letter}
								onClickDatum={({ data: { letter } }) =>
									animate &&
									setSelectedAlphabetLetter(
										selectedAlphabetLetter &&
											selectedAlphabetLetter === letter
											? null
											: letter
									)
								}
								getColor={({ data: { letter } }) =>
									getLetterFrequencyColor(letter)
								}
							/>
						)}
					</Pie>
				</Group>
				{animate && (
					<text
						textAnchor="end"
						x={width - 16}
						y={height - 16}
						fill="white"
						fontSize={11}
						fontWeight={300}
						pointerEvents="none"
					>
						Click segments to update
					</text>
				)}
			</svg>
		</div>
	);
}

// react-spring transition definitions
type AnimatedStyles = { startAngle: number; endAngle: number; opacity: number };

const fromLeaveTransition = ({ endAngle }: PieArcDatum<any>) => ({
	// enter from 360° if end angle is > 180°
	startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
	endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
	opacity: 0,
});
const enterUpdateTransition = ({ startAngle, endAngle }: PieArcDatum<any>) => ({
	startAngle,
	endAngle,
	opacity: 1,
});

type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
	animate?: boolean;
	getKey: (d: PieArcDatum<Datum>) => string;
	getColor: (d: PieArcDatum<Datum>) => string;
	onClickDatum: (d: PieArcDatum<Datum>) => void;
	delay?: number;
};

function AnimatedPie<Datum>({
	animate,
	arcs,
	path,
	getKey,
	getColor,
	onClickDatum,
}: AnimatedPieProps<Datum>) {
	const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(
		arcs,
		{
			from: animate ? fromLeaveTransition : enterUpdateTransition,
			enter: enterUpdateTransition,
			update: enterUpdateTransition,
			leave: animate ? fromLeaveTransition : enterUpdateTransition,
			keys: getKey,
		}
	);
	return transitions((props, arc, { key }) => {
		const [centroidX, centroidY] = path.centroid(arc);
		const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;

		return (
			<g key={key}>
				<animated.path
					// compute interpolated path d attribute from intermediate angle values
					d={interpolate(
						[props.startAngle, props.endAngle],
						(startAngle, endAngle) =>
							path({
								...arc,
								startAngle,
								endAngle,
							})
					)}
					fill={getColor(arc)}
					onClick={() => onClickDatum(arc)}
					onTouchStart={() => onClickDatum(arc)}
				/>
				{hasSpaceForLabel && (
					<animated.g style={{ opacity: props.opacity }}>
						<text
							fill="white"
							x={centroidX}
							y={centroidY}
							dy=".33em"
							fontSize={9}
							textAnchor="middle"
							pointerEvents="none"
						>
							{getKey(arc)}
						</text>
					</animated.g>
				)}
			</g>
		);
	});
}
