"use server";

/* server action to set the region cookie */
export async function setRegionCookie(region: string) {
	const { cookies } = await import("next/headers");
	const cookieStore = await cookies();
	cookieStore.set("medusaRegion", region, {
		httpOnly: false,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 30 /* 30 days */,
		path: "/",
	});
}

/* server action to set customer cookie */
export async function setCustomerCookie(customerId: string) {
	const { cookies } = await import("next/headers");
	const cookieStore = await cookies();
	cookieStore.set("medusaCustomer", customerId, {
		httpOnly: false,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 30 /* 30 days */,
		path: "/",
	});
}
