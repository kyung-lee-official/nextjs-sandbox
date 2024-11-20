"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Menu } from "./Menu";

const Content = () => {
	const [show, setShow] = useState<boolean>(false);
	const entryRef = useRef<HTMLButtonElement | null>(null);

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
			<Menu show={show} setShow={setShow} ref={entryRef} />
		</div>
	);
};

export default Content;
