"use client";

import Link from "next/link";

export const Content = () => {
	return (
		<div className="m-6 space-y-4">
			<Link
				href={
					"https://docs.medusajs.com/resources/commerce-modules/user/invite-user-subscriber"
				}
				className="underline decoration-dotted"
			>
				Invite User Email
			</Link>
			
		</div>
	);
};
