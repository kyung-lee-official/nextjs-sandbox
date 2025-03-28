"use client";

import { useState } from "react";
import { IntegerInput } from "./integer-input/IntegerInput";

export const Content = () => {
	const [unlimited, setUnlimited] = useState(0);
	return (
		<div className="m-8">
			<h1 className="text-2xl font-bold mb-4">Integer Input Component</h1>
			<p className="mb-4">
				This is a simple integer input component that allows users to
				enter only integer values. It also validates the input against
				minimum and maximum values.
			</p>
			<p className="mb-4">
				The component uses regular expressions to validate the input and
				provides feedback to the user if the input is invalid.
			</p>
			<div>
				<IntegerInput
					value={unlimited}
					onChange={(e) => {
						setUnlimited(e as number);
					}}
					placeholder="unlimited"
				/>
				<p className="mt-2 text-gray-500">Current value: {unlimited}</p>
			</div>
		</div>
	);
};
