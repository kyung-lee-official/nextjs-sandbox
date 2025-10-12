import axios from "axios";

export enum CartQK {
	GET_CART_BY_ID = "get-cart-by-id",
	GET_CARTS_BY_CUSTOMER_ID = "get-carts-by-customer-id",
}

export async function getCartById(cartId: string) {
	const res = await axios.get(`/commerce-modules/cart/${cartId}`, {
		baseURL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
		headers: {
			"x-publishable-api-key":
				process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
		},
	});
	return res.data;
}

export async function getCartsByCustomerId(customerId: string) {
	const res = await axios.get(
		`/commerce-modules/cart/get-carts-by-customer-id/${customerId}`,
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
