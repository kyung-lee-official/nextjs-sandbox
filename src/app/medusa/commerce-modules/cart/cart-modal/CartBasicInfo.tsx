import Link from "next/link";
import { ShippingAddress } from "./ShippingAddress";
import { ShippingMethod } from "./ShippingMethod";

type CartBasicInfoProps = {
	cart: any;
	customerAddresses: any[];
};

export const CartBasicInfo = (props: CartBasicInfoProps) => {
	const { cart, customerAddresses } = props;
	return (
		<div className="my-4 p-4 border bg-neutral-100 rounded">
			<div>
				<strong>Cart ID:</strong>{" "}
				<Link
					href={`/medusa/commerce-modules/cart/${cart.id}`}
					className="underline decoration-dotted cursor-pointer"
				>
					{cart.id}
				</Link>
			</div>
			<div>
				<strong>Region:</strong> {cart.region.name}
			</div>
			<div>
				<strong>Currency:</strong> {cart.currency_code}
			</div>
			<div>
				<strong>Shipping Address:</strong>{" "}
				<ShippingAddress
					cartId={cart.id}
					customerAddresses={customerAddresses}
				/>
			</div>
			<div>
				<strong>Shipping Method:</strong>{" "}
				<ShippingMethod cartId={cart.id} />
			</div>
		</div>
	);
};
