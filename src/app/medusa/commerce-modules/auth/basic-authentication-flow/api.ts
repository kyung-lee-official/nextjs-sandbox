import axios from "axios";

export async function getRegistrationAuthenticationToken(
	email: string,
	password: string,
	actor_type: string
) {
	const res = await axios.post(
		`/api/medusa/auth/${actor_type}/emailpass/register`,
		{
			email,
			password,
		},
		{
			headers: {
				"x-publishable-api-key":
					process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
			},
		}
	);
	return res.data;
}
