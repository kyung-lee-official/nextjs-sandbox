import { Customer } from "./commerce-modules/customer/Customer";
import { Region } from "./commerce-modules/region/Region";
import { Cart } from "./commerce-modules/cart/Cart";

type HeaderProps = {
	regionId: string | undefined;
	customerId: string | undefined;
};

export const Header = (props: HeaderProps) => {
	const { regionId, customerId } = props;

	return (
		<div
			className="flex justify-between items-center h-14 px-4
			border-b border-dashed border-neutral-700"
		>
			<div className="flex w-1/2 gap-2">
				<Region regionId={regionId} />
				<Customer customerId={customerId} />
			</div>
			<Cart regionId={regionId} customerId={customerId} />
		</div>
	);
};
