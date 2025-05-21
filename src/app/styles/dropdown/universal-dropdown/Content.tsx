"use client";

import { useState } from "react";
import { Dropdown, DropdownOption } from "./dropdown/Dropdown";

type User = {
	id: string;
	name: string;
	email: string;
};

type Fruit =
	| "Apple"
	| "Banana"
	| "Orange"
	| "A very loooooooooooooooooooooooooooooooooooooooooooooooooooooog option";

export const Content = () => {
	const [stringSelected, setStringSelected] = useState<
		DropdownOption | DropdownOption[] | null
	>(null);
	const [objectSelected, setObjectSelected] = useState<
		DropdownOption | DropdownOption[] | null
	>(null);
	const [hovered, setHovered] = useState<any>(null);

	const stringOptions: Fruit[] = [
		"Apple",
		"Banana",
		"Orange",
		"A very loooooooooooooooooooooooooooooooooooooooooooooooooooooog option",
	];
	const identifiedStringOptions = stringOptions.map((option, i) => ({
		id: i,
		label: option,
	}));
	const stringOptionIds = identifiedStringOptions
		.sort((a, b) => a.label.localeCompare(b.label))
		.map((option, i) => ({
			id: i,
		})) as DropdownOption[];

	const objectOptions: User[] = [
		{ id: "1", name: "John", email: "john@example.com" },
		{ id: "2", name: "Jane", email: "jane@example.com" },
		{ id: "3", name: "Bob", email: "bob@example.com" },
		{
			id: "4",
			name: "Alice",
			email: "alice@this-is-a-very-loooooooooooooooooooooooooooog-email.com",
		},
	];
	const objectOptionIds = objectOptions
		.sort((a, b) => a.name.localeCompare(b.name))
		.map((option) => ({
			id: option.id,
		})) as DropdownOption[];

	return (
		<div
			className="flex gap-10 h-svh
			bg-black/90"
		>
			<div className="w-[500px] p-4 space-y-4">
				{/* String Dropdown - Single Select */}
				<Dropdown
					mode="regular"
					options={stringOptionIds}
					selected={stringSelected}
					setSelected={setStringSelected}
					setHover={setHovered}
					placeholder="Select a fruit"
					getLabel={(option) => {
						return identifiedStringOptions.find(
							(obj) => obj.id === option.id
						)?.label as string;
					}}
					renderOption={(option, { selected, hovered }) => {
						const found = identifiedStringOptions.find(
							(obj) => obj.id === option.id
						);
						return (
							<div
								className={`flex items-center gap-2 ${
									selected ? "text-blue-500" : ""
								} ${hovered ? "bg-neutral-700" : ""}
								truncate`}
							>
								<span>{found?.label}</span>
							</div>
						);
					}}
					renderValue={(option) => {
						const found = identifiedStringOptions.find(
							(obj) => obj.id === option.id
						);
						return (
							<div
								className="flex items-center gap-2
								min-w-0 max-w-[300px]
								truncate"
							>
								<span>{found?.label}</span>
							</div>
						);
					}}
				/>

				{/* Object Dropdown - Multiple Select with Search */}
				<Dropdown
					mode="search"
					placeholder="Select users"
					options={objectOptionIds}
					selected={objectSelected}
					setSelected={setObjectSelected}
					setHover={setHovered}
					multiple
					getLabel={(option) => {
						return objectOptions.find((obj) => obj.id === option.id)
							?.name as string;
					}}
					getSearchString={(option) => {
						const found = objectOptions.find(
							(obj) => obj.id === option.id
						);
						return found ? found.name + " " + found.email : "";
					}}
					renderOption={(option, { selected, hovered }) => {
						const found = objectOptions.find(
							(obj) => obj.id === option.id
						);
						return (
							<div
								className={`flex items-center gap-2 ${
									selected ? "text-blue-500" : ""
								} ${hovered ? "bg-neutral-700" : ""}
								truncate`}
							>
								<span>{found?.name}</span>
								<span className="text-neutral-400">
									{found?.email}
								</span>
							</div>
						);
					}}
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
