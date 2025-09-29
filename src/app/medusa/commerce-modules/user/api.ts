import axios from "axios";

export enum UserQK {}

export async function inviteUser(email: string) {
	const res = await axios.post(
		`/commerce-modules/user/invite-user`,
		{
			email,
		},
		{
			baseURL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
			headers: {
				"x-publishable-api-key":
					process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
			},
		}
	);
	return res.data;
}
