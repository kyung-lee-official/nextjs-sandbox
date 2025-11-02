import Link from "next/link";

const Page = () => {
	return (
		<div className="p-4">
			<Link
				href="/payment/paypal/react-paypal-js"
				className="underline decoration-dotted cursor-pointer"
			>
				React PayPal JS
			</Link>
			<h2 className="flex gap-3">
				<Link
					href="/payment/paypal/orders-api-integration"
					className="underline decoration-dotted cursor-pointer"
				>
					Integrate PayPal directly with the Orders v2 API
				</Link>
				<Link
					href="https://docs.paypal.ai/payments/methods/paypal/api/one-time/orders-api-integration"
					className="underline decoration-dotted cursor-pointer"
				>
					Official docs
				</Link>
			</h2>
		</div>
	);
};

export default Page;
