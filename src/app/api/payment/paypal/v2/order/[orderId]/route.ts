import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function GET(
	request: NextRequest,
	{ params }: { params: { orderId: string } }
) {
	try {
		const cookieStore = await cookies();
		const accessToken = cookieStore.get("paypalAccessToken")?.value;

		if (!accessToken) {
			return NextResponse.json(
				{ error: "PayPal access token not found" },
				{ status: 401 }
			);
		}

		/* Fetch order details from PayPal API */
		const response = await axios.get(
			`https://api-m.sandbox.paypal.com/v2/checkout/orders/${params.orderId}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		return NextResponse.json(response.data);
	} catch (error) {
		console.error("Error fetching PayPal order:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
