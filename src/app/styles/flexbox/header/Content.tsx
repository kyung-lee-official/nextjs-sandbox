"use client";

const Item = ({ children }: { children: React.ReactNode }) => (
	<div
		className="flex-[0_0_80px] flex justify-center items-center h-full px-[10px]
		bg-sky-600
		whitespace-nowrap"
	>
		{children}
	</div>
);

const Placeholder = () => {
	return (
		<div
			className="flex-[0_1_60px] h-full
			bg-lime-400/80"
		></div>
	);
};

const Content = () => {
	return (
		<div className="w-full min-h-screen p-4">
			<div className="w-full">
				<h1 className="text-2xl">Simulates Responsive Gaps</h1>
				<div
					className="flex justify-between w-full h-16
					text-white
					bg-gray-950"
				>
					<div className="flex-[1_0_auto] flex justify-start items-center">
						<Item>Item</Item>
						<Placeholder />
						<Item>Another item</Item>
						<Placeholder />
						<Item>This is a very long item</Item>
					</div>
					<div
						className="flex-[0_0_300px] flex justify-center items-center
						bg-gray-700
						whitespace-nowrap"
					>
						Fixed width
					</div>
				</div>
				<div>Block raw width 374.33 = 80 + 110.72 + 183.61</div>
				<div>
					Note that Items&apos; flex are set to{" "}
					<code>flex-[0_0_80px]</code>, this doesn&apos;t limit the width
					of them if their contents&apos; width exceed 80px
				</div>
			</div>
		</div>
	);
};

export default Content;
