import { ImgHTMLAttributes, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DeleteIcon, PreviewIcon } from "./Icons";
import { DeleteConfirmDialog } from "@/app/components/delete-confirmation/DeleteConfirmDialog";

/**
 * regular: zoomable, but without zoom and delete button when hovered
 * upload: zoomable, with zoom and delete button when hovered
 */
type ImageProps =
	| { mode: "regular"; className?: string }
	| {
			mode: "upload";
			question: string;
			/* the function to call when the delete operation is confirmed in the dialog */
			onDelete: Function;
			className?: string;
	  };

export const Zoomable = (
	props: ImgHTMLAttributes<HTMLImageElement> & ImageProps
) => {
	const {
		src,
		alt,
		/* width of the image without zoom */ width,
		mode,
		className,
	} = props;

	const imageRef = useRef<HTMLImageElement>(null);

	const [isZoomOut, setIsZoomOut] = useState(false);
	const [showThumbnailMask, setShowThumbnailMask] = useState(false);
	/* show delete dialog */
	const [showDelete, setShowDelete] = useState(false);

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
			const { question, onDelete } = props;
			return (
				<div>
					<div
						className="relative"
						onMouseOver={() => {
							setShowThumbnailMask(true);
						}}
						onMouseOut={() => {
							setShowThumbnailMask(false);
						}}
					>
						<img ref={imageRef} src={src} width={width} alt={alt} />
						{showThumbnailMask && (
							<div
								className="absolute top-0 right-0 bottom-0 left-0
								flex justify-center items-center gap-4
								bg-black/50"
							>
								<button
									onClick={() => {
										setIsZoomOut(true);
									}}
								>
									<PreviewIcon size={16} />
								</button>
								<button
									onClick={() => {
										setShowDelete(true);
									}}
								>
									<DeleteIcon size={16} />
								</button>
							</div>
						)}
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
					<DeleteConfirmDialog
						show={showDelete}
						setShow={setShowDelete}
						question={question}
						onDelete={() => {
							setShowDelete(false);
							onDelete();
						}}
					/>
				</div>
			);
	}
};
