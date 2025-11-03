import axios from "axios";

export interface PayPalTokenResponse {
	scope: string;
	access_token: string;
	token_type: string;
	app_id: string;
	expires_in: number;
	nonce: string;
}

export const generatePayPalAccessToken =
	async (): Promise<PayPalTokenResponse> => {
		try {
			const res = await axios.post(
				"/api/payment/paypal/v2/get-access-token"
			);
			return res.data;
		} catch (error) {
			console.error("Error generating PayPal access token:", error);
			throw error;
		}
	};

export interface PayPalAddress {
	address_line_1: string;
	address_line_2?: string;
	admin_area_1: string;
	admin_area_2: string;
	postal_code: string;
	country_code: string;
}

interface PayPalAmount {
	currency_code: string;
	value: string;
}

interface PayPalPurchaseUnit {
	reference_id: string;
	amount: PayPalAmount;
}

interface PayPalExperienceContext {
	return_url: string;
	cancel_url: string;
}

interface PayPalPaymentSource {
	paypal: {
		address: PayPalAddress;
		email_address: string;
		payment_method_preference: string;
		experience_context: PayPalExperienceContext;
	};
}

export interface CreateOrderRequest {
	intent: "AUTHORIZE" | "CAPTURE";
	purchase_units: PayPalPurchaseUnit[];
	payment_source: PayPalPaymentSource;
}

export const createPayPalOrder = async (
	accessToken: string,
	orderData: CreateOrderRequest
) => {
	try {
		const response = await axios.post(
			"https://api-m.sandbox.paypal.com/v2/checkout/orders/",
			orderData,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error creating PayPal order:", error);
		throw error;
	}
};
