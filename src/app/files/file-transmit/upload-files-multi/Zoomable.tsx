import { ImgHTMLAttributes, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DeleteIcon, PreviewIcon } from "./Icons";
import { DeleteConfirmDialog } from "@/app/components/delete-confirmation/DeleteConfirmDialog";

type ImageType = "jpg" | "jpeg" | "png" | "gif";
type VideoType = "mp4";
export type MediaType = ImageType | VideoType;
function isImageType(type: ImageType | VideoType): type is ImageType {
	return ["jpg", "jpeg", "png", "gif"].includes(type);
}

/**
 * regular: zoomable, but without zoom and delete button when hovered
 * upload: zoomable, with zoom and delete button when hovered
 */
type MediaProps =
	| { mode: "regular"; filetype: MediaType; className?: string }
	| {
			mode: "upload";
			filetype: MediaType;
			question: string;
			/* the function to call when the delete operation is confirmed in the dialog */
			onDelete: Function;
			className?: string;
	  };

export const Zoomable = (
	props: ImgHTMLAttributes<HTMLImageElement> & MediaProps
) => {
	const {
		src,
		alt,
		/* width of the image without zoom */ width,
		mode,
		filetype,
		className,
	} = props;

	const imageRef = useRef<HTMLImageElement>(null);

	const [isZoomOut, setIsZoomOut] = useState(false);
	const [showThumbnailMask, setShowThumbnailMask] = useState(false);
	/* show delete dialog */
	const [showDelete, setShowDelete] = useState(false);

	switch (mode) {
		case "regular":
			if (isImageType(filetype)) {
				return (
					<div>
						<button
							className="w-fit"
							onClick={() => {
								setIsZoomOut(true);
							}}
						>
							<img
								ref={imageRef}
								src={src}
								width={width}
								alt={alt}
							/>
						</button>
						{isZoomOut &&
							createPortal(
								<div
									className="fixed top-0 right-0 bottom-0 left-0
									flex justify-center items-center
									bg-black/50
									z-10"
									onClick={(e) => {
										setIsZoomOut(false);
									}}
								>
									<div
										className="flex justify-center items-center w-fit max-w-[95%] h-[90svh]
										overflow-auto hide-scrollbar"
									>
										<img
											onClick={(e) => {
												e.stopPropagation();
											}}
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
			} else {
				/* video */
				return (
					<div>
						<button
							className="w-fit"
							onClick={() => {
								setIsZoomOut(true);
							}}
						>
							<video
								src={src}
								autoPlay
								loop
								muted
								className={"w-full h-full"}
							/>
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
										<video
											onClick={(e) => {
												e.stopPropagation();
											}}
											src={src}
											controls
											className={className}
										/>
									</div>
								</div>,
								document.body
							)}
					</div>
				);
			}
		case "upload":
			const { question, onDelete } = props;
			if (isImageType(filetype)) {
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
							<img
								ref={imageRef}
								src={src}
								width={width}
								alt={alt}
							/>
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
											onClick={(e) => {
												e.stopPropagation();
											}}
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
			} else {
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
							<video
								src={src}
								autoPlay
								loop
								muted
								className={"w-full h-full"}
							/>
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
										<video
											onClick={(e) => {
												e.stopPropagation();
											}}
											src={src}
											controls
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
	}
};
