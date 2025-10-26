import { Customer } from "./commerce-modules/customer/Customer";
import { Region } from "./commerce-modules/region/Region";
import { Cart } from "./commerce-modules/cart/Cart";
import { SalesChannel } from "./commerce-modules/sales-channel/SalesChannel";

type HeaderProps = {
	regionId: string | undefined;
	salesChannelId: string | undefined;
	customerId: string | undefined;
};

export const Header = (props: HeaderProps) => {
	const { regionId, salesChannelId, customerId } = props;

	return (
		<div
			className="flex justify-between items-center h-14 px-4
			border-b border-dashed border-neutral-700"
		>
			<div className="flex w-2/3 gap-2">
				<Region regionId={regionId} />
				<SalesChannel salesChannelId={salesChannelId} />
				<Customer customerId={customerId} />
			</div>
			<Cart
				regionId={regionId}
				salesChannelId={salesChannelId}
				customerId={customerId}
			/>
		</div>
	);
};
