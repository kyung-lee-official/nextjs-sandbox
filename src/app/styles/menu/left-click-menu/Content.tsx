"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const Content = () => {
	const [show, setShow] = useState<boolean>(false);

	const entryRef = useRef<HTMLDivElement | null>(null);

	const handleClick = useCallback((e: any) => {
		if (entryRef.current) {
			if (
				e.target === entryRef.current ||
				entryRef.current.contains(e.target)
			) {
				setShow((state) => {
					return !state;
				});
			} else {
				setShow(false);
			}
		}
	}, []);

	useEffect(() => {
		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<div className="flex flex-col p-10 gap-3">
			<h2>
				This is similar to{" "}
				<Link
					href={"/styles/dropdown/header-dropdown"}
					className="underline"
				>
					/styles/dropdown/header-dropdown
				</Link>
			</h2>
			<div className="relative w-fit">
				<div
					ref={entryRef}
					className="p-2 bg-black/30 hover:bg-black/40
					rounded-md shadow-lg cursor-pointer"
				>
					Left click this Menu.
				</div>
				{show && (
					<div
						className="absolute 
						flex flex-col
						bg-gray-200/80 rounded-md shadow-lg"
					>
						<button className="p-2">Copy</button>
						<button className="p-2">Paste</button>
						<button className="p-2">Cut</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Content;
