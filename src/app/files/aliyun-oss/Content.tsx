"use client";

import { useRef } from "react";

const Content = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const files = inputRef.current?.files;
		if (files) {
			/* do something with the files, e.g., upload to server */
			console.log(Array.from(files));
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="p-12
			space-y-4"
		>
			<input
				type="file"
				multiple
				ref={inputRef}
				className="block w-fit px-2
				bg-neutral-400"
			/>
			<button
				type="submit"
				className="px-1
				text-white
				bg-blue-500
				rounded"
			>
				Upload
			</button>
		</form>
	);
};

export default Content;
