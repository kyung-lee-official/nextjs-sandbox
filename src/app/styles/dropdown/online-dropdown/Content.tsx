"use client";

import { useState } from "react";
import { Dropdown } from "./dropdown/Dropdown";

type OptionType = {
	id: string;
	name: string;
	label: string;
};

export const Content = () => {
	const [selected, setSelected] = useState<OptionType | OptionType[] | null>(
		null
	);

	const [selectedMulti, setSelectedMulti] = useState<
		OptionType | OptionType[] | null
	>([]);

	/* function to handle deselection of an option */
	const handleDeselect = (option: OptionType) => {
		if (Array.isArray(selectedMulti)) {
			setSelectedMulti(
				selectedMulti.filter((item) => item.id !== option.id)
			);
		}
	};

	return (
		<div
			className="flex gap-x-5
			bg-neutral-700"
		>
			<div className="min-w-[400px] p-4">
				<Dropdown<OptionType>
					placeholder="Search for an option..."
					selected={selected}
					setSelected={setSelected}
					endpoint={`${process.env.NEXT_PUBLIC_NESTJS}/mock-data/online-dropdown`}
					labelKey="name"
				/>
			</div>
			<div className="min-w-[400px] p-4">
				<Dropdown<OptionType>
					placeholder="Search for options..."
					selected={selectedMulti}
					setSelected={setSelectedMulti}
					endpoint={`${process.env.NEXT_PUBLIC_NESTJS}/mock-data/online-dropdown`}
					labelKey="name"
					multiple={true}
				/>
			</div>
			<div className="flex flex-wrap gap-1.5 w-full p-4">
				{selectedMulti &&
					(selectedMulti as OptionType[]).map((selected, i) => {
						return (
							<button
								key={selected.id}
								onClick={() => handleDeselect(selected)}
								className="h-7 px-2 py-1
								text-white text-sm truncate
								hover:line-through
								bg-neutral-600 hover:bg-neutral-500
								rounded-md cursor-pointer"
							>
								{selected.name}
							</button>
						);
					})}
			</div>
		</div>
	);
};
