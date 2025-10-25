import axios, { Axios, AxiosResponse } from "axios";

export enum CartQK {
	GET_CART_BY_ID = "get-cart-by-id",
	GET_CART_BY_REGION_ID_AND_CUSTOMER_ID = "get-cart-by-region-id-and-customer-id",
	GET_CART_CHECKOUT_INFO_BY_ID = "get-cart-checkout-info-by-id",
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

/**
 * This function tries to get a cart by regionId and customerId.
 * If no cart exists, it creates a new one.
 * @param regionId
 * @param customerId
 * @returns cart info
 */
export async function getCartByRegionIdAndCustomerId(
	regionId: string,
	customerId: string
) {
	const res = await axios.get(
		`/commerce-modules/cart/get-cart-by-region-and-customer?region_id=${regionId}&customer_id=${customerId}`,
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

export async function getCartCheckoutInfoById(cartId: string) {
	const res = await axios.get(
		`/commerce-modules/cart/checkout-info/${cartId}`,
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

export async function updateCart(cartId: string, payload: any) {
	const res = await axios.put(`/commerce-modules/cart/${cartId}`, payload, {
		baseURL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
		headers: {
			"x-publishable-api-key":
				process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
		},
	});
	return res.data;
}

/* === checkout === */

export async function completePaymentCollection(cartId: string) {
	const res = await axios.post(
		`/commerce-modules/cart/checkout/create-payment-collection/${cartId}`,
		{},
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
