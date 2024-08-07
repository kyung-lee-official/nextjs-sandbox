import { Item, Placeholder } from "./Item";

export function Example2() {
	return (
		<div className="w-full">
			<h1 className="text-2xl">Placeholder as dynamic gaps</h1>
			<div
				className="flex justify-between items-center
					bg-neutral-800"
			>
				<div
					className="flex-[0_1_300px] flex h-16
						text-neutral-300"
				>
					<Item>a</Item>
					<Placeholder />
					<Item>aaaaa</Item>
					<Placeholder />
					<Item>aaaaaaaaa</Item>
				</div>
				<div
					className="flex-[0_1_300px] flex h-16
						text-neutral-300"
				>
					<Item>a</Item>
					<Placeholder />
					<Item>aaaaa</Item>
					<Placeholder />
					<Item>aaaaaaaaa</Item>
				</div>
			</div>
		</div>
	);
}
