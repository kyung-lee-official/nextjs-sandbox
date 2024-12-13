const Row = () => {
	return (
		<div
			className="w-full min-h-24 p-1
			text-sm
			bg-white
			border"
		>
			To avoid the height of the row from affecting the height of the
			container, set the height of the row to `min-h-24`
		</div>
	);
};

const Page = () => {
	return (
		<div className="w-full px-4">
			<h1 className="text-2xl">Flexbox Overflow Y</h1>
			<h2></h2>

			<div
				className="flex flex-col w-72 p-2
				bg-black/10"
			>
				<div>This is a header</div>
				<div
					className="flex flex-col h-[calc(100svh-32px-8px-24px-16px)] gap-1
					overflow-y-auto"
				>
					{new Array(12).fill(0).map((_, i) => (
						<Row key={i} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Page;
