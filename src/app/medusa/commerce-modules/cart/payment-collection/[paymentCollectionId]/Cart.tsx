import { useQuery } from "@tanstack/react-query";
import { PaymentQK, getCartByPaymentCollectionId } from "../../../payment/api";

type CartProps = {
	paymentCollectionId: string;
};

export const Cart = (props: CartProps) => {
	const { paymentCollectionId } = props;

	const getCartByPaymentCollectionIdQuery = useQuery({
		queryKey: [
			PaymentQK.GET_CART_BY_PAYMENT_COLLECTION_ID,
			paymentCollectionId,
		],
		queryFn: async () => {
			const res = await getCartByPaymentCollectionId(paymentCollectionId);
			return res;
		},
	});

	if (getCartByPaymentCollectionIdQuery.isLoading) {
		return <div>Loading...</div>;
	}

	if (getCartByPaymentCollectionIdQuery.error) {
		return <div>Error loading cart</div>;
	}

	const { cart } = getCartByPaymentCollectionIdQuery.data;

	return (
		<div>
			<h1>Cart</h1>
			<div>ID: {cart.id}</div>
			<div>Customer ID: {cart.customer_id}</div>
			<div>Email: {cart.email}</div>
			<div>
				Region: {cart.region.name} ({cart.region.id})
			</div>
			<div>Sales Channel ID: {cart.sales_channel_id}</div>
		</div>
	);
};
