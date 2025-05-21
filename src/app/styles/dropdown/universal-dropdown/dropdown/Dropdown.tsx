"use client";

import {
	useState,
	useEffect,
	useRef,
	Dispatch,
	SetStateAction,
	ReactNode,
} from "react";

export type DropdownOption = { id: string | number };

type DropdownProps = {
	mode?: "regular" | "search";
	placeholder?: string;
	options: DropdownOption[];
	selected: DropdownOption | DropdownOption[] | null;
	setSelected: Dispatch<
		SetStateAction<DropdownOption | DropdownOption[] | null>
	>;
	setHover?: Dispatch<
		SetStateAction<DropdownOption | DropdownOption[] | null>
	>;
	multiple?: boolean;
	getLabel: (option: DropdownOption) => string;
	getSearchString?: (option: DropdownOption) => string;
	renderOption: (
		option: DropdownOption,
		state: { selected: boolean | null; hovered: boolean }
	) => ReactNode;
	renderValue?: (option: DropdownOption) => ReactNode;
};

export const Dropdown = (props: DropdownProps) => {
	const {
		mode = "regular",
		placeholder = "Select an option",
		options,
		selected,
		setSelected,
		setHover,
		multiple = false,
		getLabel,
		getSearchString,
		renderOption,
		renderValue,
	} = props;

	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [hoveredId, setHoveredId] = useState<string | number | null>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

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

	const handleSelect = (option: DropdownOption) => {
		if (multiple) {
			const currentSelected = Array.isArray(selected) ? selected : [];
			const index = currentSelected.findIndex(
				(item) => item.id === option.id
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

	const handleRemove = (option: DropdownOption) => {
		if (multiple && Array.isArray(selected)) {
			setSelected(selected.filter((item) => item.id !== option.id));
		}
	};

	const filteredOptions = options.filter((option) => {
		if (mode !== "search" || !searchTerm) return true;
		const searchString = getSearchString
			? getSearchString(option)
			: getLabel(option);
		return searchString.toLowerCase().includes(searchTerm.toLowerCase());
	});

	const isSelected = (option: DropdownOption) =>
		multiple && Array.isArray(selected)
			? selected.some((item) => item.id === option.id)
			: selected && (selected as DropdownOption).id === option.id;

	return (
		<div
			ref={dropdownRef}
			className="relative w-full max-w-xs
			text-sm"
		>
			<div
				className="flex items-center flex-wrap min-h-8 px-2 py-1 gap-2
				bg-neutral-800
				border-1 border-neutral-700 rounded-md cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
			>
				{multiple && Array.isArray(selected) && selected.length > 0 ? (
					selected.map((item, i) => (
						<div
							key={i}
							className="flex items-center h-fit px-1.5 py-0.5 gap-1
							text-xs
							text-white/60
							bg-neutral-700
							border-1 border-neutral-600 rounded"
						>
							<span>
								{renderValue
									? renderValue(item)
									: getLabel(item)}
							</span>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleRemove(item);
								}}
								className="text-white/60 hover:text-white/80
								cursor-pointer"
							>
								×
							</button>
						</div>
					))
				) : !multiple && selected ? (
					<span className="text-white/60">
						{renderValue
							? renderValue(selected as DropdownOption)
							: getLabel(selected as DropdownOption)}
					</span>
				) : (
					<span className="text-neutral-400 truncate">
						{placeholder}
					</span>
				)}
			</div>

			{isOpen && (
				<div
					className="absolute z-10 w-full mt-1
					text-white/60
					bg-neutral-800
					border border-neutral-700 rounded-md overflow-auto"
				>
					{mode === "search" && (
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onClick={(e) => e.stopPropagation()}
							placeholder="Search..."
							className="w-full p-2 border-b border-neutral-700 outline-none"
						/>
					)}
					{filteredOptions.map((option) => {
						const selected = isSelected(option);
						const hovered = hoveredId === option.id;
						return (
							<div
								key={option.id}
								className={`px-2 py-1 cursor-pointer ${
									hovered ? "bg-neutral-700" : ""
								}`}
								onClick={() => handleSelect(option)}
								onMouseEnter={() => {
									setHoveredId(option.id);
									setHover && setHover(option);
								}}
								onMouseLeave={() => {
									setHoveredId(null);
									setHover && setHover(null);
								}}
							>
								{renderOption(option, { selected, hovered })}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};
