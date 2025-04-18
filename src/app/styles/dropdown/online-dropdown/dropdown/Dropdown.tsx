"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

type DropdownProps<T> = {
	placeholder?: string;
	selected: T | null;
	setSelected: (value: T | null) => void;
	endpoint: string /* API endpoint for fetching options */;
	labelKey: keyof T /* Key to use for the display label */;
};

export const Dropdown = <T extends Record<string, any>>({
	placeholder = "Select an option",
	selected,
	setSelected,
	endpoint,
	labelKey,
}: DropdownProps<T>) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [options, setOptions] = useState<T[]>([]);
	const [loading, setLoading] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	/* Fetch options from the backend */
	useEffect(() => {
		if (!isOpen || searchTerm === "") {
			setOptions([]);
			return;
		}

		const fetchOptions = async () => {
			setLoading(true);
			try {
				const res = await axios.get(`${endpoint}/${searchTerm}`);
				console.log(res.data);
				setOptions(res.data);
			} catch (error) {
				console.error("Error fetching options:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchOptions();
	}, [searchTerm, isOpen, endpoint]);

	/* Close dropdown when clicking outside */
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

	return (
		<div ref={dropdownRef} className="relative w-full max-w-xs text-sm">
			<div
				className="flex items-center px-2 py-1 bg-neutral-800 border border-neutral-700 rounded-md cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="text-white/60">
					{selected ? selected[labelKey] : placeholder}
				</span>
			</div>

			{isOpen && (
				<div className="absolute z-10 w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-md overflow-auto">
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search..."
						className="w-full p-2
                        text-neutral-400
                        border-neutral-700 border-b outline-none"
					/>
					{loading ? (
						<div className="p-2 text-center text-white/60">
							Loading...
						</div>
					) : options.length > 0 ? (
						options.map((option) => (
							<div
								key={option.id}
								className="px-2 py-1 
								text-neutral-400
								hover:bg-neutral-700 cursor-pointer"
								onClick={() => {
									setSelected(option);
									setIsOpen(false);
								}}
							>
								{option[labelKey]}
							</div>
						))
					) : (
						<div className="p-2 text-center text-white/60">
							No options found
						</div>
					)}
				</div>
			)}
		</div>
	);
};
