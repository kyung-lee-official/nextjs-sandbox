import axios from "axios";

export enum PaymentQK {
	GET_PAYMENT_COLLECTION_BY_ID = "get-payment-collection-by-id",
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
