"use client";

import { useQuery } from "@tanstack/react-query";
import { getPaymentCollectionById, PaymentQK } from "../../../payment/api";
import dayjs from "dayjs";
import { Cart } from "./Cart";

const Content = (props: { paymentCollectionId: string }) => {
	const { paymentCollectionId } = props;

	const paymentCollectionQuery = useQuery({
		queryKey: [PaymentQK.GET_PAYMENT_COLLECTION_BY_ID, paymentCollectionId],
		queryFn: async () => {
			const res = await getPaymentCollectionById(paymentCollectionId);
			return res;
		},
	});

	if (paymentCollectionQuery.isLoading) {
		return <div>Loading...</div>;
	}

	if (paymentCollectionQuery.error) {
		return <div>Error loading payment collection</div>;
	}

	const { payment_collection } = paymentCollectionQuery.data;

	return (
		<div className="flex flex-col m-6 space-y-4">
			<div>
				<h1>
					Content for Payment Collection ID: {paymentCollectionId}
				</h1>
				<div>Status: {payment_collection.status}</div>
				<div>
					Raw Amount: value: {payment_collection.raw_amount.value}{" "}
					precision: {payment_collection.raw_amount.precision}
				</div>
				<div>Amount: {payment_collection.amount}</div>
				<div>
					Authorized Amount: {payment_collection.authorized_amount}
				</div>
				<div>Captured Amount: {payment_collection.captured_amount}</div>
				<div>Refunded Amount: {payment_collection.refunded_amount}</div>
				<div>Currency Code: {payment_collection.currency_code}</div>
				<div>
					Created At:{" "}
					{dayjs(payment_collection.created_at).format(
						"YYYY-MM-DD HH:mm:ss"
					)}
				</div>
				<div>
					Updated At:{" "}
					{dayjs(payment_collection.updated_at).format(
						"YYYY-MM-DD HH:mm:ss"
					)}
				</div>
			</div>
			<Cart paymentCollectionId={paymentCollectionId} />
		</div>
	);
};

export default Content;
