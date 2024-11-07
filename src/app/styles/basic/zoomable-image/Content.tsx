"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";

type ImageProps = {
	src: string;
	width?: number;
};

const ZoomableImage = (props: ImageProps) => {
	const { src, width } = props;

	const imageRef = useRef<HTMLImageElement>(null);

	const [isZoomOut, setIsZoomOut] = useState(false);

	return (
		<div>
			<button
				className="w-fit"
				onClick={() => {
					setIsZoomOut(true);
				}}
			>
				<img ref={imageRef} src={src} width={width} alt="" />
			</button>
			{isZoomOut &&
				createPortal(
					<div
						className="fixed top-0 right-0 bottom-0 left-0
						flex justify-center items-center
						bg-black/50"
						onClick={() => {
							setIsZoomOut(false);
						}}
					>
						<div
							className="flex justify-center items-center w-fit max-w-[95%] h-[90svh]
							overflow-auto hide-scrollbar"
						>
							<img src={src} alt="" />
						</div>
					</div>,
					document.body
				)}
		</div>
	);
};

const Content = () => {
	return (
		<div className="flex flex-col w-full min-h-svh p-10 gap-20">
			<h1 className="text-4xl">Zoomable Image</h1>
			<ZoomableImage
				src={"/images/styles/image/2000x300.jpg"}
				width={300}
			/>
			<ZoomableImage
				src={"/images/styles/image/300x2000.jpg"}
				width={100}
			/>
		</div>
	);
};

export default Content;
