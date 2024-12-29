import { ImgHTMLAttributes, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DeleteIcon, PreviewIcon } from "./Icons";

type ImageProps = {
	/**
	 * regular: zoomable, but without zoom and delete button when hovered
	 * upload: zoomable, with zoom and delete button when hovered
	 */
	mode: "regular" | "upload";
	className?: string;
};

export const ZoomableImage = (
	props: ImgHTMLAttributes<HTMLImageElement> & ImageProps
) => {
	const {
		mode,
		src,
		alt,
		/* width of the image without zoom */ width,
		className,
	} = props;

	const imageRef = useRef<HTMLImageElement>(null);

	const [isZoomOut, setIsZoomOut] = useState(false);

	switch (mode) {
		case "regular":
			return (
				<div>
					<button
						className="w-fit"
						onClick={() => {
							setIsZoomOut(true);
						}}
					>
						<img ref={imageRef} src={src} width={width} alt={alt} />
					</button>
					{isZoomOut &&
						createPortal(
							<div
								className="fixed top-0 right-0 bottom-0 left-0
								flex justify-center items-center
								bg-black/50
								z-10"
								onClick={() => {
									setIsZoomOut(false);
								}}
							>
								<div
									className="flex justify-center items-center w-fit max-w-[95%] h-[90svh]
									overflow-auto hide-scrollbar"
								>
									<img
										src={src}
										alt={alt}
										className={className}
									/>
								</div>
							</div>,
							document.body
						)}
				</div>
			);
		case "upload":
			return (
				<div>
					<div className="relative">
						<img ref={imageRef} src={src} width={width} alt={alt} />
						<div className="flex justify-center items-center gap-4">
							<button
								onClick={() => {
									setIsZoomOut(true);
								}}
							>
								<PreviewIcon className="w-4 h-4" />
							</button>
							<button
								onClick={() => {
									setIsZoomOut(true);
								}}
							>
								<DeleteIcon className="w-4 h-4" />
							</button>
						</div>
					</div>
					{isZoomOut &&
						createPortal(
							<div
								className="fixed top-0 right-0 bottom-0 left-0
								flex justify-center items-center
								bg-black/50
								z-10"
								onClick={() => {
									setIsZoomOut(false);
								}}
							>
								<div
									className="flex justify-center items-center w-fit max-w-[95%] h-[90svh]
									overflow-auto hide-scrollbar"
								>
									<img
										src={src}
										alt={alt}
										className={className}
									/>
								</div>
							</div>,
							document.body
						)}
				</div>
			);
	}
};
