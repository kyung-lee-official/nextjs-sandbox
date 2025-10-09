"use client";

import Link from "next/link";

export const Content = () => {
	return (
		<div className="flex flex-col m-6">
			<h1>Customer Module</h1>
			<Link
				href="/medusa/commerce-modules/customer/customer-creation-flows"
				className="underline decoration-dotted"
			>
				Customer Creation Flows
			</Link>
		</div>
	);
};
