import axios from "axios";

export enum PaymentQK {
	GET_PAYMENT_COLLECTION_BY_ID = "get-payment-collection-by-id",
	GET_CART_BY_PAYMENT_COLLECTION_ID = "get-cart-by-payment-collection-id",
}

export async function getPaymentCollectionById(paymentCollectionId: string) {
	const res = await axios.get(
		`/commerce-modules/payment/payment-collection/${paymentCollectionId}`,
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

export async function getCartByPaymentCollectionId(
	paymentCollectionId: string
) {
	const res = await axios.get(
		`/commerce-modules/payment/get-cart-by-payment-collection-id/${paymentCollectionId}`,
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
