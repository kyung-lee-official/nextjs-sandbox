"use client";

import Link from "next/link";

export const Content = () => {
	return (
		<div className="m-6 space-y-4">
			<Link
				href={
					"https://docs.medusajs.com/resources/commerce-modules/user/user-creation-flows"
				}
				className="underline decoration-dotted"
			>
				User Creation Flow
			</Link>
		</div>
	);
};
