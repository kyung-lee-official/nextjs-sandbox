import {
	Dispatch,
	ImgHTMLAttributes,
	SetStateAction,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import {
	DeleteIcon,
	DownloadIcon,
	PreviewIcon,
	UnknownFileTypeIcon,
} from "./Icons";
import { DeleteConfirmDialog } from "@/app/components/delete-confirmation/DeleteConfirmDialog";
import { Square } from "./Square";
import { isImageType, isVideoType } from "./types";

type FileProps = {
	name: string;
	question: string;
	/* the function to call when the delete operation is confirmed in the dialog */
	onDelete: Function;
	className?: string;
};

const ThumbnailMask = (props: {
	filetype: string;
	question: string;
	setIsZoomOut: Dispatch<SetStateAction<boolean>>;
	onDelete: Function;
}) => {
	const { filetype, question, setIsZoomOut, onDelete } = props;
	const [showDelete, setShowDelete] = useState(false);
	const [showThumbnailMask, setShowThumbnailMask] = useState(false);

	return (
		<div
			className="absolute top-0 right-0 bottom-0 left-0"
			onMouseOver={() => {
				setShowThumbnailMask(true);
			}}
			onMouseOut={() => {
				setShowThumbnailMask(false);
			}}
		>
			{showThumbnailMask && (
				<div
					className="absolute top-0 right-0 bottom-0 left-0
					flex justify-center items-center gap-4
					bg-black/50"
				>
					{isImageType(filetype) || isVideoType(filetype) ? (
						/* image or video file type */
						<button
							onClick={() => {
								setIsZoomOut(true);
							}}
						>
							<PreviewIcon size={16} />
						</button>
					) : (
						/* unknown file type */
						<button onClick={() => {}}>
							<DownloadIcon size={16} />
						</button>
					)}
					<button
						onClick={() => {
							setShowDelete(true);
						}}
					>
						<DeleteIcon size={16} />
					</button>
				</div>
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
};

export const Item = (
	props: ImgHTMLAttributes<HTMLImageElement> & FileProps
) => {
	const {
		src,
		/* width of the image without zoom */ width,
		name,
		question,
		onDelete,
		className,
	} = props;
	const filetype = name.split(".").pop() as string;

	const imageRef = useRef<HTMLImageElement>(null);

	const [isZoomOut, setIsZoomOut] = useState(false);

	return (
		<div>
			<Square>
				{isImageType(filetype) ? (
					<img ref={imageRef} src={src} width={width} alt={name} />
				) : isVideoType(filetype) ? (
					<video
						src={src}
						autoPlay
						loop
						muted
						className={"w-full h-full"}
					/>
				) : (
					/* unknown file type */
					<div
						className="relative
						flex justify-center items-center w-28 h-28 gap-2
						bg-white/50"
					>
						<div
							className="flex justify-center items-center w-full h-full
							bg-black/50"
						>
							<UnknownFileTypeIcon title={name} size={100} />
						</div>
					</div>
				)}
				<ThumbnailMask
					filetype={filetype}
					question={question}
					setIsZoomOut={setIsZoomOut}
					onDelete={onDelete}
				/>
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
								{isImageType(filetype) ? (
									<img
										onClick={(e) => {
											e.stopPropagation();
										}}
										src={src}
										alt={name}
										className={className}
									/>
								) : (
									<video
										onClick={(e) => {
											e.stopPropagation();
										}}
										src={src}
										controls
										className={className}
									/>
								)}
							</div>
						</div>,
						document.body
					)}
			</Square>
			<div
				title={name}
				className="text-white/50 text-sm
				overflow-hidden whitespace-nowrap text-ellipsis
				cursor-default"
			>
				{name}
			</div>
		</div>
	);
};
