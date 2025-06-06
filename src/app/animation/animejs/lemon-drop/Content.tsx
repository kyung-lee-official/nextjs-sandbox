"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Spring, WaveTank } from "./WaveTank";

const StyledContainer = styled.div`
	background-color: #e6fffb;
`;

const StyledLemonContainer = styled.div`
	display: flex;
	justify-content: center;
`;

function easeInCirc(x: number) {
	return 1 - Math.sqrt(1 - Math.pow(x, 2));
}

const waveTank = new WaveTank();

const Content: React.FC<any> = () => {
	const SVG_WIDTH = 100;
	const [counter, setCounter] = useState(0);
	const [dropy, setDropy] = useState(60);
	const [width, setWidth] = useState(SVG_WIDTH);
	const widthRef = useRef(width);
	const [springs, setSprings] = useState<Spring[]>(waveTank.springs);
	const requestIdRef = useRef<number>(0);
	const grid = SVG_WIDTH / waveTank.waveLength;

	const points = [
		[0, 100],
		[0, 0],
		...springs.map((x, i) => [i * grid, x.p]),
		[width, 0],
		[width, 100],
	];

	const springsPath = `${points.map((x) => x.join(",")).join(" ")}`;

	const juice = `M18 ${63 + counter} C15 ${63 + counter} 16 ${
		63 + counter
	} 12 61L9 56C2 33 62 -3 80 12C103 27 44 56 29 58C27 58 25 59 24 61C20 ${
		63 + counter
	} 21 ${63 + counter} 18 ${63 + counter}Z`;

	function updateJuice(timestamp: number) {
		const amp = 20;
		const x = timestamp / 8000;
		const saw = x - Math.floor(x);
		if (saw < 0.84) {
			setCounter(easeInCirc(saw) * amp);
			setDropy(-100);
		} else {
			setCounter(easeInCirc(1 - saw) * amp * 0.1);
			setDropy(70 + Math.pow(saw - 0.84, 2) * 40000);
		}
	}

	function update(timestamp: number) {
		updateJuice(timestamp);
		waveTank.update(waveTank.springs);
		setSprings([...waveTank.springs]);

		const offset = 500;
		const saw =
			(timestamp + offset) / 8000 -
			Math.floor((timestamp + offset) / 8000);
		if (saw < 0.01) {
			drop();
		}
		requestIdRef.current = globalThis.requestAnimationFrame(update);
	}

	function resize() {
		setWidth(document.body.clientWidth);
	}

	function drop() {
		const dropPosition = Math.round(
			((widthRef.current / 2 - 30) / widthRef.current) * 100
		);
		waveTank.springs[dropPosition].p = -15;
	}

	useEffect(() => {
		widthRef.current = width;
	}, [width]);

	useEffect(() => {
		const mediaQuery = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		);
		if (mediaQuery.matches) {
			return;
		}
		requestIdRef.current = requestAnimationFrame(update);
		globalThis.addEventListener("resize", resize);
		resize();

		return () => {
			globalThis.removeEventListener("resize", resize);
			if (requestIdRef.current !== undefined) {
				cancelAnimationFrame(requestIdRef.current);
			}
		};
	}, []);

	return (
		<StyledContainer>
			<StyledLemonContainer>
				<svg
					width="100"
					height="300"
					viewBox="0 0 100 300"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="mt-36"
					role="img"
					aria-label="Fresh logo"
				>
					<circle cx="18" cy={dropy} r="4" fill="#5cdbd3"></circle>
					<path
						d="M11.9 96.3v24H7v-24h4.9Zm7.5 10.2v4h-8.8v-4h8.8Zm1-10.2v4h-9.8v-4h9.8ZM23.2 96.3H31c1.6 0 3 .3 4.1.9 1.1.5 2 1.3 2.6 2.4a8 8 0 0 1 1 4c0 1.3-.2 2.4-.6 3.3-.3 1-.8 1.7-1.5 2.3-.7.6-1.4 1-2.3 1.5l-1.5.8h-6.3v-4h4.3a3 3 0 0 0 1.7-.4c.4-.3.7-.7 1-1.2a5 5 0 0 0 .3-2c0-.7-.1-1.3-.3-1.9-.2-.5-.5-1-1-1.2-.3-.3-.9-.5-1.5-.5h-3v20h-4.8v-24Zm11 24-4.4-10.7h5l4.6 10.5v.2h-5.2ZM55.9 116.3v4H45.4v-4h10.5Zm-9-20v24H42v-24H47Zm7.6 9.8v3.8h-9.1v-3.8h9Zm1.4-9.8v4H45.4v-4h10.5ZM69 114c0-.4 0-.8-.2-1.1 0-.4-.2-.7-.5-1l-1-1-1.9-.8-2.6-1.2-2.2-1.5a6.5 6.5 0 0 1-1.7-2 6 6 0 0 1-.5-2.7c0-1 .1-2 .5-2.7a6 6 0 0 1 1.6-2.2c.7-.5 1.5-1 2.4-1.3a9.5 9.5 0 0 1 7.1.5c1.2.6 2 1.5 2.7 2.6.6 1 1 2.4 1 3.8h-5a5 5 0 0 0-.2-1.8c-.2-.5-.5-1-1-1.2-.4-.3-1-.5-1.6-.5-.6 0-1.1.2-1.5.4-.4.2-.7.6-1 1l-.2 1.4c0 .4.1.8.3 1.1l.8.8a21.3 21.3 0 0 0 2.8 1.4l2.9 1.4a9 9 0 0 1 2 1.8c.7.6 1 1.3 1.4 2a7.9 7.9 0 0 1-.1 5.5c-.4.8-.9 1.5-1.5 2.1a7 7 0 0 1-2.5 1.4c-2 .5-1 1.8-3 1.8s-1.3-1.5-3.2-1.8c-1-.3-2-.8-2.7-1.4a6.7 6.7 0 0 1-1.8-2.5c-.4-1-.6-2.2-.6-3.5h4.9c0 .7 0 1.3.2 1.8.1.5.3 1 .6 1.3.3.2.7.5 1.1.6.5.2 1 .2 1.5.2.7 0 1.2 0 1.6-.3.4-.3.6-.6.8-1 .2-.4.3-.9.3-1.4ZM90.5 106v4h-10v-4h10Zm-8.6-9.7v24h-4.8v-24h4.8Zm12.1 0v24h-4.8v-24H94Z"
						fill="#0A140C"
					/>
					<path
						d="M84 16c13 27 1 52-7 59 0 4-9 9-12 7-12 5-38-2-53-21-6-7 1-21 21-36 13-10 33-17 51-9Z"
						fill="#FFD80B"
					/>
					<path d={juice} fill="#5cdbd3" />
					<path
						d="M69 15c15-1 9 10-6 19L44 44c-2 1-4-2-6 0l-3 6c-3 1-13 3-16 2-5-2-5-9 5-18l7-4c-1-2-1-2 2-5 3-2 19-10 29-11l1 2 6-1Z"
						fill="#FFED4E"
					/>
					<path
						d="M38 35c1-1 3-2 3-4l8-3c0 1-1 3 1 4-2 1-7 1-8 5-1-2-1-2-4-2Z"
						fill="#5cdbd3"
					/>
				</svg>
			</StyledLemonContainer>
			<svg
				width="100%"
				height="100px"
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
			>
				<polygon
					points={springsPath}
					fill="#5cdbd3"
					transform="translate(0, 50)"
				></polygon>
			</svg>
		</StyledContainer>
	);
};

export default Content;
