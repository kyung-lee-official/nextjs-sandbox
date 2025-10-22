import { useQuery } from "@tanstack/react-query";
import {
	getPaymentSessionByPaymentCollectionId,
	PaymentQK,
} from "../../../payment/api";

type PaymentSessionProps = {
	paymentCollectionId: string;
};

export const PaymentSession = (props: PaymentSessionProps) => {
	const { paymentCollectionId } = props;

	const getPaymentSessionByPaymentCollectionIdQuery = useQuery({
		queryKey: [
			PaymentQK.GET_PAYMENT_SESSION_BY_PAYMENT_COLLECTION_ID,
			paymentCollectionId,
		],
		queryFn: async () => {
			const res = await getPaymentSessionByPaymentCollectionId(
				paymentCollectionId
			);
			return res;
		},
	});

	if (getPaymentSessionByPaymentCollectionIdQuery.isLoading) {
		return <div>Loading Payment Sessions...</div>;
	}

	if (getPaymentSessionByPaymentCollectionIdQuery.error) {
		return <div>Error loading payment sessions</div>;
	}

	return (
		<div>
			{getPaymentSessionByPaymentCollectionIdQuery.data ? (
				<div
					className="space-y-2 p-2
					border rounded"
				>
					<h1>Payment Session:</h1>
					<div>
						ID:{" "}
						{getPaymentSessionByPaymentCollectionIdQuery.data.id}
					</div>
					<div>
						Provider ID:{" "}
						{
							getPaymentSessionByPaymentCollectionIdQuery.data
								.provider_id
						}
					</div>
					<button
						className="text-white p-2
						bg-blue-500
						rounded cursor-pointer"
					>
						Authorize Payment Session
					</button>
				</div>
			) : (
				<div>No Payment Session Found</div>
			)}
		</div>
	);
};
