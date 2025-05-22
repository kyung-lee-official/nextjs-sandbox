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
						const found = identifiedStringOptions.find(
							(obj) => obj.id === option.id
						);
						switch (found?.label) {
							case "Apple":
								return <div>🍏 {found.label}</div>;
							case "Banana":
								return <div>🍌 {found.label}</div>;
							case "Orange":
								return <div>🍊 {found.label}</div>;
							default:
								return found?.label;
						}
					}}
					optionWrapperClassName={(option, { selected, hovered }) => {
						return `px-2 py-1 
						${hovered ? "bg-neutral-700" : ""}}
						cursor-pointer truncate`;
					}}
					renderOption={(option, { selected, hovered }) => {
						const found = identifiedStringOptions.find(
							(obj) => obj.id === option.id
						);
						return (
							<div
								className={`flex items-center px-2 gap-2 ${
									selected ? "text-blue-500" : ""
								} ${hovered ? "bg-neutral-700" : ""}
								rounded truncate`}
							>
								<span>{found?.label}</span>
							</div>
						);
					}}
					selectedItemClassName={(option) => {
						switch (option.id) {
							case 0:
								return "text-green-500 truncate";
							case 1:
								return "text-yellow-500 truncate";
							case 2:
								return "text-orange-500 truncate";
							default:
								return "text-white truncate";
						}
					}}
					controlClassName="flex items-center flex-wrap min-h-8 px-2 py-1 gap-2
					bg-neutral-800
					border-1 border-neutral-700 rounded-md cursor-pointer"
					placeholderClassName="text-neutral-400 truncate"
					menuClassName="absolute z-10 w-full mt-1
					text-white/60
					bg-neutral-800
					border border-neutral-700 rounded-md overflow-auto"
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
								className={`flex items-center px-2 gap-2 ${
									selected ? "text-blue-500" : ""
								} ${hovered ? "bg-neutral-700" : ""}
								rounded truncate`}
							>
								<span>{found?.name}</span>
								<span className="text-neutral-400">
									{found?.email}
								</span>
							</div>
						);
					}}
					selectedItemClassName={(option) => {
						return `flex px-1.5 gap-2
						text-white truncate
						border-1 border-neutral-500 rounded-md`;
					}}
					removeButtonClassName={(option) => {
						return `text-red-500 cursor-pointer`;
					}}
					controlClassName="flex items-center flex-wrap min-h-8 px-2 py-1 gap-2
					bg-neutral-800
					border-1 border-neutral-700 rounded-md cursor-pointer"
					placeholderClassName="text-neutral-400 truncate"
					menuClassName="absolute z-10 w-full mt-1
					text-white/60
					bg-neutral-800
					border border-neutral-700 rounded-md overflow-auto"
					searchInputClassName="w-full p-2 border-b border-neutral-700 outline-none"
					optionWrapperClassName={(option, { selected, hovered }) => {
						return `px-2 py-1 cursor-pointer
						${hovered ? "bg-neutral-700" : ""}}`;
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
