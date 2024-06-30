"use client";

import { Ask } from "./Ask";
import { Search } from "./Search";

const Content = () => {
	return (
		<div className="flex w-full p-10 gap-10">
			<Search />
			<Ask />
		</div>
	);
};

export default Content;
