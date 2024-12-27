export const UnknownFileTypeIcon = (props: { size: number }) => {
	const { size } = props;
	return (
		<div className="flex justify-center items-center w-full h-full p-4">
			<svg
				viewBox="0 0 16 16"
				height="full"
				width="full"
				role="img"
				className="fill-black/20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z"></path>
			</svg>
		</div>
	);
};
