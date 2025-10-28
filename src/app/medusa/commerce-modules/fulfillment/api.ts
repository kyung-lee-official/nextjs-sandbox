import axios from "axios";

export enum FulfillmentQK {
	GET_SHIPPING_METHODS_BY_CART_ID = "get_shipping_methods_by_cart_id",
}

/* === shipping methods === */

export const getShippingMethodsByCartId = async (cartId: string) => {
	const res = await axios.get(
		`/commerce-modules/fulfillment/get-shipping-methods-by-cart-id/${cartId}`,
		{
			baseURL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
			headers: {
				"x-publishable-api-key":
					process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
			},
		}
	);
	return res.data;
};
