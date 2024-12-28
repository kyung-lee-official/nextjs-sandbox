export const UnknownFileTypeIcon = (props: { title: string; size: number }) => {
	const { title, size } = props;
	return (
		<div
			className="flex justify-center items-center w-full h-full p-4
			bg-white/70
			rounded-md"
			title={title}
		>
			<svg
				viewBox="0 0 16 16"
				height="100%"
				width="100%"
				role="img"
				className="fill-black/20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z"></path>
			</svg>
		</div>
	);
};

export const ImageIcon = () => {
	return (
		<svg
			viewBox="0 0 16 16"
			height="100%"
			width="100%"
			focusable="false"
			role="img"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
			<path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"></path>
		</svg>
	);
};
