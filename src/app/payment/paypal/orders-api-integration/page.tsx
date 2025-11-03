import Link from "next/link";

const Page = () => {
	return (
		<div className="flex flex-col p-4 gap-2">
			<h1>
				<Link
					href="https://docs.paypal.ai/developer/how-to/api/get-started"
					className="underline decoration-dotted cursor-pointer"
				>
					Docs: API
				</Link>
			</h1>
			<h1>
				<Link
					href="https://docs.paypal.ai/payments/methods/paypal/api/one-time/orders-api-integration"
					className="underline decoration-dotted cursor-pointer"
				>
					Official docs
				</Link>
			</h1>
		</div>
	);
};

export default Page;
