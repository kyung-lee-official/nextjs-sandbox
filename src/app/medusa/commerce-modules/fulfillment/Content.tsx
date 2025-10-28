"use client";

import Link from "next/link";

export const Content = () => {
	return (
		<div className="flex flex-col m-6">
			<h1>Fulfillment Module</h1>
			<Link
				href="/medusa/fulfillment/shipping-methods"
				className="underline decoration-dotted cursor-pointer"
			>
				Shipping Methods
			</Link>
		</div>
	);
};
