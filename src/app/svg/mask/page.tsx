import BasicMask from "./BasicMask";

const Block = ({ children }: any) => {
	return (
		<div
			className="flex flex-col w-fit p-4 gap-2
			bg-neutral-100
			rounded-lg"
		>
			{children}
		</div>
	);
};

const Page = () => {
	return (
		<div className="flex flex-col p-4 gap-4">
			<Block>
				<h1>Basic Mask</h1>
				<BasicMask />
			</Block>
		</div>
	);
};

export default Page;
