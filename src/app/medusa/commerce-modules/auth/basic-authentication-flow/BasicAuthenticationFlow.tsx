"use client";

import { useMutation } from "@tanstack/react-query";
import { getRegistrationAuthenticationToken } from "./api";
import Link from "next/link";

export const BasicAuthenticationFlow = () => {
	const getRegistrationAuthenticationTokenMutation = useMutation({
		mutationFn: async (data: { email: string; password: string }) => {
			const res = await getRegistrationAuthenticationToken(
				data.email,
				data.password
			);
			return res;
		},
		onSuccess: (data) => {
			console.log("Registration successful:", data);
			// Handle successful registration (e.g., store token, redirect, etc.)
		},
	});

	return (
		<div className="m-6 space-y-4">
			<Link
				href={
					"https://docs.medusajs.com/resources/commerce-modules/auth/authentication-route#1-basic-authentication-flow"
				}
				className="underline decoration-dotted"
			>
				Basic Authentication Flow
			</Link>
			<h3>Register</h3>
			<p>
				Note that `actor_type` is agnostic to Medusa, you will need to
				manually extract it in user creation step later.
			</p>
			<form
				className="flex flex-col gap-4 max-w-sm"
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					const email = formData.get("email") as string;
					const password = formData.get("password") as string;
					getRegistrationAuthenticationTokenMutation.mutate({
						email,
						password,
					});
				}}
			>
				<label>
					Email:
					<input
						type="email"
						name="email"
						required
						defaultValue={"admin@restaurant.com"}
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						name="password"
						required
						defaultValue={"supersecret"}
					/>
				</label>
				<button type="submit" className="underline decoration-dotted">
					Register
				</button>
			</form>
		</div>
	);
};
