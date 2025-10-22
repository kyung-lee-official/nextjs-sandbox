import { useMutation } from "@tanstack/react-query";
import { createPaymentSession } from "../../../payment/api";

type CreatePaymentSessionProps = {
	paymentCollectionId: string;
	paymentProviderId: string;
};

export const CreatePaymentSession = (props: CreatePaymentSessionProps) => {
	const { paymentCollectionId, paymentProviderId } = props;

	const createPaymentSessionMutation = useMutation({
		mutationFn: async () => {
			const res = await createPaymentSession(
				paymentCollectionId,
				paymentProviderId
			);
			return res;
		},
		onSuccess: (data) => {
			console.log("Payment session created:", data);
		},
	});

	return (
		<button
			className="px-4 py-2
			text-white bg-blue-500
			cursor-pointer
			rounded"
			onClick={() => {
				createPaymentSessionMutation.mutate();
			}}
		>
			Create Payment Session
		</button>
	);
};
