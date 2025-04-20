"use client";

import { useState } from "react";
import { Dropdown } from "./dropdown/Dropdown";
import axios from "axios";

type OptionType = {
	id: string;
	name: string;
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

	async function fetchOptions(searchTerm: string) {
		const response = await axios.get(
			`/mock-data/online-dropdown/${searchTerm}`,
			{
				baseURL: process.env.NEXT_PUBLIC_NESTJS,
				headers: {
					"Content-Type": "application/json",
					// Authorization: jwt
				},
			}
		);
		return response.data;
	}

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
					fetchOptions={fetchOptions}
					labelKey="name"
				/>
			</div>
			<div className="min-w-[400px] p-4">
				<Dropdown<OptionType>
					placeholder="Search for options..."
					selected={selectedMulti}
					setSelected={setSelectedMulti}
					fetchOptions={fetchOptions}
					labelKey="name"
					renderOption={(option) => {
						return (
							<div className="flex items-center gap-x-2">
								<div>{option.id}</div>
								<span>{option.name}</span>
							</div>
						);
					}}
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
