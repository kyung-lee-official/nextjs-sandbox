"use client";

import { useState } from "react";
import { Dropdown } from "./dropdown/Dropdown";

type OptionType = {
	id: string;
	name: string;
	label: string;
};

export const Content = () => {
	const [selected, setSelected] = useState<OptionType | null>(null);
	return (
		<div
			className="flex gap-10 h-svh
			bg-neutral-700"
		>
			<div className="w-[500px] p-4 space-y-4">
				<Dropdown<OptionType>
					placeholder="Search for an option..."
					selected={selected}
					setSelected={setSelected}
					endpoint={`${process.env.NEXT_PUBLIC_NESTJS}/mock-data/online-dropdown`}
					labelKey="name"
				/>
			</div>
		</div>
	);
};
