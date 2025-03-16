"use client";

import { useState, useEffect, useRef } from "react";

interface BaseProps<T> {
	mode?: "regular" | "search";
	placeholder?: string;
	options: T[];
	selected: T | T[] | null;
	setSelected: (value: T | T[] | null) => void;
	setHover: (value: T | null) => void;
	multiple?: boolean;
}

interface StringProps<T extends string> extends BaseProps<T> {
	kind: "string";
}

interface ObjectProps<T extends object, K extends keyof T>
	extends BaseProps<T> {
	kind: "object";
	sortBy: K;
	label: {
		primaryKey: K;
		secondaryKey?: K;
	};
}

type DropdownProps<T, K extends keyof T = keyof T> = T extends string
	? StringProps<T>
	: ObjectProps<T, K>;

export const Dropdown = <T, K extends keyof T = keyof T>({
	mode = "regular",
	kind,
	placeholder = "Select an option",
	options,
	selected,
	setSelected,
	setHover,
	multiple = false,
	...rest
}: DropdownProps<T, K>) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Type assertions for object-specific props
	const objectProps = kind === "object" ? (rest as ObjectProps<T, K>) : null;

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSelect = (option: T) => {
		if (multiple) {
			const currentSelected = Array.isArray(selected) ? selected : [];
			const index = currentSelected.findIndex((item) =>
				kind === "string"
					? item === option
					: JSON.stringify(item) === JSON.stringify(option)
			);

			if (index > -1) {
				setSelected([
					...currentSelected.slice(0, index),
					...currentSelected.slice(index + 1),
				]);
			} else {
				setSelected([...currentSelected, option]);
			}
		} else {
			setSelected(option);
			setIsOpen(false);
		}
	};

	const handleRemove = (option: T) => {
		if (multiple && Array.isArray(selected)) {
			setSelected(
				selected.filter((item) =>
					kind === "string"
						? item !== option
						: JSON.stringify(item) !== JSON.stringify(option)
				)
			);
		}
	};

	const filteredOptions = options
		.filter((option) => {
			if (mode !== "search" || !searchTerm) return true;
			if (kind === "string") {
				return (option as string)
					.toLowerCase()
					.includes(searchTerm.toLowerCase());
			}
			const primary = String(
				(option as any)[objectProps?.label.primaryKey]
			);
			const secondary = objectProps?.label.secondaryKey
				? String((option as any)[objectProps.label.secondaryKey])
				: "";
			return (
				primary.toLowerCase().includes(searchTerm.toLowerCase()) ||
				secondary.toLowerCase().includes(searchTerm.toLowerCase())
			);
		})
		.sort((a, b) => {
			if (kind === "object" && objectProps?.sortBy) {
				return String(a[objectProps.sortBy]).localeCompare(
					String(b[objectProps.sortBy])
				);
			}
			return 0;
		});

	const getDisplayValue = (option: T) => {
		if (kind === "string") return option as string;
		return String((option as any)[objectProps!.label.primaryKey]);
	};

	return (
		<div ref={dropdownRef} className="relative w-full max-w-md">
			<div
				className="border rounded-md p-2 bg-white cursor-pointer flex flex-wrap gap-2 min-h-[42px]"
				onClick={() => setIsOpen(!isOpen)}
			>
				{multiple && Array.isArray(selected) && selected.length > 0 ? (
					selected.map((item, index) => (
						<div
							key={index}
							className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1"
						>
							<span>{getDisplayValue(item)}</span>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleRemove(item);
								}}
								className="text-red-500 hover:text-red-700"
							>
								×
							</button>
						</div>
					))
				) : !multiple && selected ? (
					<span>{getDisplayValue(selected as T)}</span>
				) : (
					<span className="text-gray-400">{placeholder}</span>
				)}
			</div>

			{isOpen && (
				<div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
					{mode === "search" && (
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onClick={(e) => e.stopPropagation()}
							placeholder="Search..."
							className="w-full p-2 border-b outline-none"
						/>
					)}
					{filteredOptions.map((option, index) => (
						<div
							key={index}
							className="p-2 hover:bg-gray-100 cursor-pointer"
							onClick={() => handleSelect(option)}
							onMouseEnter={() => setHover(option)}
							onMouseLeave={() => setHover(null)}
						>
							{kind === "string" ? (
								option
							) : (
								<div>
									<div>
										{String(
											(option as any)[
												objectProps!.label.primaryKey
											]
										)}
									</div>
									{objectProps!.label.secondaryKey && (
										<div className="text-sm text-gray-500">
											{String(
												(option as any)[
													objectProps!.label
														.secondaryKey
												]
											)}
										</div>
									)}
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
