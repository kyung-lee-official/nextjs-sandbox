import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		/* Create base64 encoded credentials for Basic Auth */
		const credentials = Buffer.from(
			`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
		).toString("base64");

		const paypalRes = await axios.post(
			"https://api-m.sandbox.paypal.com/v1/oauth2/token",
			"grant_type=client_credentials",
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: `Basic ${credentials}`,
				},
			}
		);

		return NextResponse.json(paypalRes.data);
	} catch (error) {
		console.error("Error generating PayPal access token:", error);
		return NextResponse.json(
			{ error: "Failed to generate access token" },
			{ status: 500 }
		);
	}
}
