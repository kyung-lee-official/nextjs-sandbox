import { ShippingAddress } from "./ShippingAddress";

type CartBasicInfoProps = {
	cart: any;
	addresses: any[];
};

export const CartBasicInfo = (props: CartBasicInfoProps) => {
	const { cart, addresses } = props;
	return (
		<div className="my-4 p-4 border bg-neutral-100 rounded">
			<div>
				<strong>Cart ID:</strong> {cart.id}
			</div>
			<div>
				<strong>Region:</strong> {cart.region.name}
			</div>
			<div>
				<strong>Currency:</strong> {cart.currency_code}
			</div>
			<div>
				<strong>Shipping Address:</strong>{" "}
				<ShippingAddress cartId={cart.id} addresses={addresses} />
			</div>
		</div>
	);
};
