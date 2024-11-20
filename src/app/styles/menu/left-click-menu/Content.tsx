"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "./Menu";

const Content = () => {
	const [show, setShow] = useState<boolean>(false);

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
			<div className="w-96">
				you should avoid passing a ref to a child, this could cause
				issues when you have multiple instances of the same component --
				you neither want to share the same ref, nor create a ton of refs
				manually.
			</div>
			<Menu show={show} setShow={setShow} />
		</div>
	);
};

export default Content;
