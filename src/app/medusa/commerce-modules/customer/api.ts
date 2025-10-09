import axios from "axios";

export enum CustomerQK {
	GET_CUSTOMER_LIST = "get-customer-list",
}

export async function registerCustomer(
	token: string,
	firstName: string,
	lastName: string,
	email: string,
	avatar_url?: string
) {
	const res = await axios.post(
		`/commerce-modules/customer/create-customer`,
		{
			first_name: firstName,
			last_name: lastName,
			email: email,
			avatar_url: avatar_url,
		},
		{
			baseURL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
			headers: {
				Authorization: `Bearer ${token}`,
				"x-publishable-api-key":
					process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
			},
		}
	);
	return res.data;
}

export async function loginCustomer(email: string, password: string) {
	const res = await axios.post(
		`/auth/customer/emailpass`,
		{
			email,
			password,
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

export const getCustomerList = async () => {
	const res = await axios.get(`/commerce-modules/customer`, {
		baseURL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
		headers: {
			"x-publishable-api-key":
				process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
		},
	});
	return res.data;
};

export const deleteCustomer = async (customerId: string) => {
	const res = await axios.delete(`/commerce-modules/customer/${customerId}`, {
		baseURL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
		headers: {
			"x-publishable-api-key":
				process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
		},
	});
	return res.data;
};
