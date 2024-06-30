type BubbleType = {
	type: "q" | "a";
	state: "fulfilled" | "pending" | "error";
	content?: string;
	timestamp?: string;
};
export const Bubble = (props: BubbleType) => {
	const { type, state, content, timestamp } = props;

	switch (type) {
		case "q":
			return (
				<div
					className="flex flex-col p-2 gap-2
					bg-blue-200
					rounded-md"
				>
					<p>{timestamp}</p>
					<p>{content}</p>
				</div>
			);
			break;
		case "a":
			if (state === "pending") {
				return (
					<div
						className="flex flex-col p-2 gap-2
						bg-green-200
						rounded-md"
					>
						<p>...</p>
					</div>
				);
			}
			if (state === "error") {
				return (
					<div
						className="flex flex-col p-2 gap-2
						bg-green-200
						rounded-md"
					>
						<p>{timestamp}</p>
						<p>❗{content}❗</p>
					</div>
				);
			}
			if (state === "fulfilled") {
				return (
					<div
						className="flex flex-col p-2 gap-2
						bg-green-200
						rounded-md"
					>
						<p>{timestamp}</p>
						<p>{content}</p>
					</div>
				);
			}
			break;
		default:
			break;
	}
};
