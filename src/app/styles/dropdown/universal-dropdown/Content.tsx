"use client";

import { useState } from "react";
import { Dropdown } from "./dropdown/Dropdown";

type User = {
	id: string;
	name: string;
	email: string;
};

export const Content = () => {
	const [stringSelected, setStringSelected] = useState<
		string | string[] | null
	>(null);
	const [objectSelected, setObjectSelected] = useState<User | User[] | null>(
		null
	);
	const [hovered, setHovered] = useState<any>(null);

	const stringOptions = ["Apple", "Banana", "Orange"];
	const objectOptions: User[] = [
		{ id: "1", name: "John", email: "john@example.com" },
		{ id: "2", name: "Jane", email: "jane@example.com" },
		{ id: "3", name: "Bob", email: "bob@example.com" },
	];

	return (
		<div
			className="flex gap-10 h-svh
			bg-black/90"
		>
			<div className="w-[500px] p-4 space-y-4">
				{/* String Dropdown - Single Select */}
				<Dropdown
					kind="string"
					mode="regular"
					options={stringOptions}
					selected={stringSelected}
					setSelected={setStringSelected}
					setHover={setHovered}
					placeholder="Select a fruit"
				/>

				{/* Object Dropdown - Multiple Select with Search */}
				<Dropdown
					kind="object"
					mode="search"
					options={objectOptions}
					selected={objectSelected}
					setSelected={setObjectSelected}
					setHover={setHovered}
					sortBy="name"
					label={{ primaryKey: "name", secondaryKey: "email" }}
					multiple
					placeholder="Select users"
				/>
			</div>
			{/* Preview hovered item */}
			{hovered && (
				<div className="mt-2 p-2 bg-neutral-400 rounded">
					Hovered: {JSON.stringify(hovered)}
				</div>
			)}
		</div>
	);
};
